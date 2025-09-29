"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HiCalendar,
  HiChevronLeft,
  HiChevronRight,
  HiMapPin,
  HiPhoto,
  HiUsers,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  location?: string;
  locations?: string[];
  photos: string[];
  attendees: string[];
  totalPhotos: number;
}

interface EventsGalleryProps {
  events: Event[];
}

export default function EventsGallery({ events }: EventsGalleryProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPhotoIndex(0);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
  };

  // Lock body scroll when modal is open and restore on close
  useEffect(() => {
    const originalOverflow =
      typeof document !== "undefined" ? document.body.style.overflow : "";
    const originalPaddingRight =
      typeof document !== "undefined" ? document.body.style.paddingRight : "";
    if (selectedEvent) {
      // prevent background scroll and avoid layout shift by compensating for scrollbar
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [selectedEvent]);

  const nextPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) =>
        prev === selectedEvent.photos.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? selectedEvent.photos.length - 1 : prev - 1,
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(event)}
          >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={event.photos[0]}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {event.type === "jutan" ? "जुटान" : "बैठकी"}
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {event.title}
              </h3>

              <div className="space-y-2 mb-3">
                <div className="flex items-center text-gray-600">
                  <HiCalendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiMapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {event.location || event.locations?.join(", ")}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiUsers className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.attendees.length} लोग</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiPhoto className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.totalPhotos} तस्वीरें</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-3">
                {event.description}
              </p>

              <Button className=" mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                तस्वीरें देखें
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 bg-opacity-90 z-50 flex items-center justify-center p-4 pointer-events-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedEvent.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <HiCalendar className="h-4 w-4 mr-1" />
                        {selectedEvent.date}
                      </span>
                      <span className="flex items-center">
                        <HiMapPin className="h-4 w-4 mr-1" />
                        {selectedEvent.location ||
                          selectedEvent.locations?.join(", ")}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </Button>
                </div>
              </div>

              {/* Modal Content: make this inner area scrollable while background is locked */}
              <div className="p-6 overflow-auto max-h-[60vh] touch-auto overscroll-contain">
                {/* Main Photo */}
                <div className="relative mb-4 h-80 rounded-lg overflow-hidden">
                  <Image
                    src={selectedEvent.photos[currentPhotoIndex]}
                    alt={`${selectedEvent.title} ${currentPhotoIndex + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Arrows */}
                  <Button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                  >
                    <HiChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                  >
                    <HiChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Photo Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentPhotoIndex + 1} / {selectedEvent.photos.length}
                  </div>
                </div>

                {/* Photo Thumbnails */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {selectedEvent.photos.map((photo, index) => (
                    <button
                      type="button"
                      key={photo || index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`relative h-20 rounded overflow-hidden cursor-pointer focus:outline-none ${
                        index === currentPhotoIndex
                          ? "ring-2 ring-orange-500"
                          : ""
                      }`}
                      aria-label={`Thumbnail ${index + 1}`}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">विवरण</h4>
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">उपस्थित लोग</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.attendees.map((person) => (
                        <span
                          key={person}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
