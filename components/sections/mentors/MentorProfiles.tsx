/** biome-ignore-all lint/a11y/useValidAriaRole: explanation */
"use client";
import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap, Newspaper } from "lucide-react";
import BioBlock from "./BioBloack";

const tripathiBio = `
डा संजयन त्रिपाठी नवल्स एकेडमी समूह के अध्यक्ष हईं। नवल एकेडमी उत्तरप्रदेश में दर्जनों विद्यालय आ उच्च शिक्षा संस्थान के संचालन करे ला। एक शिक्षाविद आ शिक्षक बने के साथ राजनीति में सक्रिय—भाजपा के वरिष्ठ नेता। सामाजिक-सांस्कृतिक क्षेत्र में सक्रिय, भोजपुरी भाषा के संरक्षण-संवर्धन खातिर सदैव साथ खड़ा।
`.trim();

const harshBio = `
प्रो. हर्ष सिन्हा दीनदयाल उपाध्याय गोरखपुर विश्वविद्यालय में रक्षा अध्ययन विभाग में प्रोफ़ेसर। विभागाध्यक्ष, क्रीड़ा परिषद अध्यक्ष, मानद ग्रंथालयी सहित अनेक प्रशासनिक पद। नई शिक्षा नीति लागू करे खातिर राज्य सरकार के शीर्ष समिति सदस्य; उच्च शिक्षा विभाग द्वारा G-20 एंबेसडर। वर्तमान में निदेशक (प्रवेश)। लगभग 25 साल इंडिया टुडे, बीबीसी, संडे मेल खातिर रिपोर्टिंग; राष्ट्रीय सहारा में स्तंभ लेखन; ‘आजकल’ का संपादन। उनके संयोजन में ‘आजकल’ में 6+ साल तक हर हफ्ता जुगानी भाई के भोजपुरी स्तंभ ‘बेंगुची चलल ठोंकावे नाल’ छपत रहल। राष्ट्रीय पत्रकारिता पुरस्कार, रक्षा मंत्रालय से सर्वश्रेष्ठ लेखन पुरस्कार। गोरखपुर लिटरेरी फेस्टिवल के अध्यक्ष; गोरखपुरिया भोजपुरिया के संरक्षक/मार्गदर्शक।
`.trim();



export default function MentorProfiles() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">हमार संरक्षक</h2>
          <p className="text-lg text-gray-600 mt-2">
            शिक्षा, संस्कृति, मीडिया—कई क्षेत्र में अनुभवी मार्गदर्शक
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-5" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <BioBlock
              title="डा. संजयन त्रिपाठी"
              role="नवल्स एकेडमी समूह के अध्यक्ष • शिक्षाविद/समाजसेवी"
              image="/people/sanjyan-tripathi.jpg"
              color="from-blue-500 to-cyan-500"
              icon={GraduationCap}
              short={tripathiBio}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BioBlock
              title="प्रो. हर्ष सिन्हा"
              role="प्रोफेसर, डीडीयूजीयू • पत्रकार/आयोजनकर्ता"
              image="/people/harsh-sinha.png"
              color="from-green-500 to-emerald-500"
              icon={Newspaper}
              short={harshBio}
            />
          </motion.div>
        </div>

        {/* small badges row */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs font-semibold">
            <BadgeCheck className="h-4 w-4" /> राष्ट्रीय/राज्य स्तरीय सम्मान
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
            <BadgeCheck className="h-4 w-4" /> सांस्कृतिक संरक्षण
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <BadgeCheck className="h-4 w-4" /> युवा प्रेरणा
          </span>
        </div>
      </div>
    </section>
  );
}
