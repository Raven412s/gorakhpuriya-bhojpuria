import FuturePlans from "@/components/sections/home/FuturePlans";
import HeroSlider from "@/components/sections/home/HeroSlider";
import Introduction from "@/components/sections/home/Introduction";
import Testimonials from "@/components/sections/home/Testimonials";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export default function Home() {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10 pb-0 "
    >
      <HeroSlider />
      <Introduction />
      <Testimonials />
      <FuturePlans />
    </SectionWrapper>
  );
}
