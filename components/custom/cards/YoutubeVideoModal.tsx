// components/custom/cards/YoutubeVideoModal.tsx
"use client";

import { ExternalLink, Play, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Interview {
  personName?: string; // "Interview with ..."
  url: string; // youtube embed or normal url
  thumbnail?: string; // optional; if missing, will derive from video id
  topic?: string;
  date?: string; // optional string date to show on card
}

interface Props {
  interview: Interview;
}

function parseYouTubeId(url: string): string | null {
  // Supports: youtu.be/VIDEO, youtube.com/watch?v=VIDEO, /embed/VIDEO, shorts
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || null;
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
    }
  } catch {
    // If it's already an ID or invalid URL, try naive fallback
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  }
  return null;
}

function buildEmbedUrl(url: string): { embed: string; id?: string } {
  // If already an embed URL, append params
  try {
    const u = new URL(url);
    const id = parseYouTubeId(url);
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
      const params = new URLSearchParams(u.search);
      params.set("rel", "0");
      params.set("modestbranding", "1");
      params.set("playsinline", "1");
      return { embed: `${u.origin}${u.pathname}?${params.toString()}`, id: id ?? undefined };
    }
  } catch {}
  const id = parseYouTubeId(url);
  if (id) {
    const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
    return { embed: `https://www.youtube.com/embed/${id}?${params.toString()}`, id };
  }
  // as a last resort return url itself
  return { embed: url };
}

export default function YoutubeVideoModal({ interview }: Props) {
  const [open, setOpen] = useState(false);
  const { personName, url, thumbnail, topic, date } = interview;

  const { embed, id } = useMemo(() => buildEmbedUrl(url), [url]);

  const derivedThumb = useMemo(() => {
    if (thumbnail) return thumbnail;
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    return "/placeholder.svg"; // ensure you have a fallback asset
  }, [thumbnail, id]);

  return (
    <Card className="overflow-hidden border shadow-sm pointer-events-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base md:text-lg flex flex-col items-center gap-2">
          <span className="truncate">{personName ? personName : "बतकही"}</span>
          {topic && <span className="text-sm">{topic}</span>}
        </CardTitle>
        {date && <CardDescription>{date}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thumbnail with Play overlay */}
        <div className="relative group rounded-xl overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={derivedThumb}
              alt={`${personName} – ${topic ?? "Interview"}`}
              fill
              className="object-cover"
              priority={false}
            />
          </AspectRatio>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full h-12 w-12 md:h-14 md:w-14 shadow-lg transition-transform group-hover:scale-105"
              aria-label="Play interview"
            >
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 mx-auto" onClick={() => setOpen(true)}>
                <Play className="h-4 w-4" /> View Interview
              </Button>
            </DialogTrigger>

            {/* Fullscreen modal */}
            <DialogContent className="p-0 min-w-screen min-h-screen fixed inset-0 rounded-none border-0 z-[9999] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <DialogTitle className="sr-only">{topic}</DialogTitle>
              {/* Header / Close */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 md:p-4 bg-black/40 backdrop-blur">
                <div className="text-white text-sm md:text-base font-medium truncate px-1">
                  {personName}{topic ? ` · ${topic}` : ""}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/90 hover:text-white text-xs md:text-sm"
                    aria-label="Open on YouTube"
                  >
                    <ExternalLink className="h-4 w-4" /> Open
                  </a>
                  <DialogClose asChild>
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
              </div>

              {/* Video */}
              <div className="w-full h-full bg-black">
                <iframe
                  key={embed}
                  src={`${embed}${embed.includes("?") ? "&" : "?"}autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  title={`${personName} interview`}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
