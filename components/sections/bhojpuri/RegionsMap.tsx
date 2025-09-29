"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation, Users } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type RegionId = "bihar" | "up" | "jharkhand" | "nepal";

type Region = {
  id: RegionId;
  name: string;
  img: string;               // shape image path
  // desktop positions (container is relative)
  top: number;               // % (0-100)
  left: number;              // %
  width: number;             // % of container width
  // optional mobile overrides
  mTop?: number;
  mLeft?: number;
  mWidth?: number;
  color: string;             // tailwind gradient
  percentage: string;
  districts: string[];
};

const regions: Region[] = [
  {
    id: "bihar",
    name: "बिहार",
    img: "/maps/regions/bihar.png",
    top: 32, left: 18, width: 22,
    mTop: 36, mLeft: 10, mWidth: 34,
    color: "from-red-500 to-orange-500",
    percentage: "35%",
    districts: [
      "बक्सर जिला", "सारण जिला", "सिवान", "गोपालगंज जिला", "पूर्वी चम्पारण जिला",
      "पश्चिम चम्पारण जिला", "वैशाली जिला", "भोजपुर जिला", "रोहतास जिला", "भभुआ जिला",
    ],
  },
  {
    id: "up",
    name: "उत्तर प्रदेश",
    img: "/maps/regions/up.png",
    top: 28, left: 40, width: 30,
    mTop: 30, mLeft: 43, mWidth: 40,
    color: "from-blue-500 to-cyan-500",
    percentage: "40%",
    districts: [
      "बलिया जिला", "वाराणसी जिला", "चन्दौली जिला", "गोरखपुर जिला", "महाराजगंज जिला",
      "गाजीपुर जिला", "मिर्जापुर जिला", "मऊ जिला", "इलाहाबाद जिला", "जौनपुर जिला",
      "प्रतापगढ़ जिला", "सुल्तानपुर जिला", "फैजाबाद जिला", "बस्ती जिला", "गोंडा जिला",
      "बहराईच जिला", "सिद्धार्थ नगर", "आजमगढ़ जिला",
    ],
  },
  {
    id: "jharkhand",
    name: "झारखण्ड",
    img: "/maps/regions/jharkhand.png",
    top: 56, left: 34, width: 16,
    mTop: 58, mLeft: 32, mWidth: 26,
    color: "from-green-500 to-emerald-500",
    percentage: "15%",
    districts: ["पलामु जिला", "गढ़वा जिला"],
  },
  {
    id: "nepal",
    name: "नेपाल",
    img: "/maps/regions/nepal.png",
    top: 12, left: 50, width: 20,
    mTop: 8, mLeft: 52, mWidth: 32,
    color: "from-purple-500 to-pink-500",
    percentage: "10%",
    districts: [
      "रौतहट जिला", "बारा जिला", "बीरगंज", "चितवन जिला", "नवलपरासी जिला",
      "रुपनदेही जिला", "कपिलवस्तु जिला", "पर्सा जिला",
    ],
  },
];

export default function RegionsMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  // helper to compute inline style (responsive %)
  const shapeStyle = (r: Region) => {
    // use CSS vars so we can swap via media queries if needed
    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

    const top = (isMobile ? r.mTop ?? r.top : r.top) + "%";
    const left = (isMobile ? r.mLeft ?? r.left : r.left) + "%";
    const width = (isMobile ? r.mWidth ?? r.width : r.width) + "%";

    return { top, left, width } as React.CSSProperties;
  };

  const legend = useMemo(
    () =>
      regions.map((r) => ({
        id: r.id,
        name: r.name,
        color: r.color,
      })),
    []
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            भोजपुरी भाषी क्षेत्र
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भारत और नेपाल में फैलल भोजपुरी भाषा के मुख्य क्षेत्र
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map with image shapes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Background "map board" */}
                <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded">
                  {/* Optional faint country outline (if you have): 
                      <Image src="/maps/india-nepal-faint.png" fill alt="" className="object-contain opacity-20" />
                  */}

                  {regions.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setSelectedRegion(r)}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 drop-shadow
                                  transition-transform duration-300
                                  ${selectedRegion.id === r.id ? "scale-[1.04]" : "hover:scale-105"}`}
                      style={shapeStyle(r)}
                      aria-label={r.name}
                    >
                      <div className="relative" style={{ width: "100%" }}>
                        {/* keep ratio by using width only; height auto via intrinsic image */}
                        <Image
                          src={r.img}
                          alt={r.name}
                          width={800}
                          height={600}
                          className={`h-auto w-full object-contain
                                      ${selectedRegion.id === r.id
                              ? "drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
                              : "drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"}`}
                        />
                        {/* glow ring */}
                        <div
                          className={`pointer-events-none absolute inset-0 rounded
                                      ${selectedRegion.id === r.id ? "ring-4 ring-white/80" : "ring-0"}`}
                        />
                        {/* Tooltip tag */}
                        <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-white shadow
                                        bg-gradient-to-r ${r.color} opacity-90`}
                          >
                            {r.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <Navigation className="h-4 w-4 mr-2" />
                      भोजपुरी क्षेत्र
                    </h4>
                    <div className="space-y-2">
                      {legend.map((l) => (
                        <div key={l.id} className="flex items-center gap-2">
                          <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${l.color}`} />
                          <span className="text-sm text-gray-700">{l.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Details panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRegion.name}</h3>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${selectedRegion.color} text-white text-sm font-bold`}>
                    {selectedRegion.percentage} भोजपुरी वक्ता
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 text-red-600 mr-2" />
                    जिला सूची
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRegion.districts.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className={`inline-block w-2 h-2 mr-2 rounded-full bg-gradient-to-r ${selectedRegion.color}`} />
                        {d}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    सांस्कृतिक महत्व
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedRegion.name} में भोजपुरी भाषा के समृद्ध सांस्कृतिक परंपरा बा, जेहमे लोक गीत, नृत्य, आ साहित्य शामिल बा।
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Region chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {regions.map((r) => (
              <Button
                key={r.id}
                onClick={() => setSelectedRegion(r)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedRegion.id === r.id
                    ? `bg-gradient-to-r ${r.color} text-white shadow-lg`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {r.name}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
