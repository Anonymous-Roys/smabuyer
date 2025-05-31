<<<<<<< HEAD:app/(customers)/products/[slug]/page.tsx

import ProductDetailPage from "@/components/ui/product/product-detail";
import { getProductBySlug, products } from "@/constants/data/product";
import { notFound } from "next/navigation";

=======
import PRODUCTS from "@/constants/mock-data";
import { getProductBySlug } from "@/components/ui/custom/product/product-card-demo";
import ProductDetailPage from "@/components/ui/custom/product/product-detail";
import { notFound } from "next/navigation";

>>>>>>> 2541366cb78a6a24fefbbdcc16d5508a6fdf657e:app/(customers)/product/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetailPage product={product} />;
}

// Static paths
export async function generateStaticParams() {
<<<<<<< HEAD:app/(customers)/products/[slug]/page.tsx
  return Array.isArray(products)
    ? products.map((product) => ({ slug: product.slug }))
    : [];
=======
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
>>>>>>> 2541366cb78a6a24fefbbdcc16d5508a6fdf657e:app/(customers)/product/[slug]/page.tsx
}

export const dynamicParams = false;
