import { getProductBySlug, products } from "@/components/ui/product/product-card-demo";
import ProductDetailPage from "@/components/ui/product/product-detail";
import { notFound } from "next/navigation";


export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetailPage product={product} />;
}

// For static generation
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const dynamicParams = false; // Only use the generated static params