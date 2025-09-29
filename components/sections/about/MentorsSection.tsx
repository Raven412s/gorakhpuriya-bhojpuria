"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ---------------------------------------------
// DATA
// ---------------------------------------------
const juganiGallery = [
  // अपनी असली images यहाँ जोड़ें (स्थानीय या remote URLs)
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759130621/uploads/opz77l27mu1lmevfgp2s.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759135332/DSC_0371_kyehnm.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759135452/DSC_0420_yysh65.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.25_9912ae12_b80cjp.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.25_dc59cd0f_oks05i.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.26_48335274_z3nncz.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.25_dc59cd0f_oks05i.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759136190/WhatsApp_Image_2025-09-29_at_14.25.25_9912ae12_b80cjp.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759140589/uploads/o0e1jd4lzfr489tritch.jpg",
  "https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759140574/uploads/rhcgrpsogjrow142v7wb.jpg",
];

const featuredMentors = [
  {
    name: "डा. संजयन त्रिपाठी",
    role: "अभिभावक",
    achievement: "नवल्स एकेडमी समूह के अध्यक्ष",
    image: "/people/sanjyan-tripathi.jpg",
  },
  {
    name: "प्रो. हर्ष सिन्हा",
    role: "अभिभावक",
    achievement: "गोरखपुर विश्वविद्यालय में प्रोफेसर",
    image: "/people/harsh-sinha.png",
  },
];

