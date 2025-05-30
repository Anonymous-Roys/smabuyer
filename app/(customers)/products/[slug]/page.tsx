
import ProductDetailPage from "@/components/ui/product/product-detail";
import { getProductBySlug, products } from "@/constants/data/product";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetailPage product={product} />;
}

// Static paths
export async function generateStaticParams() {
  return Array.isArray(products)
    ? products.map((product) => ({ slug: product.slug }))
    : [];
}

export const dynamicParams = false;
