import ProductDetailPage from '@/components/ui/custom/product/product-detail';
import { getProductBySlug, getAllProducts } from '@/constants/mock-data';
import { notFound } from 'next/navigation';


export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter(p => 
    p.id !== product.id && 
    p.categories.some(category => product.categories.includes(category))
  ).slice(0, 4);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}