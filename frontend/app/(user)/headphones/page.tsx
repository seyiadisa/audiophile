import ProductSections from "@/components/landing/product-sections";
import Tagline from "@/components/landing/tagline";
import ProductDetails from "@/components/products/product-details";
import ProductPageHeader from "@/components/products/product-page-header";

import headphonesImg1 from "@/public/images/products/headphones-1.webp";
import headphonesImg2 from "@/public/images/products/headphones-2.webp";
import headphonesImg3 from "@/public/images/products/headphones-3.webp";

export default function HeadphonesPage() {
  return (
    <main>
      <ProductPageHeader title="Headphones" />
      <div className="container_ mt-16 mb-[120px] space-y-[120px] md:mt-[120px] lg:my-40 lg:space-y-40">
        <div className="space-y-[120px] lg:space-y-40">
          <ProductDetails
            isNew
            name="XX99 Mark II Headphones"
            url="/product/xx99ii"
            image={headphonesImg1}
          >
            The new XX99 Mark II headphones is the pinnacle of pristine audio.
            It redefines your premium headphone experience by reproducing the
            balanced depth and precision of studio-quality sound.
          </ProductDetails>

          <ProductDetails
            isReverse
            name="XX99 Mark I Headphones"
            url="/product/xx99"
            image={headphonesImg2}
          >
            As the gold standard for headphones, the classic XX99 Mark I offers
            detailed and accurate audio reproduction for audiophiles, mixing
            engineers, and music aficionados alike in studios and on the go.
          </ProductDetails>

          <ProductDetails
            name="XX59 Headphones"
            url="/product/xx59"
            image={headphonesImg3}
          >
            Enjoy your audio almost anywhere and customize it to your specific
            tastes with the XX59 headphones. The stylish yet durable versatile
            wireless headset is a brilliant companion at home or on the move.
          </ProductDetails>
        </div>

        <ProductSections />
        <Tagline />
      </div>
    </main>
  );
}
