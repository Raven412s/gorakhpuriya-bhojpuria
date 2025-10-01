/** biome-ignore-all lint/suspicious/noArrayIndexKey: false */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGsapReveal } from "@/components/animations/useGsapReveal";
import { Button } from "@/components/ui/button";

// Type definitions
export type SliderImageObj = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
};

type HeroSliderProps = {
  sliderImages: SliderImageObj[] | string[];
};

export default function HeroSlider({ sliderImages }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGsapReveal("#hero-slider");

  // detect if array is object[] or string[]
  const isObjectArray = (arr: typeof sliderImages): arr is SliderImageObj[] =>
    typeof arr[0] === "object";

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="hero-slider"
      ref={sliderRef}
      className="relative h-[90vh] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={
                isObjectArray(sliderImages)
                  ? sliderImages[currentSlide]?.src
                  : (sliderImages[currentSlide] as string)
              }
              alt={
                isObjectArray(sliderImages)
                  ? sliderImages[currentSlide]?.alt
                  : `Slide ${currentSlide + 1}`
              }
              fill
              className="object-cover"
            />

            {/* Bottom gradient overlay always */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content Overlay only if object array */}
          {isObjectArray(sliderImages) && (
            <div className="absolute inset-0 flex items-end justify-center pb-40">
              <div className="text-center text-white px-4 max-w-4xl">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl"
                >
                  {sliderImages[currentSlide]?.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl md:text-2xl mb-8 drop-shadow-lg"
                >
                  {sliderImages[currentSlide]?.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex gap-4 justify-center"
                >
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition px-8"
                  >
                    संस्कृति जानें
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-black hover:text-black font-semibold transition px-8"
                  >
                    जुड़ें अभियान से
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
