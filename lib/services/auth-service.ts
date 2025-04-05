// lib/services/auth-service.ts

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface KYCSubmission {
  role: UserRole;
  userId: string;
  formData: Record<string, unknown>;
  documents: File[];
}

export const AuthService = {
  /**
   * Sign in a user with email/password
   */
  async signIn(credentials: SignInCredentials): Promise<{ user: BaseUser; accessToken: string }> {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in');
    }

    return response.json();
  },

  /**
   * Sign up a new user (creates a customer account by default)
   */
  async signUp(data: SignUpData): Promise<{ user: BaseUser; accessToken: string }> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }

    return response.json();
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    await fetch('/api/auth/signout', { method: 'POST' });
    window.location.href = '/';
  },

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<BaseUser | null> {
    try {
      const response = await fetch('/api/auth/me');
      
      if (!response.ok) {
        return null;
      }
      
      return response.json();
    } catch {
      return null;
    }
  },

  /**
   * Submit KYC information for role elevation
   */
  async submitKYC(submission: KYCSubmission): Promise<{ status: KYCStatus }> {
    // Create form data for file upload
    const formData = new FormData();
    
    // Add basic data
    formData.append('role', submission.role);
    formData.append('userId', submission.userId);
    formData.append('formData', JSON.stringify(submission.formData));
    
    // Add documents
    submission.documents.forEach((doc, index) => {
      formData.append(`document_${index}`, doc);
    });

    const response = await fetch('/api/kyc', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit KYC');
    }

    return response.json();
  },

  /**
   * Check KYC status for a specific role
   */
  async checkKYCStatus(userId: string, role: UserRole): Promise<KYCStatus> {
    const response = await fetch(`/api/kyc/status?userId=${userId}&role=${role}`);
    
    if (!response.ok) {
      throw new Error('Failed to check KYC status');
    }
    
    const data = await response.json();
    return data.status;
  },
};


