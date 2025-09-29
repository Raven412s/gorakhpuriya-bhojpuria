"use client";
import { motion, useInView } from "framer-motion";
import { Heart, Star, Target, Users } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MentorIntroduction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const mentorStats = [
    {
      icon: Users,
      value: "50+",
      label: "वर्ष संयुक्त अनुभव",
      description: "सामाजिक और सांस्कृतिक कार्य",
    },
    {
      icon: Target,
      value: "1000+",
      label: "कार्यक्रमों का मार्गदर्शन",
      description: "सफल आयोजन और नेतृत्व",
    },
    {
      icon: Star,
      value: "25+",
      label: "राष्ट्रीय पुरस्कार",
      description: "उत्कृष्ट योगदान के लिए",
    },
    {
      icon: Heart,
      value: "4",
      label: "क्षेत्रों में विशेषज्ञता",
      description: "शिक्षा, संस्कृति, मीडिया, समाज सेवा",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Introduction Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              हमार मार्गदर्शक
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              गोरखपुरिया भोजपुरिया के सफलता के पीछे कुछ विशिष्ट व्यक्तित्व के मार्गदर्शन बा,
              जे अपने-अपने क्षेत्र में विशेषज्ञ होखे के साथ-साथ भोजपुरी भाषा और संस्कृति के संरक्षण
              के लिए समर्पित बाड़ें।
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              इन अभिभावकन के अनुभव और मार्गदर्शन के बदौलत हमार संगठन निरंतर प्रगति के पथ
              पर अग्रसर बा। इनके सुझाव और समर्थन हमार खातिर प्रेरणा के स्रोत बा।
            </p>

            <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-800 font-semibold">
                "एक अनुभवी मार्गदर्शक के साथ, संगठन के सफलता निश्चित हो जाला"
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {mentorStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-gray-700 text-sm mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mentor Qualities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                हमार अभिभावकन के विशेषताएं
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "अनुभव",
                    description: "दशकों का सामाजिक और सांस्कृतिक कार्य अनुभव",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "विशेषज्ञता",
                    description: "अपने-अपने क्षेत्र में विशेषज्ञ ज्ञान",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    title: "समर्पण",
                    description: "भोजपुरी भाषा के प्रति गहरा समर्पण",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "नेतृत्व",
                    description: "युवाओं के लिए प्रेरणादायक नेतृत्व",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((quality) => (
                  <div key={quality.title} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${quality.color} flex items-center justify-center`}
                    >
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {quality.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {quality.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
