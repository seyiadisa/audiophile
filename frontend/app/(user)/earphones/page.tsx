import ProductSections from "@/components/landing/product-sections";
import Tagline from "@/components/landing/tagline";
import ProductDetails from "@/components/products/product-details";
import ProductPageHeader from "@/components/products/product-page-header";

import earphonesImg from "@/public/images/products/earphones.webp";

export default function EarphonesPage() {
  return (
    <main>
      <ProductPageHeader title="Speakers" />
      <div className="container_ mt-16 mb-[120px] space-y-[120px] md:mt-[120px] lg:my-40 lg:space-y-40">
        <div className="space-y-[120px] lg:space-y-40">
          <ProductDetails
            isNew
            name="YX1 WIRELESS EARPHONES"
            url="/product/yx1"
            image={earphonesImg}
          >
            Tailor your listening experience with bespoke dynamic drivers from
            the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound
            even in noisy environments with its active noise cancellation
            feature.
          </ProductDetails>
        </div>

        <ProductSections />
        <Tagline />
      </div>
    </main>
  );
}
