"use client";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ScrollMarquee } from "@/components/animations/scroll-marquee";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ====== Marquee (from your reference) ======

// ↑ इस फाइल में आपके दिए marquee code को चिपका दें (exported as ScrollMarquee)

type Mode = "carousel" | "marquee";

const testimonials = [
  {
    id: 1,
    quote: "भोजपुरी बोलले में संकोच नाही करे के चाही",
    author: "महापौर डा मंगलेश श्रीवास्तव",
    role: "गोरखपुर महापौर",
    image: "/images/testimonials/mayor.jpg",
  },
  {
    id: 2,
    quote:
      "नाही बोलले से भोजपुरी खतम हो जाई । जईसे उपयोग नाही कईले से मनुष्य जाति के पूंछ खतम हो गइल",
    author: "प्रो हर्ष सिन्हा",
    role: "प्रोफेसर, गोरखपुर विश्वविद्यालय",
    image: "/images/testimonials/professor.jpg",
  },
  {
    id: 3,
    quote: "भोजपुरी माई के भासा ह । ऐकर संरक्षण आ संवर्धन बहुत जरूरी बा",
    author: "श्री रविन्द्र श्रीवास्तव उर्फ जुगनी भाई",
    role: "आकाशवाणी कार्यक्रम अधिकारी",
    image: "/images/testimonials/jugaani.jpg",
  },
  {
    id: 4,
    quote:
      "भोजपुरी अंग्रेजी आ हिंदी से अधिक समृद्ध भासा ह । ऐकरे उपयोग से ही एके समृद्ध कईल जा सके ला",
    author: "डा संजयन त्रिपाठी",
    role: "शिक्षाविद एवं समाजसेवी",
    image: "/images/testimonials/tripathi.jpg",
  },
  {
    id: 5,
    quote:
      "भोजपुरी अंग्रेजी आ हिंदी से अधिक समृद्ध भासा ह । ऐकरे उपयोग से ही एके समृद्ध कईल जा सके ला",
    author: "डा संजयन त्रिपाठी",
    role: "शिक्षाविद एवं समाजसेवी",
    image: "/images/testimonials/tripathi.jpg",
  },
  // 5+ add here ...
];

// एक कार्ड UI (reusable)
function TestimonialCard({
  quote,
  author,
  role,
  image,
}: {
  quote: string;
  author: string;
  role: string;
  image?: string;
}) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !image || imageError;

  return (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
      <CardContent className="p-6 h-full flex flex-col">
        <Quote className="h-8 w-8 text-red-600 mb-4 opacity-50" />
        <blockquote className="flex-1">
          <p className="text-lg text-gray-700 italic leading-relaxed mb-6">
            "{quote}"
          </p>
        </blockquote>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
          {showFallback ? (
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {author.charAt(0)}
            </div>
          ) : (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={image}
                alt={author}
                fill
                className="object-cover"
                onError={() => setImageError(true)} // fallback trigger
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


/* ========================
   CAROUSEL VERSION
======================== */
function TestimonialsCarousel({
  items,
  autoplay = true,
  autoplayDuration = 3500,
  showControls = true,
}: {
  items: typeof testimonials;
  autoplay?: boolean;
  autoplayDuration?: number;
  showControls?: boolean;
}) {
  const [_api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [_isHovered, setIsHovered] = useState(false);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDuration,
      stopOnInteraction: false,
    })
  );

  const visibleSlides = 4;

  return (
    <section
      className="w-full"
      onMouseEnter={() => {
        setIsHovered(true);
        autoplayPlugin.current.stop();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        autoplayPlugin.current.play();
      }}
      aria-label="Testimonials carousel"
    >
      <Carousel
        setApi={setApi}
        plugins={autoplay ? [autoplayPlugin.current] : []}
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {items.map((t, index) => (
            <CarouselItem
              key={t.id}
              className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="p-2 h-full"
              >
                <TestimonialCard
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                  image={t.image}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && items.length > visibleSlides && (
          <>
            <CarouselPrevious className="-left-3 h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background border" />
            <CarouselNext className="-right-3 h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background border" />
          </>
        )}
      </Carousel>
    </section>
  );
}

/* ========================
   MARQUEE VERSION
======================== */
function TestimonialsMarquee({
  items,
  baseSpeed = 120, // px/sec
}: {
  items: typeof testimonials;
  baseSpeed?: number;
}) {
  // Marquee को seamless दिखाने के लिए items डुप्लीकेट कर लेते हैं
  const loopItems = useMemo(() => [...items, ...items], [items]);

  return (
    <ScrollMarquee baseSpeed={baseSpeed} className="py-2 ">
      {loopItems.map((t) => (
        <div key={`${t.id}-${Math.random()}`} className="px-3 inline-block w-[320px]">
          <TestimonialCard
            quote={t.quote}
            author={t.author}
            role={t.role}
            image={t.image}
          />
        </div>
      ))}
    </ScrollMarquee>
  );
}

/* ========================
   MAIN EXPORT
======================== */
export default function Testimonials({
  mode = "carousel", // "carousel" | "marquee"
}: {
  mode?: Mode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const useCarouselOrGrid = testimonials.length > 4;

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            लोगन के विचार
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            समाज के अलग-अलग क्षेत्रन से जुड़ल लोगन के विचार
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
        </motion.div>

        {/* Content */}
        {useCarouselOrGrid ? (
          mode === "marquee" ? (
            <TestimonialsMarquee items={testimonials} />
          ) : (
            <TestimonialsCarousel items={testimonials} />
          )
        ) : (
          // 4 या कम तो पुराना grid
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={itemVariants}>
                <TestimonialCard
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                  image={t.image}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Bar (ज्यों का त्यों) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1700+</div>
              <div className="text-sm opacity-90">समर्थक</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">इंटरव्यू</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">टीम सदस्य</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">वर्ष अनुभव</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
