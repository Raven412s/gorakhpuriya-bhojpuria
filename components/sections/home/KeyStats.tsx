"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { number: 1500, label: "अनुयायी", suffix: "+" },
  { number: 100, label: "इंटरव्यू", suffix: "+" },
  { number: 200, label: "टीम सदस्य", suffix: "+" },
  { number: 4, label: "वर्ष अनुभव", suffix: "+" },
];

export default function KeyStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                    {isInView ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {stat.number}
                        {stat.suffix}
                      </motion.span>
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-lg font-medium text-gray-700">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
