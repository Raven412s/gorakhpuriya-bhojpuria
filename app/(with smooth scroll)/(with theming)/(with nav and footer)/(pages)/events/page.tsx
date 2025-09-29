import type { Metadata } from "next";
import EventsGallery from "@/components/sections/events/EventGallery";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

export const metadata: Metadata = {
  title: "बैइठकी जुटान | गोरखपुरिया भोजपुरिया",
  description: "गोरखपुरिया भोजपुरिया के सभी जुटान और बैठकी कार्यक्रमों का विस्तृत विवरण",
};

// Events data
const eventsData = {
  jutan: [
    {
      id: 1,
      title: "फगुआ पे जुटान (Holi Gathering)",
      description:
        "गोरखपुरिया भोजपुरिया परिवार की ओर से हर साल फगुआ पे जुटान कार्यक्रम आयोजित किया जाता है। सभी सदस्य और आमंत्रित अतिथि मिलकर पारंपरिक लोक उत्सव का आनंद लेते हैं और फगुआ के रंग में रंग जाते हैं।",
      type: "jutan",
      date: "मार्च 2024",
      location: "गोरखपुर",
      photos: [
        "/images/events/holi/holi1.jpg",
        "/images/events/holi/holi2.jpg",
        "/images/events/holi/holi3.jpg",
        "/images/events/holi/holi4.jpg",
        "/images/events/holi/holi5.jpg",
        "/images/events/holi/holi6.jpg",
      ],
      attendees: [
        "राहुल जी",
        "प्रियंका जी",
        "संजय जी",
        "अनिता जी",
        "विकास जी",
        "और 25+ सदस्य",
      ],
      totalPhotos: 45,
    },
  ],
  baithaki: [
    {
      id: 1,
      title: "विश्व पर्यावरण दिवस (World Environment Day)",
      description:
        "छोटी बैठक / चर्चा सभा आयोजित, जहां सदस्य और अतिथि पर्यावरण के महत्व पर विचार-विमर्श करते हैं और पौधारोपण करते हैं।",
      type: "baithaki",
      date: "5 जून 2024",
      locations: ["पंत पार्क", "संजयन जी के घर", "नौका विहार", "सुरजकुंड", "ऑफिस"],
      photos: [
        "/images/events/environment/env1.jpg",
        "/images/events/environment/env2.jpg",
        "/images/events/environment/env3.jpg",
        "/images/events/environment/env4.jpg",
      ],
      attendees: ["डॉ. राजेश जी", "सीमा जी", "अमित जी", "नीतू जी", "और 15+ सदस्य"],
      totalPhotos: 38,
    },
    {
      id: 2,
      title: "मासिक बैठक - जनवरी",
      description:
        "समुदाय की नियमित मासिक बैठक जहां आगामी कार्यक्रमों की योजना बनाई गई।",
      type: "baithaki",
      date: "15 जनवरी 2024",
      locations: ["संजयन जी के घर"],
      photos: [
        "/images/events/meeting/jan1.jpg",
        "/images/events/meeting/jan2.jpg",
        "/images/events/meeting/jan3.jpg",
      ],
      attendees: ["सभी कोर सदस्य", "विशेष अतिथि"],
      totalPhotos: 22,
    },
  ],
};

const EventsPage = () => {
  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50"
    >
      {/* Hero Section */}
      <PageHeader
        title="बैइठकी जुटान"
        subtitle="गोरखपुरिया भोजपुरिया समुदाय के विशेष कार्यक्रमों और बैठकों का सुन्दर संग्रह"
        backgroundImage="/images/events/header-bg.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Jutan Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-orange-900 mb-2">
              जुटान (बड़े सम्मेलन)
            </h2>
            <p className="text-lg text-gray-600">समुदाय के बड़े और विशेष आयोजन</p>
          </div>
          <EventsGallery events={eventsData.jutan} />
        </section>

        {/* Baithaki Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-green-900 mb-2">
              बैठकी (छोटी बैठकें)
            </h2>
            <p className="text-lg text-gray-600">नियमित बैठकें और छोटे समारोह</p>
          </div>
          <EventsGallery events={eventsData.baithaki} />
        </section>
      </div>
    </SectionWrapper>
  );
};

export default EventsPage;
