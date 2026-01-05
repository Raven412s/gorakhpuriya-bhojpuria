"use client"
import React, { useState, useEffect } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { AddEventForm, EventFormValues } from "@/components/forms/addEventForm"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useLenis } from "lenis/react"
import { toast } from "sonner"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Event type returned from API
interface EventFromAPI extends EventFormValues {
    _id: string // assuming backend sends an id
}

const EventsManagementPage = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<EventFromAPI | null>(null)
    const lenis = useLenis()
    const [events, setEvents] = useState<EventFromAPI[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch events from API
    const fetchEvents = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/admin/events")
            if (!res.ok) throw new Error("Failed to fetch events")
            const data: EventFromAPI[] = await res.json()
            setEvents(data)
        } catch (error) {
            console.error(error)
            toast.error("इवेंट्स लोड नहीं हो सके")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const toggleSheet = (open: boolean) => {
        setIsSheetOpen(open)
        if (open) lenis?.stop()
        else lenis?.start()
    }

    const handleEdit = (event: EventFromAPI) => {
        setEditingEvent(event)
        toggleSheet(true)
    }

    const handleAddNew = () => {
        setEditingEvent(null)
        toggleSheet(true)
    }

    const handleSubmitSuccess = () => {
        toggleSheet(false)
        fetchEvents()
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 w-full relative">
                <h1 className="text-3xl font-bold">इवेंट मैनेजमेंट</h1>

                <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
                    <SheetTrigger asChild>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus size={18} /> नया इवेंट
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        data-lenis-prevent
                        className="overflow-y-auto md:min-w-4xl pb-5"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                {editingEvent ? "इवेंट एडिट करें" : "नया इवेंट जोड़ें"}
                            </SheetTitle>
                        </SheetHeader>

                        <AddEventForm
                            initialData={editingEvent ?? undefined}
                            onSubmitSuccess={handleSubmitSuccess}
                        />
                    </SheetContent>
                </Sheet>
            </div>

  {/* Events List */}
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
        {event.media?.length > 0 && (
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
          <h3 className="font-semibold text-lg leading-tight">
            {event.title}
          </h3>

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
          {event.description?.length > 0 && (
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
        <CardFooter className="flex justify-end gap-2 px-4 pb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(event)}
            className="hover:bg-gray-100"
          >
            <Edit size={16} className="text-gray-700" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              if (!confirm("क्या आप वाकई इस इवेंट को डिलीट करना चाहते हैं?")) return
              try {
                const res = await fetch(`/api/admin/events/${event._id}`, {
                  method: "DELETE",
                })
                if (!res.ok) throw new Error("Failed to delete")
                toast.success("इवेंट डिलीट हो गया!")
                fetchEvents()
              } catch (err) {
                console.error(err)
                toast.error("इवेंट डिलीट नहीं हो पाया")
              }
            }}
            className="hover:bg-red-50"
          >
            <Trash2 size={16} className="text-red-600" />
          </Button>
        </CardFooter>
      </Card>
    ))
  )}
</div>


        </div>
    )
}

export default EventsManagementPage
