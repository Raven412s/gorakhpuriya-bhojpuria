// app/events/page.tsx


import ClientEvents from "@/components/pages/events";
import HeroSlider from "@/components/sections/home/HeroSlider";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import type{ Metadata } from "next";

export const metadata: Metadata = {
  title: "बैइठकी जुटान | गोरखपुरिया भोजपुरिया",
  description: "गोरखपुरिया भोजपुरिया के सभी जुटान और बैठकी कार्यक्रमों का विस्तृत विवरण",
};

const EventsPage = () => {

  const images = [
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130607/uploads/jla9qhaxtseesua1rpt6.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130607/uploads/jla9qhaxtseesua1rpt6.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130596/uploads/hdnigtpp8ns3eefb2kkw.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759131316/uploads/jnarcbnymm0zd3c5evo6.png",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759135332/DSC_0371_kyehnm.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759140589/uploads/o0e1jd4lzfr489tritch.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186339/uploads/cbflugqoorgft9lavo0a.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186371/uploads/vcvh2yu7aacyld6lznrc.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186421/uploads/xk6igcvivmraeumw8rux.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186421/uploads/xk6igcvivmraeumw8rux.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186431/uploads/gdkqain4awhavpolktl4.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186374/uploads/vuetgkplvhv5vuqlkbnf.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759190764/uploads/txyyh8ahnmszee3o8iqj.jpg",
    "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759190736/uploads/qabox2lx7nbfkyuvglyc.jpg",
  ]

return(

   <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pointer-events-auto relative"
    >
      {/* Hero Section */}
      <PageHeader
        title="बैइठकी जुटान"
        subtitle="गोरखपुरिया भोजपुरिया समुदाय के विशेष कार्यक्रमों और बैठकों का सुन्दर संग्रह"
        backgroundImage="/images/events/header-bg.jpg"
      />
<HeroSlider sliderImages={images} />
<ClientEvents/>
</SectionWrapper>
)
};

export default EventsPage;