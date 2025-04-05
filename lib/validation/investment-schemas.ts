import { z } from 'zod';

export const investmentSchema = z.object({
  opportunityId: z.string().min(1, 'Investment opportunity is required'),
  amount: z.number().positive('Investment amount must be positive'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the investment terms',
  }),
});

export const investmentOpportunitySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().max(200, 'Short description must be at most 200 characters'),
  type: z.enum(['farm_expansion', 'equipment', 'logistics', 'new_crop']),
  goalAmount: z.number().positive('Goal amount must be positive'),
  minInvestment: z.number().positive('Minimum investment must be positive'),
  returnRate: z.number().min(0, 'Return rate cannot be negative'),
  durationMonths: z.number().positive('Duration must be positive'),
  riskLevel: z.enum(['low', 'medium', 'high']),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  country: z.string().min(1, 'Country is required'),
  milestones: z.array(
    z.object({
      title: z.string().min(1, 'Milestone title is required'),
      description: z.string().min(1, 'Milestone description is required'),
      targetDate: z.string().min(1, 'Target date is required'),
    })
  ).min(1, 'At least one milestone is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});