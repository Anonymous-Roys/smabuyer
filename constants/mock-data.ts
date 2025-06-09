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


// export function getProductBySlug(slug: string) {
//   return products.find((p) => p.slug === slug);
// }
// New function to get all products
// export function getAllProducts(): Product[] {
//   return products;
// }

export const BASE_URL = "https://two47sma.onrender.com";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // assuming this is an array of products
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return products
    // throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(`${BASE_URL}/api/products/${slug}`);

  if (!response.ok) {
   return products.find((p) => p.slug === slug);
  }
  if (!response.ok) {
    throw new Error(`Product not found (slug: ${slug})`);
  }

  return response.json();
};


// Optional: Function to get related products
// export function getRelatedProducts(currentProductId: string, categories: string[]): Product[] {
//   return products.filter(product =>
//     product.id !== currentProductId &&
//     product.categories.some(category => categories.includes(category))
//   ).slice(0, 4); // Limit to 4 related products
// }

export async function getRelatedProducts(slug: string, categories: string[]): Promise<Product[]> {
  const params = new URLSearchParams();
  params.append('slug', slug);
  params.append('categories', categories.join(','));

  const response = await fetch(`${BASE_URL}/api/products/related?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch related products');
  }

  return response.json();
}
