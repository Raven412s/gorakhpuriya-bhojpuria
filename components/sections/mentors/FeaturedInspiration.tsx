
"use client";
import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const juganiBioShort = `स्व. रवीन्द्र श्रीवास्तव “जुगानी भाई” — आकाशवाणी गोरखपुर के सेवा निवृत्त कार्यक्रम अधिकारी। दीनदयाल उपाध्याय गोरखपुर विश्वविद्यालय (हिन्दी/आधुनिक भारतीय भाषा एवं पत्रकारिता विभाग) में उन पर शोध प्रबंध प्रस्तुत हो चुकल बा। आकाशवाणी गोरखपुर खातिर 500+ लघु नाटिका के लेखन-निर्देशन कइले।`;

const juganiBioFull = `
जुगानी भाई के उ.प्र. हिन्दी संस्थान से लोकभूषण सम्मान, 2013 में विद्याश्री न्यास के आचार्य विद्यानिवास मिश्र स्मृति सम्मान, विद्यानिवास मिश्र लोककला सम्मान प्राप्त भईल। उनकर रचनाएँ— ‘मोथा अउर माटी’, ‘गीत गांव-गांव के’, ‘नोकियात दूब’, ‘अखबारी कविता’—से भोजपुरी की थाती बढ़ल बा।

उ.प्र. हिन्दी संस्थान वर्ष 2015 के भिखारी ठाकुर सम्मान; 2001 संस्कार भारती, 2002 लोकभूषण, 2004 भोजपुरी रत्न, 2009 सरयू रत्न, 2011 पं. श्याम नारायण पांडेय, 2012 राहुल सांकृत्यायन पुरस्कार। 
आप 14 फ़रवरी 2025 के अनंत यात्रा पर प्रस्थान क गईलीं।
`.trim();

const honors = [
  "उ.प्र. हिन्दी संस्थान — लोकभूषण सम्मान",
  "2013 — विद्याश्री न्यास: आचार्य विद्यानिवास मिश्र स्मृति सम्मान",
  "विद्यानिवास मिश्र लोककला सम्मान",
  "2015 — उ.प्र. हिन्दी संस्थान: भिखारी ठाकुर सम्मान",
  "2001 — संस्कार भारती",
  "2002 — लोकभूषण",
  "2004 — भोजपुरी रत्न",
  "2009 — सरयू रत्न",
  "2011 — पं. श्याम नारायण पांडेय सम्मान",
  "2012 — राहुल सांकृत्यायन पुरस्कार",
];

export default function FeaturedInspiration() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl shadow-xl bg-white"
      >
        {/* Hero banner */}
        <div className="relative h-[360px] md:h-[460px]">
          <Image
            src="https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.25_dc59cd0f_oks05i.jpg" // अपनी hero image रखें
            alt="स्व. डॉ. रवीन्द्र श्रीवास्तव 'जुगानी भाई'"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>

          {/* ribbon */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-red-600 text-white px-4 py-1 text-sm font-semibold shadow-md">
              स्वर्गीय
            </span>
          </div>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="px-6 md:px-10 pb-8 text-white max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow">
                रवीन्द्र श्रीवास्तव “जुगानी भाई”
              </h2>
              <p className="mt-2 text-sm md:text-base opacity-95">
                आकाशवाणी गोरखपुर (सेवा निवृत्त कार्यक्रम अधिकारी) • 500+ रेडियो लघु-नाटिकाएँ
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-3 gap-6 p-6 md:p-8">
          {/* Bio */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-5 w-5 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  प्रेरणास्रोत — संक्षेप परिचय
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{juganiBioShort}</p>

              <div
                className={`mt-3 overflow-hidden transition-all duration-300 ${
                  expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {juganiBioFull}
                </p>
              </div>

              <Button
                className="mt-4 text-sm font-semibold hover:underline"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "कम पढ़ें" : "और पढ़ें"}
              </Button>
            </CardContent>
          </Card>

          {/* Honors */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  सम्मान एवं उपलब्धियाँ
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {honors.map((h) => (
                  <li key={h} className="flex items-start">
                    <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quote band */}
        <div className="px-6 md:px-8 pb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-white">
            <CardContent className="p-6">
              <p className="text-gray-800 italic">
                “भोजपुरी बस भाषा ना, अपन गवाही बा — संस्कृति, संस्कार आ समाज के।”
              </p>
              <p className="mt-2 text-sm text-gray-600">
                — डॉ. रवीन्द्र श्रीवास्तव ‘जुगानी’
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
