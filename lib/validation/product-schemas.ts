import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().max(150, 'Short description must be at most 150 characters'),
  categories: z.array(z.string() as z.ZodType<ProductCategory>).min(1, 'At least one category is required'),
  isOrganic: z.boolean().default(false),
  certifications: z.array(z.string()).optional(),
  harvestDate: z.string().optional(),
  bestBefore: z.string().optional(),
  metaTitle: z.string().max(60, 'Meta title must be at most 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be at most 160 characters').optional(),
  status: z.enum(['draft', 'active', 'out_of_stock', 'inactive']).default('draft'),
  variants: z.array(
    z.object({
      name: z.string().min(1, 'Variant name is required'),
      price: z.number().positive('Price must be positive'),
      compareAtPrice: z.number().positive('Compare at price must be positive').optional(),
      sku: z.string().min(1, 'SKU is required'),
      weight: z.number().positive('Weight must be positive'),
      weightUnit: z.enum(['kg', 'g', 'lb', 'oz']),
      stock: z.number().int('Stock must be an integer').min(0, 'Stock cannot be negative'),
      isAvailable: z.boolean().default(true),
    })
  ).min(1, 'At least one variant is required'),
});