type ProductCategory =
  | 'fruits' 
  | 'vegetables' 
  | 'grains' 
  | 'dairy' 
  | 'meat' 
  | 'poultry'
  | 'herbs'
  | 'spices'
  | 'seeds'
  | 'other';
  

type ProductStatus = "draft" | "active" | "out_of_stock" | "deleted" | "inactive";

interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
}

interface ProductVariant {
    id: string;
    name: string;
    price: number;
    comparedAtPrice?: number;
    sku: string;
    weight: number;
    weightUnit: "kg" | "g" | "lb" | "oz";
    stock: number;
    isAvailable: boolean;
}

interface Product {
 id: string;
  farmerId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categories: ProductCategory[];
  images: ProductImage[];
  variants: ProductVariant[];
  harvestDate?: Date;
  bestBefore?: Date;
  certifications: string[];
  isOrganic: boolean;
  status: ProductStatus;
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

 type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';


  interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  price: number;
  total: number;
  weight: number;
  weightUnit: 'kg' | 'g' | 'lb' | 'oz';
  farmerId: string;
}

interface ShippingInfo {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  method: string;
  cost: number;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  transitPartnerId?: string;
}

interface PaymentInfo {
  method: string;
  transactionId?: string;
  status: PaymentStatus;
  paidAt?: Date;
  total: number;
}

interface Order {
  id: string;
  customerId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  discount?: {
    code: string;
    amount: number;
  };
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}