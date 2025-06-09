"use client";
import React, { useState } from "react";
import ImageBlur from "@/components/common/ImageBlur";
import Link from "next/link";
import { BASE_URL } from "@/constants/mock-data";
import axios from "axios";    

const CheckoutPage = () => {
  const [cartItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState("delivery");

  interface CartItem {
    id: string;
    name: string;
    price: number;
    discountedPrice: number;
    quantity: number;
    imageUrl: string;
    category?: string;
    farmer?: string;
  }

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.discountedPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;



  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Process checkout logic here
  //   console.log("Checkout submitted:", formData);
  //   // Clear cart after successful checkout
  //   localStorage.removeItem("cart");
  //   // Redirect to confirmation page
  //   // window.location.href = "/cart/checkout/success";
  // };
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  country: "Ghana",
  state: "",
  zipCode: "",
  email: "",
  phone: "",
  deliveryMethod: "standard",
  paymentMethod: "credit-card",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
  momoNumber: "",
  momoNetwork: "mtn",
  saveInfo: false,
  notes: ""
});

// Handle form input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

// Handle order submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + (item.discountedPrice || item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = formData.deliveryMethod === 'standard' ? 
    (subtotal > 100 ? 0 : 15) : 25;
  const total = subtotal + tax + shipping;

  // Prepare order payload
  const orderPayload = {
    customer: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      isGuest: true // Or set based on auth status
    },
    // Include userId only if user is logged in
    // ...(isAuthenticated && { userId: currentUser._id }),

    items: cartItems.map(item => ({
      productId: item.productId || item.variantId,
      productName: item.name,
      variantId: item.variantId,
      variantName: item.variantName || `${item.weight}${item.weightUnit}`,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      weight: item.weight,
      weightUnit: item.weightUnit,
      farmerId: item.farmerId || "684022d5298ea52c7a655619"
    })),
    shipping: {
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.zipCode
      },
      method: formData.deliveryMethod,
      cost: shipping,
      estimatedDelivery: new Date(Date.now() + 
        (formData.deliveryMethod === 'standard' ? 5 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000))
    },
    payment: {
      method: formData.paymentMethod,
      status: "pending",
      total: total,
      ...(formData.paymentMethod === 'credit-card' && {
        transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`
      })
    },
    subtotal: subtotal,
    tax: tax,
    total: total,
    notes: formData.notes || undefined
  };

  console.log(orderPayload)
  try {
    const response = await axios.post(`${BASE_URL}/api/orders`, orderPayload);
    localStorage.removeItem('cart');
    console.log(response.data)
    window.location.href = "/cart/checkout/success";
  } catch (error) {
    console.error('Order submission failed:', error);
    alert('Order submission failed. Please try again.');
  }
};
  return (
    <div className="container mx-auto px-4 py-8 mt-30">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form - Left Side */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Checkout
            </h2>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div
                className={`flex flex-col items-center ${
                  activeTab === "delivery" ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeTab === "delivery"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  1
                </div>
                <span className="mt-2 text-sm">Delivery</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  activeTab === "payment" ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeTab === "payment"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  2
                </div>
                <span className="mt-2 text-sm">Payment</span>
              </div>
              <div
                className={`flex flex-col items-center ${
                  activeTab === "review" ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeTab === "review"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  3
                </div>
                <span className="mt-2 text-sm">Review</span>
              </div>
            </div>

            {/* Delivery Information */}
            {activeTab === "delivery" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Delivery Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ivory Coast">Ivory Coast</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Togo">Togo</option>
                      <option value="Benin">Benin</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Mali">Mali</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Gambia">Gambia</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={formData.deliveryMethod === "standard"}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Standard Delivery (3-5 business days) -{" "}
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={formData.deliveryMethod === "express"}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Express Delivery (1-2 business days) - $25.00
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab("payment")}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {activeTab === "payment" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment Method
                </h3>
                <div className="mb-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === "credit-card"}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Credit Card
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        PayPal
                      </span>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "paypal" && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300">
                      You will be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Save payment information for next time
                  </label>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("delivery")}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("review")}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review Order */}
            {activeTab === "review" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Review Your Order
                </h3>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Delivery Information
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formData.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formData.country}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {formData.email}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formData.phone}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      Delivery Method:{" "}
                      {formData.deliveryMethod === "standard"
                        ? "Standard Delivery"
                        : "Express Delivery"}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Payment Method
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    {formData.paymentMethod === "credit-card" ? (
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Credit Card ending in {formData.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Expires: {formData.expiry}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">PayPal</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Order Items
                  </h4>
                  <div className="space-y-4">
                    {cartItems.map((item: CartItem) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <div className="flex items-center">
                          <ImageBlur
                            src={item.imageUrl || "/images/Image.png"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded mr-4"
                          />
                          <div>
                            <h5 className="text-gray-900 dark:text-white">
                              {item.name}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          ${(item.discountedPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("payment")}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary - Right Side */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <ImageBlur
                      src={item.imageUrl || "/images/Image.png"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white">
                    ${(item.discountedPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="text-gray-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Shipping
                </span>
                <span className="text-gray-900 dark:text-white">
                  {shipping === 0 ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/cart"
                className="text-sm text-green-600 hover:underline"
              >
                ← Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
