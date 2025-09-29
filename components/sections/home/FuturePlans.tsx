/** biome-ignore-all lint/suspicious/noArrayIndexKey: explanation */
"use client";
import { motion, useInView } from "framer-motion";
import {
  Book,
  Film,
  GraduationCap,
  Library,
  Music,
  Newspaper,
  Users,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const futurePlans = [
  {
    icon: Book,
    title: "हिन्दी-भोजपुरी-अंग्रेजी शब्दकोश",
    description: "Hindi-Bhojpuri-English Dictionary",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Library,
    title: "भोजपुरी शोध एवं अध्ययन केंद्र",
    description: "Bhojpuri Research and Study Centre",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Library,
    title: "भोजपुरी पुस्तकालय",
    description: "Bhojpuri Library",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Music,
    title: "लोकगीत एवं संगीत का संकलन एवं संरक्षण",
    description: "Collection and preservation of folk songs and music",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Newspaper,
    title: "भोजपुरी पत्रिका का प्रकाशन",
    description: "Publication of a Bhojpuri magazine",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Users,
    title: "नयी पीढ़ी के लिए जागरुकता अभियान",
    description: "Awareness campaign for the new generation",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Film,
    title: "भोजपुरी पुरोधाओं पर डाक्यूमेंट्री फ़िल्में",
    description: "Documentary films on Bhojpuri pioneers",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Library,
    title: "सदस्यन के ई-डाईरेक्ट्री",
    description: "E-Directory Of Members",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "विश्वविद्यालय एवं कॉलेज में जागरूकता अभियान",
    description: "Awareness campaigns in universities and colleges",
    color: "from-violet-500 to-purple-500",
  },
];

export default function FuturePlans() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
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
            आगामी योजना
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भोजपुरी भाषा और संस्कृति के विकास के लिए हमारी भविष्य की योजनाएं
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {futurePlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                <CardContent className="p-6 h-full flex flex-col">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
                    {plan.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {plan.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>योजना प्रगति पर</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div
                          className={`bg-gradient-to-r ${plan.color} h-1 rounded-full`}
                          style={{ width: `${Math.random() * 30 + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
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
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              इन योजनाओं में सहयोग दीजिए
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              भोजपुरी भाषा के विकास में अपना योगदान दें और इन महत्वपूर्ण परियोजनाओं का
              हिस्सा बनें
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                सहयोग करें
              </Button>
              <Button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                और जानें
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
