"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
    FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/* ----------------------------- */
/* ZOD SCHEMA */
/* ----------------------------- */
const membershipSchema = z.object({
    name: z.string().min(2, "नाम अनिवार्य है"),
    email: z.string().email("सही ईमेल दर्ज करें"),
    mobile: z.string().min(10, "सही मोबाइल नंबर दर्ज करें"),
    whatsapp: z.string().min(10, "सही WhatsApp नंबर दर्ज करें"),
    occupation: z.string().optional(),
    sameAsMobile: z.boolean()
});

type MembershipFormValues = z.infer<typeof membershipSchema>;

export default function MembershipForm() {
    const form = useForm<MembershipFormValues>({
        resolver: zodResolver(membershipSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            whatsapp: "",
            occupation: "",
            sameAsMobile: false,
        },
    });

    const { control, handleSubmit, watch, setValue, formState } = form;

    const sameAsMobile = watch("sameAsMobile");
    const mobileValue = watch("mobile");

    /* Auto-sync WhatsApp when checkbox is checked */
    React.useEffect(() => {
        if (sameAsMobile) {
            setValue("whatsapp", mobileValue);
        }
    }, [sameAsMobile, mobileValue, setValue]);

    async function onSubmit(data: MembershipFormValues) {
        await fetch("/api/members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                whatsapp: data.whatsapp,
                occupation: data.occupation,
            }),
        });

        alert(
            "धन्यवाद 🙏\n" +
            "आपका आवेदन Gorakhpuriya Bhojpuriya Family को प्राप्त हो गया है।\n" +
            "एडमिन उचित समझने पर आपसे संपर्क करेंगे।"
        );

        form.reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
                {/* NAME */}
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>पूरा नाम</FieldLabel>
                            <Input {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* OCCUPATION */}
                <Controller
                    name="occupation"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>व्यवसाय / पेशा</FieldLabel>
                            <Input {...field} />
                        </Field>
                    )}
                />
                {/* EMAIL */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>ईमेल</FieldLabel>
                            <Input type="email" {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <div className="flex justify-between items-start gap-4">
                    <div className=" w-full">
                        {/* MOBILE */}
                        <Controller
                            name="mobile"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>मोबाइल नंबर</FieldLabel>
                                    <Input {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>


                    <div className=" w-full flex flex-col items-start gap-1.5">

                        {/* WHATSAPP */}
                        <Controller
                            name="whatsapp"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>WhatsApp नंबर</FieldLabel>
                                    <Input {...field} disabled={sameAsMobile} />
                                    <FieldDescription>
                                        यह नंबर Gorakhpuriya Bhojpuriya Family से संपर्क हेतु है।
                                        ग्रुप में जोड़ना एडमिन की स्वीकृति पर निर्भर करेगा।
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* SAME AS MOBILE */}
                        <Controller
                            name="sameAsMobile"
                            control={control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldLabel>
                                        WhatsApp नंबर मोबाइल जैसा ही है
                                    </FieldLabel>
                                </Field>
                            )}
                        />
                    </div>
                </div>


            </FieldGroup>

            <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={formState.isSubmitting}
            >
                सदस्य बनें
            </Button>
        </form>
    );
}
