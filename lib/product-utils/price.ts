import { Product } from "@/types/product";


export function getDiscount(product: Product): number {
  const variant = product.variants?.[0];
  if (!variant || !variant.comparedAtPrice || variant.comparedAtPrice <= variant.price) {
    return 0;
  }

  const discount =
    ((variant.comparedAtPrice - variant.price) / variant.comparedAtPrice) * 100;

  return Math.round(discount);
}
