/** biome-ignore-all lint/a11y/useMediaCaption: explanation */
"use client";

import {
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Copy,
    Goal,
    Images,
    Lightbulb,
    MapPin,
    Music2,
    Users
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSlider from "../home/HeroSlider";

// --------------------
// Types
// --------------------

export interface EventPerformance {
    title: string;
    performer?: string;
    durationMin?: number;
    description?: string[]; // changed
    mediaUrls?: string[]; // changed
}

export interface EventSectionData {
    id: number | string;
    title: string;
    date: string;
    venue: string;
    city?: string;
    type?: "jutan" | "baithaki" | string;
    motive?: string;
    description?: string[]; // changed
    images: string[]; // string[]
    attendees?: string[];
    totalPhotos?: number;
    performances?: EventPerformance[];
    learnings?: string[];
}

// --------------------
// Helpers
// --------------------

const copy = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    } catch {
        toast.error("Copy failed");
    }
};

const isImageUrl = (url: string) =>
    /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url);

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);

// --------------------
// Main Component
// --------------------

export default function EventSection({ event }: { event: EventSectionData }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const go = (dir: -1 | 1) => {
        if (!event.images?.length) return;
        setIndex((p) => {
            const n = p + dir;
            if (n < 0) return event.images.length - 1;
            if (n >= event.images.length) return 0;
            return n;
        });
    };

    const copyBlock = useMemo(() => {
        const parts = [
            `कार्यक्रम: ${event.title}`,
            event.date ? `तारीख: ${event.date}` : "",
            event.venue
                ? `स्थान: ${event.venue}${event.city ? ", " + event.city : ""}`
                : "",
            event.motive ? `उद्देश्य: ${event.motive}` : "",
            event.description ? `विवरण: ${event.description.join(" ")}` : "",
        ].filter(Boolean);
        return parts.join("\n");
    }, [event]);

    return (
        <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
                    <div className="flex items-center gap-2">
                        {event.type && (
                            <Badge variant="secondary">
                                {event.type === "jutan"
                                    ? "जुटान"
                                    : event.type === "baithaki"
                                        ? "बैठकी"
                                        : event.type}
                            </Badge>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => copy(copyBlock)}
                        >
                            <Copy className="h-4 w-4" /> Copy Data
                        </Button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {event.date && (
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {event.date}
                        </span>
                    )}
                    {event.venue && (
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.venue}
                            {event.city ? `, ${event.city}` : ""}
                        </span>
                    )}
                    {event.totalPhotos && (
                        <span className="inline-flex items-center gap-1">
                            <Images className="h-4 w-4" />
                            {event.totalPhotos} Photos
                        </span>
                    )}
                    {event.attendees?.length ? (
                        <span className="inline-flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees.length} उपस्थित
                        </span>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <HeroSlider sliderImages={event.images} />

                {event.motive && (
                    <div className="flex items-start gap-3">
                        <Goal className="h-5 w-5 mt-1" />
                        <p className="text-sm md:text-base leading-relaxed">
                            {event.motive}
                        </p>
                    </div>
                )}

                {event.description && (
                    <div className="prose prose-sm md:prose-base max-w-none">
                        {event.description.map((d, _i) => (
                            <p key={d}>{d}</p>
                        ))}
                    </div>
                )}

                <Separator />

                {/* Tabs */}
                <Tabs
                    defaultValue={
                        event.images?.length
                            ? "gallery"
                            : event.performances?.length
                                ? "performances"
                                : event.learnings?.length
                                    ? "learnings"
                                    : "gallery"
                    }
                >
                    <TabsList className="flex flex-wrap">
                        {event.images?.length ? (
                            <TabsTrigger value="gallery">Gallery</TabsTrigger>
                        ) : null}
                        {event.performances?.length ? (
                            <TabsTrigger value="performances" className="gap-1">
                                <Music2 className="h-4 w-4" />
                                Performances
                            </TabsTrigger>
                        ) : null}
                        {event.learnings?.length ? (
                            <TabsTrigger value="learnings" className="gap-1">
                                <Lightbulb className="h-4 w-4" />
                                Learnings
                            </TabsTrigger>
                        ) : null}
                    </TabsList>

                    {/* Gallery */}
                    {event.images?.length ? (
                        <TabsContent value="gallery">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {event.images.map((src, i) => (
                                    <Dialog
                                        key={src}
                                        open={open && index === i}
                                        onOpenChange={(o) => {
                                            setOpen(o);
                                            setIndex(i);
                                        }}
                                    >
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`${event.title} ${i + 1}`}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="p-0 min-w-screen min-h-screen fixed inset-0 flex items-center justify-center bg-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
                                            <Image
                                                src={event.images[index]}
                                                alt={`${event.title} ${index + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="rounded-full"
                                                    onClick={() => go(-1)}
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="rounded-full"
                                                    onClick={() => go(1)}
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </TabsContent>
                    ) : null}

                    {/* Performances */}
                    {event.performances?.length ? (
                        <TabsContent value="performances">
                            <div className="space-y-3">
                                {event.performances.map((p, _idx) => (
                                    <div
                                        key={p.title}
                                        className="border rounded-lg p-3 space-y-2"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="font-medium">{p.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {p.performer ? p.performer + " · " : ""}
                                                {typeof p.durationMin === "number"
                                                    ? `${p.durationMin} min`
                                                    : ""}
                                            </div>
                                        </div>
                                        {p.description ?
                                            p.description.map((d, i) => (
                                                <p
                                                    key={i + d}
                                                    className="text-sm text-muted-foreground leading-relaxed"
                                                >
                                                    {d}
                                                </p>
                                            )) : null}
                                        {p.mediaUrls?.length ? (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                                {p.mediaUrls.map((url, i) => (
                                                    <Dialog key={url}>
                                                        <DialogTrigger asChild>
                                                            <button type="button" className="relative aspect-video rounded-lg overflow-hidden group">
                                                                {isImageUrl(url) ? (
                                                                    <Image
                                                                        src={url}
                                                                        alt={`media ${i + 1}`}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : isVideoUrl(url) ? (
                                                                    <video
                                                                        src={url}
                                                                        className="w-full h-full object-cover"
                                                                        muted
                                                                    />
                                                                ) : (
                                                                    <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm">
                                                                        Unsupported
                                                                    </div>
                                                                )}
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent className="p-0 min-w-screen min-h-screen fixed inset-0 flex items-center justify-center bg-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
                                                            {isImageUrl(url) ? (
                                                                <Image
                                                                    src={url}
                                                                    alt={`media ${i + 1}`}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            ) : isVideoUrl(url) ? (
                                                                <video
                                                                    src={url}
                                                                    controls
                                                                    autoPlay
                                                                    className="max-w-5xl max-h-[90vh] w-full"
                                                                />
                                                            ) : null}
                                                        </DialogContent>
                                                    </Dialog>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ) : null}

                    {/* Learnings */}
                    {event.learnings?.length ? (
                        <TabsContent value="learnings">
                            <ul className="space-y-2">
                                {event.learnings.map((l, _i) => (
                                    <li key={l} className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                                        <span>{l}</span>
                                    </li>
                                ))}
                            </ul>
                        </TabsContent>
                    ) : null}
                </Tabs>
            </CardContent>
        </Card>
    );
}
