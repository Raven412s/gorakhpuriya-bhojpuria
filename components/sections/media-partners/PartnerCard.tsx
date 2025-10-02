"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Partner {
  name: string
  category: string
  logo: string
}

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl  ">
      <CardContent className="flex flex-col items-center justify-center p-8 md:p-10 ">
        <div className="relative mb-6 h-32 w-full ">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={`${partner.name} logo`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h3 className="text-center font-sans text-xl font-semibold text-card-foreground md:text-2xl">{partner.name}</h3>
        <p className="mt-2 text-center text-sm font-medium text-muted-foreground md:text-base">{partner.category}</p>
      </CardContent>
    </Card>
  )
}
