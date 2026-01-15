import ProductSections from "@/components/landing/product-sections";
import Tagline from "@/components/landing/tagline";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import AddToCart from "@/components/cart/add-to-cart";

export default async function ProductInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  return (
    <main>
      <div className="space-y-[88px] md:space-y-[120px]">
        <section className="flex flex-col items-start justify-between gap-8 text-start md:flex-row md:items-center md:gap-[68px] lg:gap-20 lg:text-start xl:gap-[125px]">
          <div className="bg-primary-foreground relative flex h-[352px] w-full shrink-0 items-center justify-center overflow-hidden rounded-md px-[70px] py-[41px] md:h-[480px] md:w-[281px] lg:h-[456px] lg:w-[440px] lg:py-[68px] xl:h-[560px] xl:w-[540px]">
            <Image
              src={product.image}
              alt={`${product.name} product image`}
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-[50px] h-3.5 w-[165px] rounded-full bg-black blur-[20px] md:bottom-32" />
          </div>

          <div className="flex w-full flex-col items-start">
            {product.isNew ? (
              <>
                <h1 className="text-overline text-primary">New Product</h1>
                <h2 className="text-h4 my-6 md:mt-[17px] md:mb-8 lg:mt-4 lg:w-4/5">
                  {product.name}
                </h2>
              </>
            ) : (
              <h1 className="text-h4 mb-6 md:mb-8 lg:w-4/5">{product.name}</h1>
            )}
            <p className="text-body opacity-50 md:w-5/6 lg:w-full">
              {product.details}
            </p>
            <p className="text-h6 mt-6 mb-[31px] md:mt-8 lg:mb-[47px]">
              {formatPrice(product.price)}
            </p>

            <AddToCart id={id} product={product} />
          </div>
        </section>

        <div className="flex flex-col gap-[88px] md:gap-[120px] lg:flex-row">
          <section className="lg:flex-2">
            <h2 className="text-h5 mb-6 leading-9 tracking-[0.86px] md:mb-8">
              Features
            </h2>
            <p className="space-y-4 opacity-50">
              {product.features.split("\n").map((segment) => (
                <span key={segment} className="inline-block">
                  {segment}
                </span>
              ))}
            </p>
          </section>

          <section className="flex flex-col gap-6 md:flex-row lg:flex-1 lg:flex-col lg:gap-8">
            <h2 className="text-h5 leading-9 tracking-[0.86px] md:flex-1 lg:flex-none">
              In the Box
            </h2>
            <ul className="space-y-2 md:flex-1 lg:flex-none">
              {Object.entries(product.inTheBox).map(([key, value]) => (
                <li key={key} className="flex items-center gap-6">
                  <span className="text-primary w-6 font-bold">{value}x</span>
                  <span className="opacity-50">{key}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section></section>
      </div>

      <div className="my-[120px] space-y-[120px]">
        <section className="w-full">
          <h2 className="text-h5 mx-auto w-fit leading-9 tracking-[0.86px]">
            You may also like
          </h2>
        </section>

        <ProductSections />
        <Tagline />
      </div>
    </main>
  );
}
