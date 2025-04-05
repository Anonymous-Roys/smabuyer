import { AuthService } from '@/lib/services/auth-service';
import {useQuery } from '@tanstack/react-query';

export function useRoles(user: BaseUser | null | undefined) {
//   const queryClient = useQueryClient();

  // Helper function to check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.roles.some((r: { role: string; }) => r.role === role);
  };

  // Helper function to check if user has an approved role
  const hasApprovedRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.roles.some((r: { role: string; kycStatus: string; }) => r.role === role && r.kycStatus === 'approved');
  };

  // Get KYC status for a specific role
  const getKycStatus = (role: UserRole): KYCStatus | null => {
    if (!user) return null;
    const roleData = user.roles.find((r: { role: string; }) => r.role === role);
    return roleData ? roleData.kycStatus : null;
  };

  // Submit KYC mutation
/*   const submitKYC = useMutation({
    mutationFn: AuthService.submitKYC,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (_: any, variables: { userId: any; role: any; }) => {
      // Invalidate and refetch user data to update roles
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      
      // Also invalidate specific KYC status query if it exists
      queryClient.invalidateQueries({ 
        queryKey: ['kycStatus', variables.userId, variables.role] 
      });
    },
  });
 */
  // Check specific KYC status with a query
  const useKycStatusCheck = (role: UserRole) => {
    return useQuery({
      queryKey: ['kycStatus', user?.id, role],
      queryFn: () => {
        if (!user) return null;
        return AuthService.checkKYCStatus(user.id, role);
      },
      enabled: !!user,
      staleTime: 60 * 1000,
    });
  };

  return {
    hasRole,
    hasApprovedRole,
    getKycStatus,
    isPrimary: (role: UserRole) => user?.primaryRole === role,
    // submitKYC: submitKYC.mutate,
    // isSubmittingKYC: submitKYC.isPending,
    // kycError: submitKYC.error,
    useKycStatusCheck,
  };
}