// components/forms/MembershipForm.tsx
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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

interface MembershipFormProps {
  onSuccess?: () => void;
}

export default function MembershipForm({ onSuccess }: MembershipFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const { control, handleSubmit, watch, setValue, reset } = form;

  const sameAsMobile = watch("sameAsMobile");
  const mobileValue = watch("mobile");

  /* Auto-sync WhatsApp when checkbox is checked */
  React.useEffect(() => {
    if (sameAsMobile) {
      setValue("whatsapp", mobileValue);
    }
  }, [sameAsMobile, mobileValue, setValue]);

  async function onSubmit(data: MembershipFormValues) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/members", {
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

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      const result = await response.json();
      
      toast.success(
        "Member added successfully!",
        {
          description: `${data.name} has been added to the directory.`
        }
      );

      // Form reset
      reset();
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Failed to add member",
        {
          description: "Please check your connection and try again."
        }
      );
    } finally {
      setIsSubmitting(false);
    }
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
              <FieldLabel>पूरा नाम *</FieldLabel>
              <Input {...field} placeholder="Enter full name" />
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
              <Input {...field} placeholder="Enter occupation/profession" />
            </Field>
          )}
        />
        
        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>ईमेल *</FieldLabel>
              <Input type="email" {...field} placeholder="example@email.com" />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          {/* MOBILE */}
          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel>मोबाइल नंबर *</FieldLabel>
                <Input {...field} placeholder="Enter mobile number" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* WHATSAPP */}
          <Controller
            name="whatsapp"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel>WhatsApp नंबर *</FieldLabel>
                <Input 
                  {...field} 
                  disabled={sameAsMobile} 
                  placeholder="Enter WhatsApp number" 
                />
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
        </div>
        
        {/* SAME AS MOBILE */}
        <Controller
          name="sameAsMobile"
          control={control}
          render={({ field }) => (
            <Field orientation="horizontal" className="mt-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="sameAsMobile"
              />
              <FieldLabel htmlFor="sameAsMobile">
                WhatsApp नंबर मोबाइल जैसा ही है
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "सदस्य बनें"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}