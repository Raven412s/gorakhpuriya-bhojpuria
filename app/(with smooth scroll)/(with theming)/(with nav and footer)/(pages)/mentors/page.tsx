// app/(pages)/mentors/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

import FeaturedInspiration from "@/components/sections/mentors/FeaturedInspiration";
import MentorProfiles from "@/components/sections/mentors/MentorProfiles";
import MentorsCTA from "@/components/sections/mentors/MentorsCTA";

export const metadata: Metadata = {
  title: "हमरे अभिभावक | गोरखपुरिया भोजपुरिया",
  description: "हमार संगठन के मार्गदर्शक और संरक्षकों के बारे में जानें",
};

export default function MentorsPage() {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center w-full pointer-events-auto"
    >
      <PageHeader
        title="हमरे अभिभावक"
        subtitle="भोजपुरी भाषा के संरक्षण में हमार मार्गदर्शक"
        backgroundImage="/images/mentors/header-bg.jpg"
      />

      {/* Memorial + Honors */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto">
        <FeaturedInspiration />
      </div>

      {/* Rich mentor profiles */}
      <MentorProfiles />

      {/* CTA */}
      <MentorsCTA />
    </SectionWrapper>
  );
}
