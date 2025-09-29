"use client";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;            // e.g. "डा. संजयन त्रिपाठी"
  role: string;             // subtitle line
  image?: string;           // avatar url
  color: string;            // tailwind gradient e.g. "from-blue-500 to-cyan-500"
  icon: LucideIcon;         // lucide icon component
  short: string;            // bio paragraph
};

export default function BioBlock({ title, role, image, color, icon: Icon, short }: Props) {
  const [more, setMore] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const showFallback = !image || imgErr;

  return (
    <Card className="border-0 shadow-2xl overflow-hidden py-0">
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${color} p-6 text-white relative`}>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-20 h-20 bg-white/10 rounded-full" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30">
            {showFallback ? (
              <div className="w-full h-full bg-white/30 text-white flex items-center justify-center text-2xl font-bold">
                {title.charAt(0)}
              </div>
            ) : (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                onError={() => setImgErr(true)}
                sizes="80px"
              />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-white/90 text-sm mt-1">{role}</p>
          </div>

          <div className="hidden md:flex">
            <Icon className="h-8 w-8 opacity-90" />
          </div>
        </div>
      </div>

      {/* Body */}
      <CardContent className="p-6">
        <p className={`text-gray-700 leading-relaxed ${more ? "" : "line-clamp-4"}`}>
          {short}
        </p>
        <Button
          onClick={() => setMore((v) => !v)}
          className="mt-3 text-sm font-semibold hover:underline"
        >
          {more ? "कम पढ़ें" : "और पढ़ें"}
        </Button>

        {/* Small chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-600">
            मार्गदर्शन
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-600">
            संरक्षण
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-600">
            संगठन-निर्माण
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
