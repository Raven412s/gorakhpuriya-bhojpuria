import FuturePlans from "@/components/sections/home/FuturePlans";
import HeroSlider, {type SliderImageObj } from "@/components/sections/home/HeroSlider";
import Introduction from "@/components/sections/home/Introduction";
import Testimonials from "@/components/sections/home/Testimonials";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export default function Home() {
  const sliderImages: SliderImageObj[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130060/uploads/zzxwoidyy9taboqbv0dh.jpg",
    alt: "Gorakhpuriya Bhojpuria Group Photo",
    title: "गोरखपुरिया भोजपुरिया परिवार",
    description: "भोजपुरी भाषा के सम्मान खातिर संकल्पित",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759131316/uploads/jnarcbnymm0zd3c5evo6.png",
    alt: "Gorakhpuriya Bhojpuria Group Photo",
    title: "गोरखपुरिया भोजपुरिया परिवार",
    description: "भोजपुरी भाषा के सम्मान खातिर संकल्पित",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759131965/IMG_4573_odp7oy.jpg",
    alt: "Gorakhpuriya Bhojpuria Group Photo",
    title: "गोरखपुरिया भोजपुरिया परिवार",
    description: "भोजपुरी भाषा के सम्मान खातिर संकल्पित",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130596/uploads/hdnigtpp8ns3eefb2kkw.jpg",
    alt: "Gorakhpuriya Bhojpuria Group Photo",
    title: "गोरखपुरिया भोजपुरिया परिवार",
    description: "भोजपुरी भाषा के सम्मान खातिर संकल्पित",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130607/uploads/jla9qhaxtseesua1rpt6.jpg",
    alt: "Gorakhpuriya Bhojpuria Group Photo",
    title: "गोरखपुरिया भोजपुरिया परिवार",
    description: "भोजपुरी भाषा के सम्मान खातिर संकल्पित",
  },
];

  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="flex flex-col items-center justify-center min-h-screen w-full pointer-events-auto p-10 pb-0 "
    >
      <HeroSlider sliderImages={sliderImages} />
      <Introduction />
      <Testimonials />
      <FuturePlans />
    </SectionWrapper>
  );
}
