import type { Metadata } from "next";
import EventSection, { type EventSectionData } from "@/components/sections/events/EventSection";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export const metadata: Metadata = {
  title: "बैइठकी जुटान | गोरखपुरिया भोजपुरिया",
  description: "गोरखपुरिया भोजपुरिया के सभी जुटान और बैठकी कार्यक्रमों का विस्तृत विवरण",
};

// Events data
const event: EventSectionData = {
  id: 1,
  title: "फगुआ पे जुटान",
  date: "मार्च 2024",
  venue: "गोरखपुर",
  type: "जुटान",
  motive: "समुदाय को जोड़ना और परंपरा का उत्सव",
  description: ["गोरखपुरिया भोजपुरिया परिवार की ओर से फगुआ पर पारंपरिक कार्यक्रम।",],
  images: [
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
  ],
  attendees: ["राहुल जी", "प्रियंका जी", "संजय जी"],
  totalPhotos: 45,
  performances: [
    { title: "फगुआ गीत", performer: "स्थानीय दल", durationMin: 15, description:["गोरखपुरिया भोजपुरिया परिवार की ओर से फगुआ पर पारंपरिक कार्यक्रम।"], mediaUrls: ["https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg","https://res.cloudinary.com/dfhxmmjyq/video/upload/v1759214734/uploads/dsgqhprx85rtsjgkoue9.mov","https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg","https://res.cloudinary.com/dfhxmmjyq/video/upload/v1759214734/uploads/dsgqhprx85rtsjgkoue9.mov"] },
    { title: "फगुआ गीत", performer: "स्थानीय दल", durationMin: 15, description:["गोरखपुरिया भोजपुरिया परिवार की ओर से फगुआ पर पारंपरिक कार्यक्रम।"], mediaUrls: ["https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg","https://res.cloudinary.com/dfhxmmjyq/video/upload/v1759214734/uploads/dsgqhprx85rtsjgkoue9.mov"] },
    { title: "फगुआ गीत", performer: "स्थानीय दल", durationMin: 15, description:["गोरखपुरिया भोजपुरिया परिवार की ओर से फगुआ पर पारंपरिक कार्यक्रम।"], mediaUrls: ["https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg","https://res.cloudinary.com/dfhxmmjyq/video/upload/v1759214734/uploads/dsgqhprx85rtsjgkoue9.mov"] },
    { title: "फगुआ गीत", performer: "स्थानीय दल", durationMin: 15, description:["गोरखपुरिया भोजपुरिया परिवार की ओर से फगुआ पर पारंपरिक कार्यक्रम।"], mediaUrls: ["https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759186383/uploads/ihq383gwpsnxu0rzdupe.jpg","https://res.cloudinary.com/dfhxmmjyq/video/upload/v1759214734/uploads/dsgqhprx85rtsjgkoue9.mov"] },
    { title: "नृत्य प्रस्तुति", performer: "बाल समूह" },
  ],
  learnings: [
    "संगठन में समन्वय बढ़ा",
    "युवा भागीदारी में वृद्धि",
  ]
};

const EventsPage = () => {
  return (
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

      <EventSection event={event} />
    </SectionWrapper>
  );
};

export default EventsPage;
