"use client";
import { motion, useInView } from "framer-motion";
import { Award, Book, Calendar, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryOrigin() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const timelineEvents = [
    {
      year: "7वीं सदी",
      title: "भोजपुरी के उत्पत्ति",
      description: "भोजपुरी भाषा के इतिहास 7वीं सदी से शुरू होला",
      icon: Calendar,
    },
    {
      year: "मध्य काल",
      title: "भोजवंशी राजाओं के योगदान",
      description: "भोजपुर नामक स्थान पर भोजवंशी राजाओं द्वारा बसावट",
      icon: Users,
    },
    {
      year: "16वीं सदी",
      title: "कैथी लिपि का प्रचलन",
      description: "कैथी लिपि का व्यापक उपयोग शुरू होइल",
      icon: Book,
    },
    {
      year: "2009",
      title: "कैथी लिपि को मान्यता",
      description: "कैथी लिपि को यूनिकोड 5.2 में शामिल कइल गइल",
      icon: Award,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            भोजपुरी भाषा के इतिहास
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            7वीं सदी से ले के आज तक के गौरवशाली यात्रा
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 text-red-600 mr-3" />
                  भोजपुरी के उत्पत्ति
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  भोजपुरी भाषा के इतिहास 7 वीं सदी से शुरू होला । मध्य काल में भोजपुर नाम
                  के स्थान में मध्य प्रदेश के उज्जैन से आइल भोजवंशी राजा लोग ए गो गाँव बसउले
                  रहलें थ । जे के आपन राजधानी बनउलें । इनही के राजा रहलें भोज जिनके नामे पर
                  ओह स्थान के नाम भोजपुर पड़ गइल आ उनके बोल चाल के भासा भोजपुरी कहाईल.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-800 font-semibold">
                    "भोजपुर" नाम भोजवंशी राजा भोज के नाम पर रखल गइल, जेकरा से भोजपुरी
                    भाषा के नामकरण भइल।
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kaithi Script */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Book className="h-6 w-6 text-blue-600 mr-3" />
                  कैथी लिपि के इतिहास
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  एकरे पहिले ब्राह्मी लिपि में कैथी नामक ए गो लिपि रहल जेके "कयथी" या
                  "कायस्थी", के नाम से जानल जाला । ई देवनागरी लिपि से मिलत जुलत लिपि ह
                  । सोलहवीं सदी में एकर बहुत अधिक उपयोग कइल जात रहल । मुग़ल शासन काल के
                  समय भी एकर बहुत उपयोग कइल जात रहल । अंग्रेज लोग एह लिपि के प्रयोग
                  आधिकारिक रूप से बिहार के न्यायालयन में करत रहलें । बाद में एह लिपि के
                  स्थान में देवनागरी लिपि का उपयोग होखे लगल. कैथी लिपि के वर्ष 2009 में
                  मानक 5.2 में शामिल कइल गइल रहल.
                </p>

                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>कैथी लिपि उदाहरण:</strong> 𑂍𑂵𑂪𑂳𑂀 𑂮𑂥 𑂦𑂷𑂔𑂣𑂳𑂩𑂲 𑂥𑂯𑂳𑂢𑂰 𑂧𑂵𑂀
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            भोजपुरी भाषा के समयरेखा
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 to-orange-500 h-full"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-2">
                          <event.icon className="h-5 w-5 text-red-600 mr-2" />
                          <span className="font-bold text-red-600">
                            {event.year}
                          </span>
                        </div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Year */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? "translate-x-12" : "-translate-x-12"} bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap`}
                  >
                    {event.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* World Bhojpuri Day */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-500 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                    विश्व भोजपुरी दिवस
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    संत कबीर दास (1297) के जन्मदिवस भोजपुरी दिवस के रूप में भारत में
                    स्वीकार कइल गइल बा आ एके विश्व भोजपुरी दिवस के रूप में मनावल जाला.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">जून 24</div>
                      <div className="text-sm">वार्षिक उत्सव</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">1297</div>
                      <div className="text-sm">संत कबीर जन्म</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-64">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src="/people/sant-kabir-das.jpg"
                      alt="संत कबीर दास"
                      fill
                      className="object-cover shadow-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
