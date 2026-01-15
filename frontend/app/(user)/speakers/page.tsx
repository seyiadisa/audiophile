import ProductSections from "@/components/landing/product-sections";
import Tagline from "@/components/landing/tagline";
import ProductDetails from "@/components/products/product-details";
import ProductPageHeader from "@/components/products/product-page-header";

import speakersImg1 from "@/public/images/products/speakers-1.webp";
import speakersImg2 from "@/public/images/products/speakers-2.webp";

export default function SpeakersPage() {
  return (
    <main>
      <ProductPageHeader title="Speakers" />
      <div className="container_ mt-16 mb-[120px] space-y-[120px] md:mt-[120px] lg:my-40 lg:space-y-40">
        <div className="space-y-[120px] lg:space-y-40">
          <ProductDetails
            isNew
            name="ZX9 SPEAKER"
            url="/product/zx9"
            image={speakersImg1}
          >
            Upgrade your sound system with the all new ZX9 active speaker.
            It&apos;s a bookshelf speaker system that offers truly wireless
            connectivity -- creating new possibilities for more pleasing and
            practical audio setups.
          </ProductDetails>

          <ProductDetails
            isReverse
            name="ZX7 SPEAKER"
            url="/product/zx7"
            image={speakersImg2}
          >
            Stream high quality sound wirelessly with minimal loss. The ZX7
            bookshelf speaker uses high-end audiophile components that
            represents the top of the line powered speakers for home or studio
            use.
          </ProductDetails>
        </div>

        <ProductSections />
        <Tagline />
      </div>
    </main>
  );
}
