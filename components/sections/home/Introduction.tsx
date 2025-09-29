"use client";
import FadeIn from "@/components/animations/FadeIn";
import { useGsapReveal } from "@/components/animations/useGsapReveal";
import { Card, CardContent } from "@/components/ui/card";

export default function Introduction() {
  useGsapReveal("#introduction");

  return (
    <section id="introduction" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              गोरखपुरिया भोजपुरिया
            </h2>
            <p className="text-xl text-red-600 font-semibold">
              सभ्य समाज में भोजपुरी भाषा के सम्मान देवे के अभियान
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    भोजपुरी माई के भाषा ह । ई अपने आप में विश्व के सबसे समृद्ध भाषा हवे।
                    एकर मिठास आ भाव व्यक्त कईले के अद्भुत क्षमता एके सबसे अलग बनावे ले ।
                    बहुत दुख होला जब भोजपुरी भाषा के लोग कमतर आंकेलें आ बोलले में लजालें । जब
                    देश के अन्य राज्यन में उहां के स्थानीय भाषा आ बोली के प्रयोग सम्मान के
                    साथ होला आ लोग अपने भाषा के अपने सम्मान के साथ जोडलें त हम भोजपुरी
                    भाषी लोग काहे न क सके ले । एही सोच के साथ गोरखपुरियां भोजपुरिया समूह
                    बनावल गइल।
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    एक समूह में पिछले 5 साल में 1500 से अधिक लोग जुड़ल बाड़े । हमहन के ई
                    मानल जाला कि भासा बोलले से ही जीयत रहेले । बौद्धिक आ राजनीतिक
                    विमर्श अलग विषय ह जेह पर बहुत लोग आ संस्था काम करत बाड़ी । पर कुल
                    कईल करावल व्यर्थ हो जाई जब लोग बोलले छोड़ दीहें ।। हमहन के पूरा
                    प्रयास भोजपुरी बोलले , बोलवउले आ गर्व के साथ अपने से जोड़े के बा।
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-300">
                    हमार उद्देश्य
                  </h3>

                  <p className="text-lg leading-relaxed">
                    ए गो अइसन समाज के कल्पना जहाँ भोजपुरी भाषा के उचित सम्मान मिले आ ई
                    शिक्षा, साहित्य, आ सार्वजनिक जीवन के मुख्यधारा में शामिल हो । भविष्य
                    के पीढ़ियन खातिर एह समृद्ध भाषा के सुरक्षित रखल जा सके । भोजपुरी के
                    संवैधानिक मान्यता मिले आ शैक्षणिक संस्थानन में भोजपुरी पाठ्यक्रम भी लागू
                    कइल जा सके। एह भाषा के वैश्विक स्तर पर पहचान मिले आ एकर सम्मान होखे।
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        1700+
                      </div>
                      <div className="text-sm">सक्रिय सदस्य</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        150+
                      </div>
                      <div className="text-sm">सफल कार्यक्रम</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        5+
                      </div>
                      <div className="text-sm">वर्ष अनुभव</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        100+
                      </div>
                      <div className="text-sm">हमार टीम के सदस्य</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        देश भर में <strong>120+</strong>
                      </div>
                      <div className="text-sm">जिलों में उपस्थति</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-300">
                        दुनिया के <strong>18+</strong>
                      </div>
                      <div className="text-sm">देश में उपस्थिति</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-400 rounded-full opacity-20"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