// ---------------------------------------------
// FEATURED (MEMORIAL) SECTION
// ---------------------------------------------
function JuganiMemorial({ isInView }: { isInView: boolean }) {
  const [viewer, setViewer] = useState<{ open: boolean; src: string | null }>({
    open: false,
    src: null,
  });

  useEffect(() => {
    if (!viewer.open) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setViewer({ open: false, src: null });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer.open]);

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          हमार प्रेरणास्रोत
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          स्वर्गीय डा. रवीन्द्र श्रीवास्तव 'जुगानी'
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-5"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Hero banner */}
        <div className="relative h-[380px] md:h-[460px]">
          <Image
            src="https://res.cloudinary.com/dfhxmmjyq/image/upload/v1759135041/uploads/tunj99483ykud4lus5ux.jpg" // एक बेहतर hero फोटो दें (या placeholder)
            alt="स्वर्गीय डा. रवीन्द्र श्रीवास्तव 'जुगानी'"
            fill
            className="object-cover  object-center"
            priority
          />

          {/* Bottom gradient just for text readability */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Ribbon badge - स्वर्गीय */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-red-600 text-white px-4 py-1 text-sm font-semibold shadow-md">
              स्वर्गीय
            </span>
          </div>

          {/* Text overlay - Name */}
          <div className="absolute inset-0 flex items-end">
            <div className="px-6 md:px-10 pb-8 text-white max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow">
                रवीन्द्र श्रीवास्तव “जुगानी भाई”
              </h2>
              <p className="mt-2 text-sm md:text-base opacity-90">
                प्रेरणास्रोत • आकाशवाणी गोरखपुर (सेवा निवृत्त कार्यक्रम अधिकारी) • 500+
                लघु नाटिकाओं के लेखक/निर्देशक
              </p>
            </div>
          </div>
        </div>

        {/* BIO — आपके दिए हुए टेक्स्ट से */}
        <div className="px-4 md:px-6 pt-6">
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
            <div className="prose prose-sm md:prose-base max-w-none text-gray-800">
              <p className="leading-7">
                स्व. रवीन्द्र श्रीवास्तव “जुगानी भाई” आकाशवाणी गोरखपुर के सेवा निवृत्त
                कार्यक्रम अधिकारी रहलें। जुगानी भाई नाम से मशहूर डा. रवीन्द्र नाथ
                श्रीवास्तव पर दी. द. उपाध्याय गोरखपुर विश्वविद्यालय के हिन्दी एवं आधुनिक
                भारतीय भाषा तथा पत्रकारिता विभाग में शोध प्रबंध प्रस्तुत हो चुकल बा। आप
                आकाशवाणी गोरखपुर खातिर 500 से अधिक लघु नाटिका के लेखन-निर्देशन भी कइले
                रहलीं।
              </p>

              <p className="mt-3 leading-7">
                जुगानी भाई के उ. प्र. हिन्दी संस्थान से लोकभूषण सम्मान, वर्ष 2013 में
                विद्याश्री न्यास के आचार्य विद्यानिवास मिश्र स्मृति सम्मान आ विद्यानिवास
                मिश्र लोककला सम्मान प्राप्त भईल। उनकर रचना ‘मोथा अउर माटी’, ‘गीत
                गांव-गांव के’, ‘नोकियात दूब’ आ ‘अखबारी कविता’ जइसन कृतियन से भोजपुरी की
                थाती बढ़उले बाटें।
              </p>

              <p className="mt-3 leading-7">
                श्री रवीन्द्र श्रीवास्तव के उ. प्र. हिन्दी संस्थान वर्ष 2015 के भिखारी ठाकुर
                सम्मान दिहले रहल। उनके वर्ष 2001 में संस्कार भारती, 2002 में लोकभूषण, 2004
                में भोजपुरी रत्न, 2009 में सरयू रत्न, 2011 में पं. श्याम नारायण पांडेय सम्मान आ
                2012 में राहुल सांकृत्यायन पुरस्कार मिल चुकल बा।
              </p>

              <p className="mt-3 leading-7 font-medium text-gray-900">
                आप दिनांक 14 फ़रवरी 2025 के एह नश्वर शरीर के छोड़ के अनंत यात्रा पर
                प्रस्थान क गईलीं।
              </p>
            </div>
          </div>
        </div>

        {/* Honors / Timeline */}
        <div className="px-4 md:px-6 pt-4">
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              सम्मान एवं उपलब्धियाँ (चयनित)
            </h4>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-800 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                उ.प्र. हिन्दी संस्थान — लोकभूषण सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2013 — विद्याश्री न्यास: आचार्य विद्यानिवास मिश्र स्मृति सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                विद्यानिवास मिश्र लोककला सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2015 — उ.प्र. हिन्दी संस्थान: भिखारी ठाकुर सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2001 — संस्कार भारती सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2002 — लोकभूषण
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2004 — भोजपुरी रत्न
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2009 — सरयू रत्न
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2011 — पं. श्याम नारायण पांडेय सम्मान
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                2012 — राहुल सांकृत्यायन पुरस्कार
              </li>
            </ul>

            <div className="mt-5 text-sm text-gray-700">
              <span className="font-medium">कृतियाँ:</span> ‘मोथा अउर माटी’, ‘गीत
              गांव-गांव के’, ‘नोकियात दूब’, ‘अखबारी कविता’
            </div>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="px-4 md:px-6 py-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            स्मृतियाँ — कार्यक्रमन के झलक
          </h3>
          <div className="-mx-2 flex gap-3 overflow-x-auto pb-2">
            {juganiGallery.map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative shrink-0 w-56 h-40 rounded-xl overflow-hidden border bg-gray-100 group"
              >
                <Image
                  src={src}
                  alt={`Jugani memory ${idx + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 opacity-0 transition duration-200 group-hover:opacity-100 group-hover:bg-black/40" />

                {/* View button (appears on hover) */}
                <Button
                  onClick={() => setViewer({ open: true, src })}
                  className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow
                   opacity-0 translate-y-2 transition duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                  aria-label="View Image"
                >
                  View Image
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Quote card */}
          <div className="mt-5">
            <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-50 to-white">
              <CardContent className="p-5">
                <p className="text-gray-800 italic leading-relaxed">
                  “भोजपुरी बस भाषा ना, अपन गवाही बा — संस्कृति, संस्कार आ समाज के।”
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  — डा. रवीन्द्र श्रीवास्तव &apos;जुगानी&apos;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fullscreen Image Modal */}
        {viewer.open && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setViewer({ open: false, src: null })}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                setViewer({ open: false, src: null });
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setViewer({ open: false, src: null });
              }}
              className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow"
              aria-label="Close"
            >
              Close
            </Button>

            {/* Image container (click stop to avoid closing) */}
            <button
              type="button"
              className="relative w-full h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                  setViewer({ open: false, src: null });
                }
              }}
              tabIndex={0}
              aria-label="Image Modal Content"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              {viewer.src && (
                <Image
                  src={viewer.src}
                  alt="Full view"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------
// OTHERS GRID
// ---------------------------------------------
function OtherMentors({ isInView }: { isInView: boolean }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          हमार संरक्षक
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          अनुभवी अभिभावकन के मार्गदर्शन में आगे बढ़त हमार संगठन
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-5"></div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {featuredMentors.map((mentor, index) => (
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
              <CardContent className="p-6">
                <div className="relative inline-block mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <div className="text-red-600 font-medium text-sm mb-2">
                  {mentor.role}
                </div>
                <p className="text-gray-600 text-xs">{mentor.achievement}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <Card className="border-0 shadow-lg bg-white inline-block">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-red-600" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  सभी मार्गदर्शकों के बारे में जानें
                </h4>
                <p className="text-sm text-gray-600">
                  विस्तृत जानकारी और उनके योगदान के बारे में
                </p>
              </div>
              <Link
                href="/mentors"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                <span>जानें</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

// ---------------------------------------------
// MAIN EXPORT
// ---------------------------------------------
export default function MentorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Memorial for Late Jugani */}
        <JuganiMemorial isInView={isInView} />

        {/* Other mentors */}
        <OtherMentors isInView={isInView} />
      </div>
    </section>
  );
}
