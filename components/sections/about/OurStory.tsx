"use client";
import { motion, useInView } from "framer-motion";
import { Clock, Target, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

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
            हमार कहानी
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            भोजपुरी भाषा के सम्मान देवे खातिर हमार संघर्ष और सफलता की यात्रा
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* What is Gorakhpuriya Bhojpuria */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    गोरखपुरिया भोजपुरिया
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  पूर्वी उत्तर प्रदेश आ बिहार के भोजपुरी भाषा के गढ़ मानल जाला बाकिर आज ई
                  विडंबना बा कि हमन आपन मातृभाषा से दूर हो रहल बाटी. लजाये अउर बोले के
                  सही तरीका ना जाने के चलते हमन के हिंदी के अउर महत्व देवे लागल बाटीं।
                  गोरखपुरिया भोजपुरिया एक गो अइसन समूह ह जवन सभ्य समाज में भोजपुरी भाषा
                  के सम्मान देवे खातिर पिछला 5 साल से लगातार प्रयास कर रहल बा आ लोगन के
                  भोजपुरी बोलले बतीयवले खातिर प्रेरित करत बा।
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/about/group-photo.jpg"
                alt="Gorakhpuriya Bhojpuria Group"
                fill
                className="object-cover shadow-2xl rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-400 rounded-full opacity-20"></div>
          </motion.div>

          {/* Trust Building Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-2"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    गोरखपुरिया भोजपुरिया ट्रस्ट
                  </h3>
                </div>

                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <p className="text-justify">
                    गोरखपुरिया भोजपुरिया ट्रस्ट समाज में भोजपुरी भाषा के सम्मान,
                    संरक्षण आ संवर्धन खातिर प्रतिबद्ध बा। नीचे दिहल विवरण से
                    ट्रस्ट के विधिक आ वित्तीय पहचान स्पष्ट होखेला जवन हमार
                    विश्वासनीयता आ पारदर्शिता के प्रमाण ह।
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">पंजीकरण विवरण</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>ट्रस्ट रजिस्ट्रेशन नंबर: <span className="font-medium">4/323/391-412/219/2024</span></li>
                        <li>आयकर धारा 12A: <span className="font-medium">AAETG8104HE2024101</span></li>
                        <li>80G रजिस्ट्रेशन: <span className="font-medium">AAETG8104HE2024101</span></li>
                        <li>नीति आयोग आईडी: <span className="font-medium">UP/2024/0451042</span></li>
                        <li>PAN: <span className="font-medium">AAETG8104H</span></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">बैंक अकाउंट विवरण</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Account Name: <span className="font-medium">GORAKHPURIYA BHOJPURIA</span></li>
                        <li>Account No: <span className="font-medium">113188700000182</span></li>
                        <li>IFSC: <span className="font-medium">YESB0001131</span></li>
                        <li>Bank: YES BANK</li>
                        <li>Account Type: <span className="font-medium">Current Account - Trust</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* How it started */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-gray-50 to-white">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  गोरखपुरिया भोजपुरिया के यात्रा
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                एह समूह के स्थापना <strong>श्री विकास श्रीवास्तव</strong> और{" "}
                <strong>श्री नरेन्दर मिसिर</strong> के प्रयास से भईल रहल। ई कॉर्पोरेट
                जगत, व्यवसायी डॉक्टर , वकील , आईटी विशेषज्ञ, शिक्षा जगत से जुडल लोग आ
                अन्य सभी क्षेत्रन के लोगन के बीच भोजपुरी भाषा के बारे में जागरूकता फई लवले के
                कार करत बा । एकर लक्ष्य बा कि शिक्षित समाज आपन मातृभाषा पर गर्व करे आ
                एके अपने दैनिक जीवन में उपयोग करे। ई बात सबके समझे के पड़ी की भाषा के उपयोग
                ही भाषा के जियत रखले के पहिला शर्त बा
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">2020</div>
                  <div className="text-sm text-gray-600">स्थापना वर्ष</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">संस्थापक</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">1700+</div>
                  <div className="text-sm text-gray-600">प्रारंभिक सदस्य</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  गोरखपुरिया भोजपुरिया का मिशन का ह?
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                गोरखपुरिया भोजपुरिया याद दियवले के कार करत बा कि जड़ से जुड़ल रहल केतना
                जरूरी बा. भोजपुरी एक गो समृद्ध भाषा ह जवना के आपन साहित्यिक परम्परा,
                लोककथा आ लोकगीत बा. हमन के एह धरोहर के बचावे अउर आगे बढ़ावे के कोशिश करे
                के चाहीं। ई कर सबके सहयोग से ही संभव बा। भोजपुरी भाषा के सम्मान दिहले से
                ही आवे वाली पीढियन खातिर ई भाषा सुरक्षित रही। भोजपुरी भाषा के संरक्षण आ
                संवर्धन खातिर भोजपुरी शब्दकोश के निर्माण, लोक गीत आ लोक साहित्य के संकलन।
                एह भाषा के अध्ययन आ रिसर्च मे जुटल नया पीढी के समर्थन आ सहयोग आ सबके साथ
                मिल के ए गो भोजपुरी अध्ययन केंद्र के स्थापना के प्रयास कइल जाय। आज के इंटरनेट
                आ सोशल मीडिया के दौर मे ए गो भोजपुरी मीडिया , साहित्य आ मनोरंजन
                प्लेटफॉर्म के निर्माण के भी प्रयास रही।।
              </p>

              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-red-600">
                <p className="text-lg font-semibold text-gray-800">
                  &quot;हमार लक्ष्य बा कि भोजपुरी भाषा घरे के बाहर निकल के समाज के मुख्य
                  धारा में शामिल होवे&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
