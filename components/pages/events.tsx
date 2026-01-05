"use client"

import { type EventFromAPI } from "@/components/sections/events/EventSection";
import PageHeader from "@/components/sections/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const ClientEvents = () => {
  const [events, setEvents] = useState<EventFromAPI[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data: EventFromAPI[] = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
      toast.error("इवेंट्स लोड नहीं हो सके");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-center text-muted-foreground col-span-full">
              इवेंट्स लोड हो रहे हैं...
            </p>
          ) : events.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground col-span-full">
              <p className="text-lg font-medium">कोई इवेंट नहीं है।</p>
              <p>नीचे "नया इवेंट" बटन दबाकर पहला इवेंट जोड़ें।</p>
            </div>
          ) : (
            events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden shadow-sm hover:shadow-lg transition-all relative group py-0"
              >
                {/* ---------- Media ---------- */}
                {event.media && event.media?.length > 0 && (
                  <div className="relative w-full h-48">
                    <Image
                      src={event.media[0].secure_url}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />

                    {/* Photo count badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {event.media.length} फोटो
                    </div>

                    {/* Type badge */}
                    {event.type && (
                      <div className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-1 rounded">
                        {event.type === "baithaki" ? "बैठकी" : "जुटान"}
                      </div>
                    )}
                  </div>
                )}

                {/* ---------- Content ---------- */}
                <CardContent className="p-4 space-y-2">
                  <Link href={`/events/${event._id}`}>
                    <h3 className="font-semibold text-lg leading-tight hover:text-blue-600">
                      {event.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground">
                    {event.date} • {event.venue}
                    {event.city && `, ${event.city}`}
                  </p>

                  {event.motive && (
                    <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {event.motive}
                    </span>
                  )}

                  {/* Description array */}
                  {event.description && event.description?.length > 0 && (
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {event.description[0]}
                    </p>
                  )}

                  {/* Attendees count */}
                  {event.attendees?.length && event.attendees?.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      उपस्थित लोग: {event.attendees?.length}
                    </p>
                  )}
                </CardContent>

                {/* ---------- Actions ---------- */}
                <CardFooter className="flex justify-between gap-2 px-4 pb-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/events/${event._id}`}>
                      विस्तार से देखें
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    
  );
}

export default ClientEvents