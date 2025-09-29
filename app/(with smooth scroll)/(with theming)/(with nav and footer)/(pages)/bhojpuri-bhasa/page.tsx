// app/(pages)/bhojpuri-bhasa/page.tsx

import type { Metadata } from "next";
import Demographics from "@/components/sections/bhojpuri/Demographics";
import HistoryOrigin from "@/components/sections/bhojpuri/HistoryOrigin";
import LanguageFeatures from "@/components/sections/bhojpuri/LanguageFeatures";
import RegionsMap from "@/components/sections/bhojpuri/RegionsMap";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export const metadata: Metadata = {
  title: "भोजपुरी भाषा | गोरखपुरिया भोजपुरिया",
  description: "भोजपुरी भाषा के इतिहास, भूगोल, और सांस्कृतिक महत्व के बारे में जानें",
};

const BhojpuriBhasaPage = () => {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10"
    >
      <PageHeader
        title="भोजपुरी भाषा"
        subtitle="विश्व के दसवीं सबसे ज्यादा बोलल जाय वाली भाषा के गौरवशाली इतिहास"
        backgroundImage="/images/bhojpuri/header-bg.jpg"
      />
      <HistoryOrigin />
      <Demographics />
      <RegionsMap />
      <LanguageFeatures />
    </SectionWrapper>
  );
};

export default BhojpuriBhasaPage;
