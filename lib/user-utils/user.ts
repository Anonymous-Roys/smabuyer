export const isCustomer = (user: BaseUser) => {
  return user.primaryRole === 'customer';
};

export const isFarmer = (user: BaseUser)=> {
  return user.primaryRole === 'farmer';
};

export const isInvestor = (user: BaseUser)=> {
  return user.primaryRole === 'investor';
};

export const isTransit = (user: BaseUser)=> {
  return user.primaryRole === 'transit';
};

// Helper to check if user has a specific role, regardless of primary
export const hasRole = (user: BaseUser, role: UserRole): boolean => {
  return user.roles.some(r => r.role === role && r.kycStatus === 'approved');
};

// Helper to check KYC status for a specific role
export const getRoleKycStatus = (user: BaseUser, role: UserRole): KYCStatus | null => {
  const roleData = user.roles.find(r => r.role === role);
  return roleData ? roleData.kycStatus : null;
};