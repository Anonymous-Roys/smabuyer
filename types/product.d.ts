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
  | 'roots'
  | 'greens'
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
  tags?: string[];
}

interface ProductCardProps {
  imageUrl?: string;
  name: string;
  price: number;
  rating: number;
  discount?: number;
  imageAlt?: string;
  imagePriority?: boolean;
  isHotDeal?: boolean;
  endDate?: Date;
  className?: string;
}

export interface ProductDetailPageProps {
  product: Product;
}

export interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface EnhancedProductCardProps extends ProductCardProps {
  product?: Product;
}

 type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';


type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

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


export {
  ProductCategory,
  ProductStatus,
  ProductImage,
  ProductVariant,
  Product,
  OrderStatus,
  PaymentStatus,
  OrderItem,
  ShippingInfo,
  PaymentInfo,
  Order
}