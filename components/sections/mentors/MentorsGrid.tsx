"use client";
import { motion, useInView } from "framer-motion";
import { Award, Book, GraduationCap, Mic, Newspaper, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mentors = [
  {
    id: 1,
    name: "डा. रवीन्द्र श्रीवास्तव 'जुगानी'",
    title: "प्रेरणास्रोत (Source of Inspiration)",
    role: "आकाशवाणी गोरखपुर के सेवा निवृत्त कार्यक्रम अधिकारी",
    image: "/people/jugani.jpeg",
    achievements: [
      "500+ लघु नाटिकाओं का लेखन और निर्देशन",
      "उ.प्र. हिन्दी संस्थान से लोकभूषण सम्मान",
      "विद्याश्री न्यास के आचार्य विद्यानिवास मिश्र स्मृति सम्मान",
      "विद्यानिवास मिश्र लोककला सम्मान",
    ],
    works: ["मोथा अउर माटी", "गीत गांव-गांव के", "नोकियात दूब", "अखबारी कविता"],
    description:
      "जुगानी भाई नाम से विख्यात डा. रवीन्द्र नाथ श्रीवास्तव पर दीनदयाल उपाध्याय गोरखपुर विश्वविद्यालय के हिन्दी एवं आधुनिक भारतीय भाषा तथा पत्रकारिता विभाग में शोध प्रबंध प्रस्तुत हो चुकल बा।",
    specialties: ["रेडियो नाटक", "लोक साहित्य", "सांस्कृतिक कार्यक्रम", "भोजपुरी शोध"],
    icon: Mic,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "डा. संजयन त्रिपाठी",
    title: "अभिभावक (Guardian)",
    role: "नवल्स एकेडमी समूह के अध्यक्ष",
    image: "/people/sanjyan-tripathi.jpg",
    achievements: [
      "दर्जनों विद्यालय और उच्च शिक्षा संस्थान का संचालन",
      "भाजपा के वरिष्ठ नेता",
      "शिक्षा क्षेत्र में उत्कृष्ट योगदान",
      "सामाजिक और सांस्कृतिक कार्यकर्ता",
    ],
    works: [
      "शैक्षणिक संस्थान प्रबंधन",
      "राजनीतिक मार्गदर्शन",
      "सामाजिक उत्थान",
      "सांस्कृतिक संरक्षण",
    ],
    description:
      "एक शिक्षाविद और शिक्षक होने के साथ ही वे राजनीति में भी खासे सक्रिय हैं। भोजपुरी में इनके गहरी रुचि और इस भाषा के संरक्षण और संवर्धन में वे हमें हमारे साथ खड़े रहते हैं।",
    specialties: ["शिक्षा प्रशासन", "राजनीति", "समाज सेवा", "संस्था निर्माण"],
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "प्रो. हर्ष सिन्हा",
    title: "अभिभावक (Guardian)",
    role: "दीनदयाल उपाध्याय गोरखपुर विश्वविद्यालय में प्रोफेसर",
    image: "/people/harsh-sinha.png",
    achievements: [
      "विभागाध्यक्ष, क्रीड़ा परिषद अध्यक्ष, मानद ग्रंथालयी",
      "नई शिक्षा नीति समिति के सदस्य",
      "जी-20 एंबेसडर के रूप में नामित",
      "गोरखपुर लिटरेरी फेस्टिवल के अध्यक्ष",
    ],
    works: [
      "इंडिया टुडे, बीबीसी के लिए रिपोर्टिंग",
      "राष्ट्रीय सहारा में स्तंभ लेखन",
      "आजकल पत्रिका के संपादन",
      "शैक्षणिक शोध और प्रकाशन",
    ],
    description:
      "लगभग 25 साल तक इंडिया टुडे, बीबीसी और संडे मेल खातिर पूर्वी उत्तर प्रदेश के रिपोर्टिंग के अलावा राष्ट्रीय सहारा में खबर और स्तंभ लिखले और फीचर परिशिष्ट 'आजकल' के संपादन के नाते प्रसिद्ध।",
    specialties: ["शिक्षा", "पत्रकारिता", "साहित्य", "सांस्कृतिक आयोजन"],
    icon: Newspaper,
    color: "from-green-500 to-emerald-500",
  },
];

export default function MentorsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            हमार मार्गदर्शक परिचय
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भोजपुरी भाषा और संस्कृति के संरक्षण में इनके योगदान अतुलनीय बा
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8"
        >
          {mentors.map((mentor) => (
            <motion.div key={mentor.id} variants={itemVariants}>
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 overflow-hidden group">
                <div className="relative">
                  {/* Header with Gradient */}
                  <div
                    className={`bg-gradient-to-r ${mentor.color} p-6 text-white relative overflow-hidden`}
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/10 rounded-full"></div>

                    <div className="relative z-10 flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white/20 rounded-full p-1 relative overflow-hidden">
                          <Image
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            className="rounded-full object-cover border-4 border-white/30"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-yellow-200 font-medium text-sm">
                          {mentor.title}
                        </p>
                        <p className="text-white/90 text-xs mt-1">
                          {mentor.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    {/* Description */}
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {mentor.description}
                      </p>
                    </div>

                    {/* Specialties */}
                    <div className="p-6 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <mentor.icon className="h-5 w-5 text-gray-600 mr-2" />
                        विशेषज्ञता क्षेत्र
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="p-6 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="h-5 w-5 text-yellow-600 mr-2" />
                        प्रमुख उपलब्धियाँ
                      </h4>
                      <ul className="space-y-2">
                        {mentor.achievements.slice(0, 3).map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Literary Works */}
                    {mentor.works && (
                      <div className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Book className="h-5 w-5 text-red-600 mr-2" />
                          प्रमुख रचनाएँ
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {mentor.works.map((work) => (
                            <span
                              key={work}
                              className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs text-center font-medium"
                            >
                              {work}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-500 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  इन मार्गदर्शकों के अनुभव से सीखें
                </h3>
                <p className="text-lg mb-6">
                  हमार अभिभावकन के ज्ञान और अनुभव से लाभ उठाएं और भोजपुरी भाषा के संरक्षण
                  में अपना योगदान दें
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    संपर्क करें
                  </Button>
                  <Button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                    कार्यक्रम देखें
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
