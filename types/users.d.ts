type UserRole = "customer" | "farmer" | "investor" | "transit";
type KYCStatus = "not_started" | "pending" | "approved" | "rejected";

export interface UserProfile {
  id: string;
  email: string;
  name?: string; // Optional to match schema
  role?: UserRole; // Optional to match schema
  kycStatus?: KYCStatus; // Optional to match schema
  phone?: string;
  points?: number; // Optional to match schema
  profileImage?: string | {
    data: Buffer;
    contentType: string;
  };
  avatar?: string; // Not in schema
  address?: string; // Not in schema
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
  active?: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface UserProfileUpdate {
    email?: string;
    name?: string;
    role?: UserRole;
    kycStatus?: KYCStatus;
    avatar?: string;
    address?: string;
}

interface UserProfileRepository {
    getUserProfile(userId: string): Promise<UserProfile | null>;
    updateUserProfile(userId: string, profileUpdate: UserProfileUpdate): Promise<void>;
}

class UserProfileService {
    private userProfileRepository: UserProfileRepository;
    constructor(userProfileRepository: UserProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        return this.userProfileRepository.getUserProfile(userId);
    }
    async updateUserProfile(userId: string, profileUpdate: UserProfileUpdate): Promise<void> {
        await this.userProfileRepository.updateUserProfile(userId, profileUpdate);
    }
}

interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    postalCode?: string;
}

interface BaseUser {
    id: string;
    email: string;
    profile: UserProfile;
    primaryRole: UserRole;
    roles: Array<{
        role: UserRole;
        permissions: Array<string>;
        kycStatus: KYCStatus;
        approved?: Date;
    }>
    isActive: boolean;
    isEmailVerified: boolean
    lastLoginAt?: Date;
}

interface CustomerDetails {
    orders: string[];
    // ids
    savedProducts: string[];
    preferredPaymentMethod?: string;
}

interface FarmerDetails {
    farmName: string;
    farmSize: number;
    farmLocation: Address;
    farmSizeUnit: "acres" | "hectares";
    products: string[];
    productCateories: string[];
    businessLicense?: string;
    taxId?: string;
    bankDetails?: BankDetails;

}

interface BankDetails { 
    accountNumber: string;
    bankName: string;
    accountName: string;
    routingNumber?: string;
    swiftCode?: string;
}

interface InvestorDetails { 
    investmentPreferences: string[];
    investedProjects: string[];
    investorType: "individual" | "organisation" | "company" | "other";
    organizationName?: string;
    legalName?: string;
    legalEntityType?: "individual" | "corporation" | "limited_liability_company" | "other";
    annualReturn?: number;
    investmentExperience?: string;
    investmentExperienceYears?: number;
    investmentCapacity?: "small" | "medium" | "large";
}

interface TransitDetails { 
    companyName?: string;
    fleetSize: number;
    serviceAreas: string[];
    transitType: "freight" | "passenger";
    transportTypes: ("freight" | "passenger" | "refrigerated" | "standard" | "specialized")[];
    licencesAndPermits: string[];
}

interface User extends BaseUser {
    customerDetails?: CustomerDetails;
    farmerDetails?: FarmerDetails;
    investorDetails?: InvestorDetails;
    transitDetails?: TransitDetails;
}

interface UserRepository {
    getUser(userId: string): Promise<User | null>;
    updateUser(userId: string, userUpdate: Partial<User>): Promise<void>;
}

interface Customer extends BaseUser {
    primaryRole: "Customer";
    customerDetails: CustomerDetails;
}

interface Farmer extends BaseUser {
    primaryRole: "Farmer";
    farmerDetails: FarmerDetails;
    customerDetails: CustomerDetails;

}