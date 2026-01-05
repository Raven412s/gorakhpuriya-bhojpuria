"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";
import MultiImageUploader from "@/components/tools/ImageUploadMultiple";

// -----------------
// Zod Schema
// -----------------
const eventSchema = z.object({
    title: z.string().min(3),
    date: z.string().min(1),
    venue: z.string().min(1),
    city: z.string().optional(),
    type: z.enum(["jutan", "baithaki"]).optional(),
    motive: z.string().optional(),
    description: z.string().min(10),
    media: z.array(
        z.object({
            secure_url: z.string().url(),
        })
    ).min(1),
    attendees: z.string().optional(), // comma separated
    totalPhotos: z.number().optional(),
    learnings: z.string().optional(), // comma separated
});

export type EventFormValues = z.infer<typeof eventSchema>;
interface EventFormValuesWithID extends EventFormValues { _id: string }

interface AddEventFormProps {
    initialData?: EventFormValuesWithID;
    onSubmitSuccess?: (data: EventFormValuesWithID) => void;
}

export function AddEventForm({ initialData, onSubmitSuccess }: AddEventFormProps) {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData || {
            title: "",
            date: "",
            venue: "",
            city: "",
            type: undefined,
            motive: "",
            description: "",
            media: [],
            attendees: "",
            totalPhotos: 0,
            learnings: "",
        },
    });

    const onSubmit = async (data: EventFormValues) => {
        try {
            let url = "/api/admin/events";
            let method: "POST" | "PATCH" = "POST";

            if ((initialData as EventFormValuesWithID)?._id) {
                url += `/${(initialData as EventFormValuesWithID)._id}`;
                method = "PATCH";
            }

            // Convert comma-separated strings to arrays
            const payload = {
                ...data,
                attendees: data.attendees?.split(",").map((s) => s.trim()) || [],
                learnings: data.learnings?.split(",").map((s) => s.trim()) || [],
                description: [data.description],
                totalPhotos: data.media?.length || 0,
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save event");

            const savedEvent = await res.json();
            toast.success(method === "PATCH" ? "इवेंट अपडेट हो गया!" : "इवेंट जुड़ गया!");

            if (onSubmitSuccess) onSubmitSuccess(savedEvent as EventFormValuesWithID);

            if (method === "POST") form.reset();
        } catch (error) {
            console.error(error);
            toast.error("सर्वर पर इवेंट सेव नहीं हुआ!");
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>नया इवेंट जोड़ें</CardTitle>
                <CardDescription>बैइठकी जुटान के लिए मीडिया और जानकारी भरें।</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="add-event-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup>
                        {/* Title */}
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>इवेंट का नाम (Title)</FieldLabel>
                                    <Input {...field} placeholder="उदा: फगुआ पे जुटान" />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Date + Venue + City */}
                        <div className="flex flex-wrap gap-4">
                            <Controller
                                name="date"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>तारीख (Date)</FieldLabel>
                                        <Input type="date" {...field} />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="venue"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>स्थान (Venue)</FieldLabel>
                                        <Input {...field} placeholder="उदा: सभागार" />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>शहर (City)</FieldLabel>
                                        <Input {...field} placeholder="उदा: गोरखपुर" />
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Type + Motive */}
                        <div className="flex flex-wrap gap-4">
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>Type</FieldLabel>
                                        <select {...field} className="border rounded px-2 py-1 w-full">
                                            <option value="">Select type</option>
                                            <option value="jutan">जुटान</option>
                                            <option value="baithaki">बैठकी</option>
                                        </select>
                                    </Field>
                                )}
                            />
                            <Controller
                                name="motive"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>उद्देश्य (Motive)</FieldLabel>
                                        <Input {...field} placeholder="यदि कोई उद्देश्य है..." />
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>विवरण (Description)</FieldLabel>
                                    <InputGroupTextarea {...field} placeholder="इवेंट के बारे में विस्तार से लिखें..." className="min-h-24" />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Attendees + Learnings */}
                        <div className="flex flex-wrap gap-4">
                            <Controller
                                name="attendees"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>उपस्थित लोग (Attendees, comma separated)</FieldLabel>
                                        <Input {...field} placeholder="उदा: राहुल जी, संजय जी, प्रियंका जी" />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="learnings"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex-1 min-w-[150px]">
                                        <FieldLabel>Learnings (comma separated)</FieldLabel>
                                        <Input {...field} placeholder="उदा: समन्वय बढ़ा, युवा भागीदारी में वृद्धि" />
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Media */}
                        <Controller
                            name="media"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>मीडिया अपलोड (Images/Videos)</FieldLabel>
                                    <MultiImageUploader
                                        endpoint="/api/admin/upload"
                                        multiple
                                        onComplete={(uploadedAssets: any[]) => {
                                            const validAssets = uploadedAssets
                                                .flatMap(asset => asset.uploads || [])
                                                .filter((asset: any) => !!asset.secure_url)
                                                .map((asset: any) => ({ secure_url: asset.secure_url }));
                                            form.setValue("media", validAssets, { shouldValidate: true });
                                        }}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>


            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
                <Button type="submit" form="add-event-form">इवेंट सुरक्षित करें</Button>
            </CardFooter>
        </Card>
    );
}
