// app/events/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventSection from "@/components/sections/events/EventSection";
import PageHeader from "@/components/sections/shared/PageHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Types
import type { EventFromAPI } from "@/components/sections/events/EventSection";

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const event = await getEvent(id);

    if (!event) {
      return {
        title: "इवेंट नहीं मिला | गोरखपुरिया भोजपुरिया",
        description: "यह इवेंट उपलब्ध नहीं है",
      };
    }

    return {
      title: `${event.title} | गोरखपुरिया भोजपुरिया`,
      description: event.description?.[0] || `गोरखपुरिया भोजपुरिया का ${event.type === "baithaki" ? "बैठकी" : "जुटान"} कार्यक्रम`,
    };
  } catch (error) {
    return {
      title: "बैइठकी जुटान | गोरखपुरिया भोजपुरिया",
      description: "गोरखपुरिया भोजपुरिया के सभी जुटान और बैठकी कार्यक्रमों का विस्तृत विवरण",
    };
  }
}

// Fetch event data from API
async function getEvent(id: string): Promise<EventFromAPI | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/admin/events/${id}`, {
      next: { revalidate: 3600 },
    });


    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <SectionWrapper
      maxWidth="full"
      background="transparent"
      navbarSpacing="none"
      padding="none"
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pointer-events-auto relative"
    >
      {/* Hero Section */}
      <PageHeader
        title={event.title}
        subtitle={`${event.date} • ${event.venue}${event.city ? `, ${event.city}` : ''}`}
        backgroundImage="/images/events/header-bg.jpg"
      />

      {/* Event Details */}
      <div className="container mx-auto px-4 py-8">
        <EventSection event={event} />

        {/* Back to Events Link */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/events">
              ← सभी इवेंट्स देखें
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default EventDetailPage;