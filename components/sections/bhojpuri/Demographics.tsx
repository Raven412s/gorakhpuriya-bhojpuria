"use client";
import { motion, useInView } from "framer-motion";
import { Award, Globe, MapPin, Users } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: "7 करोड़+",
    label: "विश्व भर में वक्ता",
    description: "वैश्विक स्तर पर भोजपुरी बोले वाला लोग",
  },
  {
    icon: Award,
    value: "10वीं",
    label: "विश्व रैंकिंग",
    description: "सबसे ज्यादा बोलल जाय वाली भाषा",
  },
  {
    icon: Globe,
    value: "15+",
    label: "देशों में उपस्थिति",
    description: "विश्व भर में फैलल भोजपुरी समुदाय",
  },
  {
    icon: MapPin,
    value: "4",
    label: "राज्य/क्षेत्र",
    description: "भारत में मुख्य बोलल जाय वाला इलाका",
  },
];

const countries = [
  {
    name: "मॉरीशस",
    status: "राष्ट्रीय भाषा",
    color: "from-green-500 to-emerald-500",
  },
  { name: "नेपाल", status: "संवैधानिक भाषा", color: "from-blue-500 to-cyan-500" },
  {
    name: "फिजी",
    status: "संवैधानिक भाषा",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "सूरीनाम",
    status: "लोकप्रिय भाषा",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "त्रिनिदाद",
    status: "लोकप्रिय भाषा",
    color: "from-yellow-500 to-amber-500",
  },
  {
    name: "गयाना",
    status: "लोकप्रिय भाषा",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Demographics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            भोजपुरी भाषा के वैश्विक पहुंच
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            विश्व के कोने-कोने में फैलल भोजपुरी भाषा के समुदाय
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Speakers Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-red-600 mr-3" />
                  भोजपुरी वक्ता के आंकड़े
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  भोजपुरी ए गो इंडो-आर्यन भाषा ह जेके मुख्य रूप से उत्तर-पूर्वी भारत आ नेपाल
                  के कुछ हिस्सन में बोलल जाला । 31.4 मिलियन देशी बोले वालन के साथ एकरे
                  बोले वालन के संख्या भारत में सबसे अधिक बा. 2011 की जनगणना के हिसाब से
                  हिन्दुस्तान के 5 करोड़ आ विश्व के कुल 7 करोड़ आबादी भोजपुरी बोले ले. संख्या
                  के हिसाब से भोजपुरी विश्व के 10वीं सबसे ज़्यादा बोलल जाये वाली भाषा ह.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800 font-semibold">
                    भोजपुरी भाषा के वक्ता के संख्या संस्कृत, पाली, और कई यूरोपीय भाषा से
                    अधिक बा।
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Official Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="h-6 w-6 text-green-600 mr-3" />
                  आधिकारिक दर्जा
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  भोजपुरी भाषा के मॉरीशस में राष्ट्रीय भाषा का दर्जा प्राप्त बा । साथ हीं,
                  नेपाल में भी भोजपुरी संवैधानिक भाषा है. फिजी में भोजपुरिए के ए गो बोली
                  फिजी बात (अवधि और भोजपुरी दोनों से मेल खाती है) ऊहां के संवैधानिक भाषा
                  ह. इन देशन के अलावा भोजपुरी सूरीनाम, त्रिनिदाद, गयाना, गुयाना, साउथ
                  अफ्रीका, नीदरलैंड्स, जमैका आदि देशन में भी बोलल आ समझल जाले.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {countries.map((country, index) => (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`bg-gradient-to-r ${country.color} text-white p-3 rounded-lg text-center`}
                    >
                      <div className="font-bold">{country.name}</div>
                      <div className="text-sm opacity-90">{country.status}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
