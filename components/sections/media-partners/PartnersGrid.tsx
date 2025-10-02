import { PartnerCard } from "./PartnerCard"

const partners = [
  {
    name: "Viacamproductions",
    category: "Media Partner",
    logo: "/viacamproductions-media-production-logo.svg",
  },
  {
    name: "Big FM",
    category: "Radio Partner",
    logo: "/big-fm-radio-station-logo.jpg",
  },
  {
    name: "B GLOBAL ADWORLD",
    category: "Event Partner",
    logo: "/b-global-adworld-advertising-agency-logo.jpg",
  },
]

export function PartnersGrid() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
