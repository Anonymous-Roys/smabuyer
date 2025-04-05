import { z } from 'zod';

export const shippingAddressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

export const paymentSchema = z.object({
  method: z.enum(['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']),
  cardNumber: z.string().optional().refine(val => {
    // Only validate if method is credit_card
    if (val === undefined || val.length === 0) return true;
    return val.replace(/\s+/g, '').length === 16;
  }, {
    message: 'Card number must be 16 digits',
  }),
  cardHolderName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional().refine(val => {
    // Only validate if method is credit_card
    if (val === undefined || val.length === 0) return true;
    return val.length === 3 || val.length === 4;
  }, {
    message: 'CVV must be 3 or 4 digits',
  }),
});

export const checkoutSchema = z.object({
  shippingAddress: shippingAddressSchema,
  billingAddressSameAsShipping: z.boolean().default(true),
  billingAddress: shippingAddressSchema.optional(),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  payment: paymentSchema,
  notes: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});
