"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MentorsCTA() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-500  overflow-hidden">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  इन मार्गदर्शकों के अनुभव से सीखें
                </h3>
                <p className="text-lg/7 opacity-95 text-white">
                  हमार अभिभावकन के ज्ञान आ अनुभव से लाभ उठाईं—भोजपुरी भाषा के संरक्षण में
                  आपनो योगदान दीं
                </p>
                <div className="flex gap-4 justify-center mt-6">
                  <Button>
                    संपर्क करें
                  </Button>
                  <Button variant="outline">
                    कार्यक्रम देखें
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
