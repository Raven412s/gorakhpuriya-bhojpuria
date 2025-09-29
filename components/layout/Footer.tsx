"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/groups/263579108407096/",
    label: "Facebook",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@gorakhpuriyabhojpuria",
    label: "YouTube",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/gorakhpuriyabhojpuria",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ग</span>
              </div>
              <span className="font-bold text-xl">गोरखपुरिया भोजपुरिया</span>
            </div>
            <p className="text-gray-300">
              सभ्य समाज में भोजपुरी भाषा के सम्मान देवे के अभियान
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild>
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">जल्दी लिंक</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  हमरे बारे में
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition"
                >
                  आगामी कार्यक्रम
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-white transition"
                >
                  दुकान
                </Link>
              </li>
              <li>
                <Link
                  href="/media-partners"
                  className="text-gray-300 hover:text-white transition"
                >
                  सहयोगी
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">संपर्क</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="size-10 text-red-400" />
                <span className="text-gray-300 text-sm">
                  Shop no 2&3, 3rd Floor Mobile Plaza, Khoa Mandi Gali, Golghar,
                  Gorakhpur 273001
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300 text-sm">+91 9559681277</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300 text-sm">
                  gorakhpuriyabhojpuria@gmail.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">समाचार पत्र</h3>
            <p className="text-gray-300 text-sm mb-4">
              हमरे नवीनतम गतिविधियों के बारे में जानकारी प्राप्त करें
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="आपन ईमेल"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
              />
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                जुड़ें
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm"
        >
          <p>© 2024 गोरखपुरिया भोजपुरिया. सर्वाधिकार सुरक्षित</p>
        </motion.div>
      </div>
    </footer>
  );
}
