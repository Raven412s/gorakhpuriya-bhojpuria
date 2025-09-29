// app/(pages)/shop/page.tsx
import SectionWrapper from "@/components/wrappers/SectionWrapper";

const ShopPage = () => {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10"
    >
      Shop Page
    </SectionWrapper>
  );
};

export default ShopPage;
