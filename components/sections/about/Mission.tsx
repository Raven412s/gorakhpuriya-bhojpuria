"use client";
import { motion, useInView } from "framer-motion";
import { Eye, Heart, Target, Users } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "सम्मान",
    description: "भोजपुरी भाषा के सभ्य समाज में सम्मान दिलाना",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "समुदाय",
    description: "भोजपुरी भाषी लोगों के बीच एकता बनाना",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "लक्ष्य",
    description: "भोजपुरी भाषा का संरक्षण और विकास",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: "दृष्टि",
    description: "भविष्य की पीढ़ियों के लिए भोजपुरी को सुरक्षित रखना",
    color: "from-purple-500 to-indigo-500",
  },
];

export default function MissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
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
            हमार मिशन और दृष्टि
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भोजपुरी भाषा के संरक्षण और विकास के लिए हमारा संकल्प
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Mission */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    हमार उद्देश्य
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  ए गो अइसन समाज के कल्पना जहाँ भोजपुरी भाषा के उचित सम्मान मिले आ ई
                  शिक्षा, साहित्य, आ सार्वजनिक जीवन के मुख्यधारा में शामिल हो । भविष्य के
                  पीढ़ियन खातिर एह समृद्ध भाषा के सुरक्षित रखल जा सके । भोजपुरी के
                  संवैधानिक मान्यता मिले आ शैक्षणिक संस्थानन में भोजपुरी पाठ्यक्रम भी लागू कइल
                  जा सके। एह भाषा के वैश्विक स्तर पर पहचान मिले आ एकर सम्मान होखे।
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">भोजपुरी भाषा का संरक्षण</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">युवाओं में जागरूकता फैलाना</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      सांस्कृतिक विरासत को बचाना
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    हमार दृष्टि
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  एक ऐसे समाज की कल्पना जहाँ भोजपुरी भाषा को उचित सम्मान मिले और यह
                  शिक्षा, साहित्य, और सार्वजनिक जीवन की मुख्यधारा में शामिल हो। भविष्य
                  की पीढ़ियों के लिए इस समृद्ध भाषा को सुरक्षित रखना।
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      भोजपुरी को संवैधानिक मान्यता
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      शैक्षणिक संस्थानों में पाठ्यक्रम
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">वैश्विक स्तर पर पहचान</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            हमार मूल्य
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
