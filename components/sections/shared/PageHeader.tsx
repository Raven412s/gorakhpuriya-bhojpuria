"use client";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative h-64 bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover opacity-20"
            />
          </div>
        </div>
      )}
      <div className="relative z-10 text-center">
        <FadeIn direction="down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
