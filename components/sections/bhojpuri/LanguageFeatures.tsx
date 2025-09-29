"use client";
import { motion } from "framer-motion";
import { Award, Book, Film, Heart, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Book,
    title: "समृद्ध साहित्य",
    description:
      "भोजपुरी में समृद्ध साहित्यिक परंपरा बा, जेहमे कविता, कहानी, और नाटक शामिल बा।",
    examples: ["भिखारी ठाकुर के नाटक", "राहुल सांकृत्यायन के रचना", "लोक कथाकार"],
  },
  {
    icon: Music,
    title: "लोक संगीत",
    description:
      "भोजपुरी लोक संगीत दुनिया भर में प्रसिद्ध बा, विशेष रूप से विदेश में बसल भोजपुरी समुदाय में।",
    examples: ["कजरी", "चैता", "सोहर", "विवाह गीत"],
  },
  {
    icon: Film,
    title: "सिनेमा उद्योग",
    description:
      "भोजपुरी फिल्म उद्योग भारत के सबसे बड़ क्षेत्रीय सिनेमा उद्योग में से एक बा।",
    examples: ["1000+ फिल्म", "वार्षिक रिलीज", "अंतर्राष्ट्रीय पहुंच"],
  },
];

export default function LanguageFeatures() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            भोजपुरी भाषा के विशेषताएं
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            सांस्कृतिक समृद्धि और भाषाई विविधता
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.examples.map((example, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-500 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  भोजपुरी भाषा के संरक्षण में सहयोग दीजिए
                </h3>
                <p className="text-lg mb-6">
                  आइए मिलके एह समृद्ध भाषा के विरासत के आगे वाली पीढ़ी खातिर सुरक्षित
                  रखीं।
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    सदस्य बनें
                  </Button>
                  <Button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition">
                    और जानें
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
