'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageBlur from '@/components/common/ImageBlur';
// import { isAuthenticated } from '@/lib/utils/auth';
// import { getUserOrders } from '@/lib/utils/api';
import { Order, OrderStatus, PaymentStatus } from '@/types/product';

// Mock order data - replace with actual API calls
const mockOrders: Order[] = [
  {
    id: '1',
    customerId: 'user123',
    orderNumber: 'ORD-2024-001',
    items: [
      {
        id: 'item1',
        productId: 'prod1',
        productName: 'Organic Tomatoes',
        variantId: 'var1',
        variantName: '1kg',
        quantity: 2,
        price: 5.99,
        total: 11.98,
        weight: 1,
        weightUnit: 'kg',
        farmerId: 'farmer1'
      },
      {
        id: 'item2',
        productId: 'prod2',
        productName: 'Fresh Lettuce',
        variantId: 'var2',
        variantName: '500g',
        quantity: 1,
        price: 3.49,
        total: 3.49,
        weight: 0.5,
        weightUnit: 'kg',
        farmerId: 'farmer2'
      }
    ],
    subtotal: 15.47,
    tax: 1.55,
    shipping: {
      address: {
        street: '123 Main St',
        city: 'Accra',
        state: 'Greater Accra',
        country: 'Ghana',
        postalCode: '00233'
      },
      method: 'standard',
      cost: 0,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      trackingNumber: 'TRK123456789'
    },
    payment: {
      method: 'credit-card',
      transactionId: 'txn_abc123',
      status: 'completed',
      paidAt: new Date(),
      total: 17.02
    },
    total: 17.02,
    status: 'delivered',
    notes: 'Please deliver in the morning',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    completedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    customerId: 'user123',
    orderNumber: 'ORD-2024-002',
    items: [
      {
        id: 'item3',
        productId: 'prod3',
        productName: 'Fresh Carrots',
        variantId: 'var3',
        variantName: '2kg',
        quantity: 1,
        price: 8.99,
        total: 8.99,
        weight: 2,
        weightUnit: 'kg',
        farmerId: 'farmer3'
      }
    ],
    subtotal: 8.99,
    tax: 0.90,
    shipping: {
      address: {
        street: '123 Main St',
        city: 'Accra',
        state: 'Greater Accra',
        country: 'Ghana',
        postalCode: '00233'
      },
      method: 'express',
      cost: 25,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    payment: {
      method: 'paypal',
      status: 'pending',
      total: 34.89
    },
    total: 34.89,
    status: 'processing',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated()) {
    //   toast.error('Please login to view your orders');
    //   router.push('/login');
    //   return;
    // }

    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // const response = await getUserOrders();
        
        // if (response.success && response.data) {
        //   setOrders(response.data);
        // } else {
          // Fallback to mock data if API fails
          setOrders(mockOrders);
        // }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        // Fallback to mock data
        setOrders(mockOrders);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const handleReorder = (order: Order) => {
    // Add items to cart logic
    const cartItems = order.items.map(item => ({
      productId: item.productId,
      variantId: item.variantId,
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
      imageUrl: '/images/product-placeholder.jpg', // Replace with actual image
      weight: item.weight,
      weightUnit: item.weightUnit,
      slug: item.productName.toLowerCase().replace(/\s+/g, '-'),
      farmerId: item.farmerId
    }));

    localStorage.setItem('cart', JSON.stringify(cartItems));
    toast.success('Items added to cart!');
    router.push('/cart');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBackToOrders}
            className="mb-4"
          >
            ← Back to Orders
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600">Order #{selectedOrder.orderNumber}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </Badge>
              <Badge className={getPaymentStatusColor(selectedOrder.payment.status)}>
                {selectedOrder.payment.status.charAt(0).toUpperCase() + selectedOrder.payment.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <ImageBlur
                      src="/images/product-placeholder.jpg"
                      alt={item.productName}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-600">{item.variantName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.total)}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Information */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <div className="text-gray-600">
                    <p>{selectedOrder.shipping.address.street}</p>
                    <p>{selectedOrder.shipping.address.city}, {selectedOrder.shipping.address.state}</p>
                    <p>{selectedOrder.shipping.address.country} {selectedOrder.shipping.address.postalCode}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Shipping Details</h3>
                  <div className="text-gray-600">
                    <p>Method: {selectedOrder.shipping.method}</p>
                    <p>Cost: {formatCurrency(selectedOrder.shipping.cost)}</p>
                    {selectedOrder.shipping.estimatedDelivery && (
                      <p>Estimated: {formatDate(selectedOrder.shipping.estimatedDelivery)}</p>
                    )}
                    {selectedOrder.shipping.trackingNumber && (
                      <p>Tracking: {selectedOrder.shipping.trackingNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(selectedOrder.shipping.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(selectedOrder.tax)}</span>
                </div>
                {selectedOrder.discount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(selectedOrder.discount.amount)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={() => handleReorder(selectedOrder)}
                  className="w-full"
                >
                  Reorder
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/contact')}
                >
                  Contact Support
                </Button>
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-600">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
                {selectedOrder.status !== 'pending' && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.updatedAt)}</p>
                    </div>
                  </div>
                )}
                {selectedOrder.status === 'delivered' && selectedOrder.completedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.completedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your orders and view order history</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: 'Pending' },
            { key: 'processing', label: 'Processing' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.key as any)}
              className="text-sm"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'all' 
              ? "You haven't placed any orders yet."
              : `No ${activeTab} orders found.`
            }
          </p>
          <Button onClick={() => router.push('/products')}>
            Start Shopping
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Badge className={getPaymentStatusColor(order.payment.status)}>
                        {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium capitalize">{order.payment.method.replace('-', ' ')}</p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex gap-2 flex-wrap">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{item.productName}</span>
                        <span>×{item.quantity}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-sm text-gray-500">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleOrderClick(order)}
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleReorder(order)}
                    className="w-full md:w-auto"
                  >
                    Reorder
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
