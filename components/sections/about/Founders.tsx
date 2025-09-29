"use client";
import { motion, useInView } from "framer-motion";
import { Award, MapPin, Quote, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const founders = [
  {
    name: "श्री विकास श्रीवास्तव",
    title: "संस्थापक एवं संयोजक",
    image: "/images/founders/vikash-srivastava.jpg",
    quote:
      "भोजपुरी भासा पर लगल पिछड़ेपन के ठप्पा तब्बे हटी जब एह भासा में बे हिचक बोलल बतियावल जाइ । घरे के साथ साथ अपने कार्यस्थल पर भी भोजपुरी अपनऊले के जरूरत बा",
    bio: "विकास जी भोजपुरी भाषा के संरक्षण के लिए समर्पित एक सामाजिक कार्यकर्ता हैं। उन्होंने कॉर्पोरेट जगत और व्यवसायिक समुदाय के बीच भोजपुरी भाषा को लोकप्रिय बनाने में महत्वपूर्ण भूमिका निभाई है।",
    achievements: [
      "4+ वर्षों का सामाजिक कार्य अनुभव",
      "1500+ सदस्यों के समूह का नेतृत्व",
      "100+ सांस्कृतिक कार्यक्रमों का आयोजन",
    ],
  },
  {
    name: "श्री नरेन्दर मिसिर",
    title: "सह-संस्थापक एवं सह-संयोजक",
    image: "/images/founders/narendra-mishra.jpg",
    quote:
      "भोजपुरी भासा के संविधान के आठवीं अनुसूची में शामिल कईले के मांग से पहिले एके अपने घरे के पहिली अनुसूची में शामिल कईले के जरूरत बा ताकि एह भासा में बोलल बतियावल जा सके",
    bio: "नरेंद्र जी एक समर्पित शिक्षाविद और सामाजिक कार्यकर्ता हैं जो भोजपुरी भाषा के शैक्षणिक विकास के लिए काम कर रहे हैं। उनका फोकस युवा पीढ़ी को भोजपुरी से जोड़ने पर है।",
    achievements: [
      "शिक्षा क्षेत्र में 10+ वर्ष अनुभव",
      "युवा जागरूकता अभियान के प्रमुख",
      "साहित्यिक कार्यक्रमों के संयोजक",
    ],
  },
];

export default function Founders() {
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
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            हमार संस्थापक
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भोजपुरी भाषा के सम्मान के लिए समर्पित ये महान व्यक्तित्व
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12"
        >
          {founders.map((founder) => (
            <motion.div key={founder.name} variants={itemVariants}>
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 overflow-hidden">
                <div className="relative">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 opacity-10"></div>

                  <CardContent className="p-0">
                    {/* Founder Header */}
                    <div className="relative p-8 bg-gradient-to-r from-red-600 to-orange-500 text-white">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-white/20 rounded-full p-1 relative overflow-hidden">
                            <Image
                              src={founder.image}
                              alt={founder.name}
                              fill
                              className="rounded-full object-cover border-4 border-white/30"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">
                            {founder.name}
                          </h3>
                          <p className="text-yellow-200 font-medium">
                            {founder.title}
                          </p>
                          <div className="flex items-center mt-2 text-sm opacity-90">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>गोरखपुर, उत्तर प्रदेश</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quote Section */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <Quote className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                        <blockquote>
                          <p className="text-lg text-gray-700 italic leading-relaxed">
                            "{founder.quote}"
                          </p>
                        </blockquote>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div className="p-6 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="h-5 w-5 text-red-600 mr-2" />
                        परिचय
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="h-5 w-5 text-red-600 mr-2" />
                        उपलब्धियाँ
                      </h4>
                      <ul className="space-y-2">
                        {founder.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Founding Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                    संस्थापकों की प्रेरणादायक कहानी
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    विकास श्रीवास्तव और नरेंद्र मिश्र की मुलाकात 2019 में एक सांस्कृतिक
                    कार्यक्रम में हुई थी। दोनों ने महसूस किया कि भोजपुरी भाषा को समाज में
                    उचित सम्मान नहीं मिल रहा है। इसी चिंता ने उन्हें गोरखपुरिया भोजपुरिया
                    की स्थापना के लिए प्रेरित किया।
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    आज यह संगठन 1500 से अधिक सदस्यों के साथ भोजपुरी भाषा के संरक्षण के लिए
                    काम कर रहा है।
                  </p>
                </div>
                <div className="relative h-64">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src="/site-local/together2.jpg"
                      alt="Founders Together"
                      fill
                      className="object-cover shadow-2xl rounded-lg"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
