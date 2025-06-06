// import { ProductCardProps } from "@/types/custom-card";
import { Product } from "@/types/product";
import { FundStatCardProps } from "@/types/fund-stat";
import { famerCampaignCardProps } from "@/types/investment";



const products: Product[] = [
  {
    id: "prod-001",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0011",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0012",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-002",
    farmerId: "farm-456",
    name: "Fresh Spinach",
    slug: "fresh-spinach",
    description: "Locally grown spinach, rich in iron and vitamins. Great for salads and cooking.",
    shortDescription: "Locally grown spinach, nutrient-rich and versatile.",
    categories: ["vegetables", "greens"],
    images: [
      {
        id: "img-003",
        url: "/images/product2.jpg",
        alt: "Fresh spinach leaves",
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-0021",
        name: "Regular",
        price: 12.99,
        sku: "SP-001",
        weight: 0.5,
        weightUnit: "kg",
        stock: 30,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-15"),
    bestBefore: new Date("2025-05-22"),
    certifications: ["Organic"],
    isOrganic: true,
    status: "active",
    averageRating: 4.5,
    reviewCount: 12,
    createdAt: new Date("2025-05-15"),
    updatedAt: new Date("2025-05-15"),
    featured: false
  },
  {
    id: "prod-003",
    farmerId: "farm-789",
    name: "Red Bell Pepper",
    slug: "red-bell-pepper",
    description: "Sweet and crunchy red bell peppers. Great for salads, roasting, or stuffing.",
    shortDescription: "Sweet red bell peppers, rich in vitamin C and antioxidants.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-004",
        url: "/images/product7.jpg",
        alt: "Red bell pepper",
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-0031",
        name: "Regular",
        price: 9.99,
        comparedAtPrice: 15.99,
        sku: "RP-001",
        weight: 0.3,
        weightUnit: "kg",
        stock: 40,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-14"),
    bestBefore: new Date("2025-05-24"),
    certifications: ["Non-GMO"],
    isOrganic: false,
    status: "active",
    averageRating: 4.2,
    reviewCount: 8,
    createdAt: new Date("2025-05-14"),
    updatedAt: new Date("2025-05-14"),
    featured: false
  },
  {
    id: "prod-004",
    farmerId: "farm-123",
    name: "Organic Carrots",
    slug: "organic-carrots",
    description: "Fresh organic carrots grown without pesticides. Sweet and perfect for salads, juicing, or cooking.",
    shortDescription: "Sweet organic carrots, great for snacking and cooking.",
    categories: ["vegetables", "roots"],
    images: [
      {
        id: "img-005",
        url: "/images/product6.jpg",
        alt: "Organic carrots",
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-0041",
        name: "Bundle",
        price: 8.49,
        comparedAtPrice: 12.99,
        sku: "OC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 35,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-12"),
    bestBefore: new Date("2025-05-30"),
    certifications: ["Organic", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.7,
    reviewCount: 15,
    createdAt: new Date("2025-05-13"),
    updatedAt: new Date("2025-05-13"),
    featured: true
  },
  {
    id: "prod-005",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-001",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-002",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-006",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0051",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0052",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-007",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0071",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0072",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-008",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0081",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0082",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-009",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-001",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0091",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0092",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-010",
    farmerId: "farm-123",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
    shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-0101",
        url: "/images/Image.png",
        alt: "Fresh Chinese cabbage",
        isPrimary: true
      },
      {
        id: "img-002",
        url: "/images/cabbage2.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-003",
        url: "/images/cabbage3.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-004",
        url: "/images/cabbage4.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      },
      {
        id: "img-005",
        url: "/images/Image.png",
        alt: "Chinese cabbage close-up",
        isPrimary: false
      }
    ],
    variants: [
      {
        id: "var-0101",
        name: "Regular",
        price: 17.28,
        comparedAtPrice: 48.00,
        sku: "CC-001",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true
      },
      {
        id: "var-0102",
        name: "Premium",
        price: 22.99,
        comparedAtPrice: 52.00,
        sku: "CC-002",
        weight: 1.5,
        weightUnit: "kg",
        stock: 10,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-10"),
    bestBefore: new Date("2025-05-25"),
    certifications: ["Organic", "Non-GMO", "Pesticide-free"],
    isOrganic: true,
    status: "active",
    averageRating: 4.0,
    reviewCount: 4,
    createdAt: new Date("2025-05-12"),
    updatedAt: new Date("2025-05-12"),
    featured: true,
    tags: ["Organic", "Non-GMO", "Pesticide-free"],
  },
  {
    id: "prod-011",
    farmerId: "farm-789",
    name: "Red Bell Pepper",
    slug: "red-bell-pepper",
    description: "Sweet and crunchy red bell peppers. Great for salads, roasting, or stuffing.",
    shortDescription: "Sweet red bell peppers, rich in vitamin C and antioxidants.",
    categories: ["vegetables"],
    images: [
      {
        id: "img-004",
        url: "/images/product7.jpg",
        alt: "Red bell pepper",
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-0114",
        name: "Regular",
        price: 9.99,
        comparedAtPrice: 15.99,
        sku: "RP-001",
        weight: 0.3,
        weightUnit: "kg",
        stock: 40,
        isAvailable: true
      }
    ],
    harvestDate: new Date("2025-05-14"),
    bestBefore: new Date("2025-05-24"),
    certifications: ["Non-GMO"],
    isOrganic: false,
    status: "active",
    averageRating: 4.2,
    reviewCount: 8,
    createdAt: new Date("2025-05-14"),
    updatedAt: new Date("2025-05-14"),
    featured: false
  },
];

export default products;


export const FUND_STATS_MOCK: FundStatCardProps[] = [
  {
    logo: "/icons/total-fund.png",
    statName: "Funds Growth",
    directionImage: "/icons/arrow-up.svg",
    isGrowth: true,
    percentage: 12.5,
    isPercentageRise: true,
    totalFunds: "$12,000"
  },
  {
    logo: "/icons/total-fund.png",
    statName: "Weekly Funds",
    directionImage: "/icons/arrow-down.svg",
    isGrowth: false,
    percentage: 3.2,
    isPercentageRise: false,
    totalFunds: "1,200"
  },
  {
    logo: "/icons/total-fund.png",
    statName: "Funds Raised",
    directionImage: "/icons/arrow-down.svg",
    isGrowth: true,
    percentage: 8.9,
    isPercentageRise: true,
    totalFunds: "18%"
  },
  {
    logo: "/icons/total-fund.png",
    statName: "Funds Raised",
    directionImage:  "/icons/arrow-down.svg",
    isGrowth: false,
    percentage: 1.5,
    isPercentageRise: false,
    totalFunds: "$2,500"
  }
];


export const INVESTMENT_OPPORTUNITIES_MOCK: famerCampaignCardProps[] = [
  {
    farmerName: "Amina Yusuf",
    opportunity: {
      id: "opp-001",
      title: "Irrigation System Upgrade",
      slug: "irrigation-system-upgrade",
      farmerId: "farm-001",
      description: "Help Amina install a modern drip irrigation system to conserve water and boost vegetable yields.",
      shortDescription: "Modern drip irrigation for water conservation and higher yields.",
      type: "farm_expansion",
      goalAmount: 5000,
      minInvestment: 100,
      currentAmount: 3200,
      returnRate: 8,
      durationMonths: 12,
      riskLevel: "medium",
      images: [
        {
          url: "/images/campaign-1.png",
          alt: "Amina Yusuf's irrigation project"
        }
      ],
      milestones: [
        {
          id: "milestone-001",
          title: "System Design",
          description: "Complete irrigation system design",
          targetDate: new Date("2025-06-15"),
          status: "pending"
        },
        {
          id: "milestone-002",
          title: "Equipment Purchase",
          description: "Buy drip irrigation equipment",
          targetDate: new Date("2025-07-01"),
          status: "pending"
        }
      ],
      status: "failed",
      investors: 24,
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-07-31"),
      createdAt: new Date("2025-04-20"),
      updatedAt: new Date("2025-05-10"),
      location: {
        city: "Kano",
        state: "Kano",
        country: "Nigeria"
      },
      featured: true
    }
  },
  {
    farmerName: "Kwame Mensah",
    opportunity: {
      id: "opp-002",
      title: "Organic Fertilizer Project",
      slug: "organic-fertilizer-project",
      farmerId: "farm-002",
      description: "Support Kwame's transition to organic farming by funding eco-friendly fertilizers for his maize farm.",
      shortDescription: "Eco-friendly fertilizers for organic maize farming.",
      type: "logistics",
      goalAmount: 3000,
      minInvestment: 50,
      currentAmount: 1800,
      returnRate: 7,
      durationMonths: 8,
      riskLevel: "low",
      images: [
        {
          url: "/images/campaign-2.png",
          alt: "Kwame Mensah's fertilizer project"
        }
      ],
      milestones: [
        {
          id: "milestone-003",
          title: "Fertilizer Sourcing",
          description: "Source organic fertilizers",
          targetDate: new Date("2025-06-10"),
          status: "pending"
        },
        {
          id: "milestone-004",
          title: "Application",
          description: "Apply fertilizers to maize fields",
          targetDate: new Date("2025-07-05"),
          status: "pending"
        }
      ],
      status: "in_progress",
      investors: 15,
      startDate: new Date("2025-05-10"),
      endDate: new Date("2025-07-30"),
      createdAt: new Date("2025-04-25"),
      updatedAt: new Date("2025-05-10"),
      location: {
        city: "Kumasi",
        state: "Ashanti",
        country: "Ghana"
      },
      featured: false
    }
  },
  {
    farmerName: "Ngozi Okafor",
    opportunity: {
      id: "opp-003",
      title: "Greenhouse Expansion",
      slug: "greenhouse-expansion",
      farmerId: "farm-003",
      description: "Ngozi needs your help to expand her greenhouse and grow more fresh tomatoes year-round.",
      shortDescription: "Expand greenhouse for year-round tomato production.",
      type: "farm_expansion",
      goalAmount: 8000,
      minInvestment: 200,
      currentAmount: 4500,
      returnRate: 10,
      durationMonths: 18,
      riskLevel: "medium",
      images: [
        {
          url: "/images/campaign-3.png",
          alt: "Ngozi Okafor's greenhouse expansion"
        }
      ],
      milestones: [
        {
          id: "milestone-005",
          title: "Site Preparation",
          description: "Prepare land for expansion",
          targetDate: new Date("2025-06-20"),
          status: "pending"
        },
        {
          id: "milestone-006",
          title: "Construction",
          description: "Build greenhouse extension",
          targetDate: new Date("2025-08-01"),
          status: "pending"
        }
      ],
      status: "in_progress",
      investors: 32,
      startDate: new Date("2025-05-15"),
      endDate: new Date("2025-11-15"),
      createdAt: new Date("2025-04-28"),
      updatedAt: new Date("2025-05-10"),
      location: {
        city: "Enugu",
        state: "Enugu",
        country: "Nigeria"
      },
      featured: true
    }
  },
  {
    farmerName: "Samuel Adeyemi",
    opportunity: {
      id: "opp-004",
      title: "Solar-Powered Cold Storage",
      slug: "solar-powered-cold-storage",
      farmerId: "farm-004",
      description: "Join Samuel in building a solar-powered cold storage unit to reduce post-harvest losses.",
      shortDescription: "Solar cold storage to reduce post-harvest losses.",
      type: "logistics",
      goalAmount: 6000,
      minInvestment: 150,
      currentAmount: 2750,
      returnRate: 9,
      durationMonths: 10,
      riskLevel: "medium",
      images: [
        {
          url: "/images/campaign-1.png",
          alt: "Samuel Adeyemi's cold storage project"
        }
      ],
      milestones: [
        {
          id: "milestone-007",
          title: "Solar Panel Installation",
          description: "Install solar panels",
          targetDate: new Date("2025-06-25"),
          status: "pending"
        },
        {
          id: "milestone-008",
          title: "Cold Room Setup",
          description: "Build and equip cold room",
          targetDate: new Date("2025-07-20"),
          status: "pending"
        }
      ],
      status: "open",
      investors: 19,
      startDate: new Date("2025-05-12"),
      endDate: new Date("2025-08-12"),
      createdAt: new Date("2025-04-30"),
      updatedAt: new Date("2025-05-10"),
      location: {
        city: "Ibadan",
        state: "Oyo",
        country: "Nigeria"
      },
      featured: false
    }
  }
];



// const PRODUCTS: ProductCardProps[] = [
//   {
//     name: "Chinese Cabbage",
//     price: 12,
//     rating: 4.5,
//     imageAlt: "Product 1 Image",
//     category: "Vegetables",
//     tags: ["leafy", "fresh"],
//     farmer: "Farmer John",
//     description:
//       "Fresh Chinese cabbage, perfect for salads, stir-fries, or soups. Its crisp texture and mild flavor make it a versatile ingredient for a variety of dishes.",
//     additionalInfo: { organic: true, weight: "1kg" },
//   },
//   {
//     imageUrl: "/images/product2.jpg",
//     name: "Green Lettuce",
//     price: 9,
//     rating: 4.0,
//     imageAlt: "Product 2 Image",
//     productsRemaining: 50,
//     bulkPrice: 8,
//     category: "Vegetables",
//     tags: ["leafy", "crisp"],
//     farmer: "Farmer Jane",
//     description:
//       "Crisp green lettuce for your healthy meals. Perfect for making fresh salads, sandwiches, or wraps. Its refreshing crunch adds a delightful texture to any dish.",
//     additionalInfo: { organic: true, weight: "500g" },
//   },
//   {
//     imageUrl: "/images/product3.jpg",
//     name: "Eggplant",
//     price: 34,
//     rating: 4.8,
//     imageAlt: "Product 3 Image",
//     category: "Vegetables",
//     tags: ["purple", "fresh"],
//     farmer: "Farmer Joe",
//     description:
//       "Fresh eggplants, great for grilling, roasting, or making delicious curries. Their rich, creamy texture and slightly smoky flavor make them a favorite in many cuisines.",
//     additionalInfo: { organic: false, weight: "1.5kg" },
//   },
//   {
//     imageUrl: "/images/product4.jpg",
//     name: "Fresh Cauliflower",
//     price: 12,
//     rating: 4.2,
//     imageAlt: "Product 4 Image",
//     productsRemaining: 30,
//     bulkPrice: 10,
//     category: "Vegetables",
//     tags: ["white", "crunchy"],
//     farmer: "Farmer Anna",
//     description:
//       "Fresh cauliflower, perfect for curries, roasting, or making cauliflower rice. Its mild flavor and versatility make it a staple in many kitchens.",
//     additionalInfo: { organic: true, weight: "1kg" },
//   },
//   {
//     imageUrl: "/images/product5.jpg",
//     name: "Green Capsicum",
//     price: 20.99,
//     rating: 4.7,
//     discount: 50,
//     imageAlt: "Product 5 Image",
//     category: "Vegetables",
//     tags: ["green", "crunchy"],
//     farmer: "Farmer Mike",
//     description:
//       "Fresh green capsicum, ideal for stir-fries, salads, or stuffing. Its crisp texture and slightly sweet flavor add a vibrant touch to any dish.",
//     additionalInfo: { organic: true, weight: "500g" },
//   },
//   {
//     imageUrl: "/images/product6.jpg",
//     name: "Green Chili",
//     price: 34,
//     rating: 2,
//     imageAlt: "Product 6 Image",
//     productsRemaining: 100,
//     bulkPrice: 30,
//     category: "Spices",
//     tags: ["spicy", "green"],
//     farmer: "Farmer Sam",
//     description:
//       "Fresh green chilies for adding spice to your dishes. Perfect for curries, salsas, or pickling, these chilies pack a punch of heat and flavor.",
//     additionalInfo: { organic: false, weight: "250g" },
//   },
//   {
//     imageUrl: "/images/product7.jpg",
//     name: "Red Chili",
//     price: 12,
//     rating: 4.6,
//     imageAlt: "Product 7 Image",
//     category: "Spices",
//     tags: ["spicy", "red"],
//     farmer: "Farmer Sam",
//     description:
//       "Fresh red chilies for a fiery flavor. Ideal for making chili paste, sauces, or adding a bold kick to your favorite recipes.",
//     additionalInfo: { organic: false, weight: "250g" },
//   },
//   {
//     imageUrl: "/images/product8.jpg",
//     name: "Red Tomatos",
//     price: 20,
//     rating: 4.9,
//     discount: 50,
//     imageAlt: "Product 8 Image",
//     productsRemaining: 80,
//     bulkPrice: 18,
//     category: "Vegetables",
//     tags: ["red", "juicy"],
//     farmer: "Farmer Lucy",
//     description:
//       "Fresh red tomatoes, perfect for sauces, salads, or sandwiches. Their juicy texture and rich flavor make them a must-have in every kitchen.",
//     additionalInfo: { organic: true, weight: "1kg" },
//   },
//   {
//     imageUrl: "/images/product9.jpg",
//     name: "Surjapur Mango",
//     price: 34,
//     rating: 4.1,
//     imageAlt: "Product 9 Image",
//     category: "Fruits",
//     tags: ["sweet", "yellow"],
//     farmer: "Farmer Raj",
//     description:
//       "Juicy Surjapur mangoes, a tropical delight. Enjoy their sweet, rich flavor as a snack, in desserts, or blended into smoothies.",
//     additionalInfo: { organic: true, weight: "1.5kg" },
//   },
//   {
//     imageUrl: "/images/product10.jpg",
//     name: "Corn",
//     price: 12,
//     rating: 4.4,
//     imageAlt: "Product 10 Image",
//     productsRemaining: 60,
//     bulkPrice: 10,
//     category: "Vegetables",
//     tags: ["yellow", "sweet"],
//     farmer: "Farmer Ben",
//     description:
//       "Fresh corn, perfect for boiling, grilling, or adding to soups and salads. Its natural sweetness and tender kernels make it a favorite for all ages.",
//     additionalInfo: { organic: false, weight: "2kg" },
//   },
//   {
//     imageUrl: "/images/product11.jpg",
//     name: "Big Potatoes",
//     price: 12,
//     rating: 4.0,
//     discount: 10,
//     imageAlt: "Product 11 Image",
//     category: "Vegetables",
//     tags: ["starchy", "brown"],
//     farmer: "Farmer Kate",
//     description:
//       "Big potatoes, ideal for baking, frying, or mashing. Their hearty texture and earthy flavor make them a versatile ingredient for countless recipes.",
//     additionalInfo: { organic: true, weight: "3kg" },
//   },
// ];


// export default PRODUCTS;

export const HOTDEAL = {
  imageUrl: "/images/product5.jpg",
  name: "Green Capsicum",
  price: 20.99,
  rating: 4.7,
  discount: 50,
  imageAlt: "Product 5 Image",
  isHotDeal: true,
  endDate: new Date("2025-05-31T00:00:00Z"),
};


export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
// New function to get all products
export function getAllProducts(): Product[] {
  return products;
}

// Optional: Function to get related products
export function getRelatedProducts(currentProductId: string, categories: string[]): Product[] {
  return products.filter(product =>
    product.id !== currentProductId &&
    product.categories.some(category => categories.includes(category))
  ).slice(0, 4); // Limit to 4 related products
}