import Banner from "@/components/landing/banner";
import ProductHighlights from "@/components/landing/product-highlight";
import ProductSections from "@/components/landing/product-sections";
import Tagline from "@/components/landing/tagline";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container_ mt-10 mb-[120px] space-y-[120px] md:my-24 md:space-y-24 lg:mt-[120px] lg:mb-[200px] lg:*:last:mt-[200px] lg:*:nth-[2]:mt-[168px]">
        <ProductSections />
        <ProductHighlights />
        <Tagline />
      </div>
    </>
  );
}
