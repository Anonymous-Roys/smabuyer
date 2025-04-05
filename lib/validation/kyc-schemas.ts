import { z } from 'zod';

// Base KYC schema with common fields
const baseKycSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  dateOfBirth: z.string().refine(val => {
    const date = new Date(val);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return date <= eighteenYearsAgo;
  }, {
    message: 'You must be at least 18 years old',
  }),
  nationality: z.string().min(2, 'Nationality is required'),
  idType: z.enum(['passport', 'national_id', 'drivers_license']),
  idNumber: z.string().min(1, 'ID number is required'),
  idExpiryDate: z.string().refine(val => {
    const expiryDate = new Date(val);
    const today = new Date();
    return expiryDate > today;
  }, {
    message: 'ID must not be expired',
  }),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

// Farmer-specific KYC schema
export const farmerKycSchema = baseKycSchema.extend({
  farmName: z.string().min(2, 'Farm name must be at least 2 characters'),
  farmType: z.enum(['crop', 'livestock', 'mixed', 'other']),
  farmSize: z.number().positive('Farm size must be a positive number'),
  farmSizeUnit: z.enum(['acres', 'hectares']),
  farmStreet: z.string().min(1, 'Farm street address is required'),
  farmCity: z.string().min(1, 'Farm city is required'),
  farmState: z.string().min(1, 'Farm state/province is required'),
  farmCountry: z.string().min(1, 'Farm country is required'),
  farmPostalCode: z.string().min(1, 'Farm postal code is required'),
  primaryProducts: z.string().array().min(1, 'At least one product is required'),
  businessLicense: z.string().optional(),
  taxId: z.string().optional(),
  bankName: z.string().min(1, 'Bank name is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  routingNumber: z.string().optional(),
});

// Investor-specific KYC schema
export const investorKycSchema = baseKycSchema.extend({
  investorType: z.enum(['individual', 'organization']),
  organizationName: z.string().optional().refine(val => {
    // Organization name required if investor type is organization
    return val !== undefined && val.length > 0;
  }, {
    message: 'Organization name is required for organizational investors',
  }),
  investmentCapacity: z.enum(['small', 'medium', 'large']),
  investmentPreferences: z.string().array().min(1, 'At least one investment preference is required'),
  employmentStatus: z.enum(['employed', 'self_employed', 'business_owner', 'retired', 'other']),
  annualIncome: z.enum(['below_50k', '50k_100k', '100k_250k', '250k_500k', 'above_500k']),
  sourceOfFunds: z.string().min(1, 'Source of funds is required'),
  investmentExperience: z.enum(['none', 'beginner', 'intermediate', 'experienced']),
});

// Transit partner-specific KYC schema
export const transitKycSchema = baseKycSchema.extend({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  businessType: z.enum(['sole_proprietorship', 'partnership', 'corporation', 'llc', 'other']),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  fleetSize: z.number().positive('Fleet size must be a positive number'),
  vehicleTypes: z.string().array().min(1, 'At least one vehicle type is required'),
  serviceAreas: z.string().array().min(1, 'At least one service area is required'),
  operationalHours: z.string().min(1, 'Operational hours are required'),
  insuranceProvider: z.string().min(1, 'Insurance provider is required'),
  insurancePolicyNumber: z.string().min(1, 'Insurance policy number is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  routingNumber: z.string().optional(),
});