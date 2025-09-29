import type { Metadata } from "next";
import Founders from "@/components/sections/about/Founders";
import MentorsSection from "@/components/sections/about/MentorsSection";
import MissionVision from "@/components/sections/about/Mission";
import OurStory from "@/components/sections/about/OurStory";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export const metadata: Metadata = {
  title: "हमरे बारे में | गोरखपुरिया भोजपुरिया",
  description: "गोरखपुरिया भोजपुरिया के उद्देश्य, संस्थापक और हमार मिशन के बारे में जानें",
};
const AboutPage = () => {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10"
    >
      <PageHeader
        title="हमरे बारे में"
        subtitle="गोरखपुरिया भोजपुरिया के संघर्ष और सफलता की कहानी"
        backgroundImage="/images/about/header-bg.jpg"
      />
      <OurStory />
      <MentorsSection />
      <MissionVision />
      <Founders />
    </SectionWrapper>
  );
};

export default AboutPage;
