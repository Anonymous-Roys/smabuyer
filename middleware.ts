import { NextRequest, NextResponse } from 'next/server';

// Config for matcher
export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/customer/:path*',
    '/farmer/:path*',
    '/investor/:path*',
    '/transit/:path*',
    '/onboarding/:path*',
    '/api/:path*'
  ],
};

// Role-specific path patterns
const rolePathPatterns: Record<UserRole, RegExp> = {
  customer: /^\/customer\/.*/,
  farmer: /^\/farmer\/.*/,
  investor: /^\/investor\/.*/,
  transit: /^\/transit\/.*/,
};

export async function middleware(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  const { pathname } = req.nextUrl;

  // No session means not authenticated
  if (!session) {
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check role-specific paths access
const userRoles = session.user.roles.map((r: { role: string }) => r.role);
  const primaryRole = session.user.primaryRole;

  // Onboarding pages specific checks
  if (pathname.startsWith('/onboarding')) {
    // For KYC, any authenticated user can access
    if (pathname.startsWith('/onboarding/kyc')) {
      return NextResponse.next();
    }
    
    // For farmer onboarding, check KYC status
    if (pathname.startsWith('/onboarding/farmer')) {
      const farmerRole = session.user.roles.find((r: { role: string }) => r.role === 'farmer');
      
      // If no farmer role or KYC is completed, redirect appropriately
      if (!farmerRole) {
        // Redirect to KYC page if they don't have the role at all
        return NextResponse.redirect(new URL('/onboarding/kyc', req.url));
      }
      
      if (farmerRole.kycStatus === 'approved') {
        // Already approved, go to farmer dashboard
        return NextResponse.redirect(new URL('/farmer', req.url));
      }
      
      // Otherwise, they can access the farmer onboarding
      return NextResponse.next();
    }
  }

  // Check role-specific dashboard access
  for (const [role, pattern] of Object.entries(rolePathPatterns)) {
    if (pattern.test(pathname)) {
      // Check if the user has the required role and it's approved
      const hasApprovedRole = session.user.roles.some(
          (r: {
              role: string;
              kycStatus: string;
        }) => r.role === role && r.kycStatus === 'approved'
      );

      if (!hasApprovedRole) {
        // If this is their primary role but not approved yet
        if (primaryRole === role) {
          const kycStatus = session.user.roles.find((r: { role: string }) => r.role === role)?.kycStatus;
          
          if (kycStatus === 'pending') {
            // Redirect to pending approval page
            return NextResponse.redirect(new URL('/pending-approval', req.url));
          }
          
          if (kycStatus === 'not_started') {
            // Redirect to onboarding process
            return NextResponse.redirect(new URL(`/onboarding/${role}`, req.url));
          }
          
          if (kycStatus === 'rejected') {
            // Redirect to rejected status page
            return NextResponse.redirect(new URL('/kyc-rejected', req.url));
          }
        }

        // Default fallback - redirect to customer dashboard if they have customer access
        if (userRoles.includes('customer')) {
          return NextResponse.redirect(new URL('/customer', req.url));
        }
        
        // Last resort - send to home page
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Helper function to extract session from request
// Implementation depends auth provider (Next-Auth)
async function getSessionFromRequest(req: NextRequest) {
 
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // return token;
  
  // For now,let's simulate session data
  const sessionCookie = req.cookies.get('session')?.value;
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    // This would be replaced with actual session decoding/validation todo:Replace that @Anonymous-Roys
    return JSON.parse(atob(sessionCookie));
  } catch {
    return null;
  }
}