type InvestmentStatus = 
  | 'open' 
  | 'funded' 
  | 'in_progress' 
  | 'completed' 
    | 'failed';
  

    type InvestmentType = 'farm_expansion' | 'equipment' | 'logistics' | 'new_crop';

interface InvestmentMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completedDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
}

interface InvestmentOpportunity {
  id: string;
  title: string;
  slug: string;
  farmerId?: string;
  transitId?: string;
  description: string;
  shortDescription: string;
  type: InvestmentType;
  goalAmount: number;
  minInvestment: number;
  currentAmount: number;
  returnRate: number; // As a percentage
  durationMonths: number;
  riskLevel: 'low' | 'medium' | 'high';
  images: Array<{
    url: string;
    alt: string;
  }>;
  milestones: InvestmentMilestone[];
  businessPlanUrl?: string;
  financialProjectionsUrl?: string;
  status: InvestmentStatus;
  investors: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  location: {
    city: string;
    state: string;
    country: string;
  };
  featured: boolean;
}

interface Investment {
  id: string;
  opportunityId: string;
  investorId: string;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  transactionId: string;
  investedAt: Date;
  returns: {
    expected: number;
    paid: number;
    nextPaymentDate?: Date;
  };
  notes?: string;
}