import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PartnerCTA() {
    return (
        <section className="bg-secondary/30 py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Become a Partner
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                        Interested in supporting our mission to preserve and promote Bhojpuri culture? Partner with us to reach a
                        dedicated and growing community. We'd love to collaborate.
                    </p>
                    <div className="mt-10">
                        <Button
                            size="lg"
                            className="group h-12 px-8 text-base font-semibold transition-all hover:scale-105 sm:h-14 sm:px-10 sm:text-lg"
                        >
                            Get in Touch
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
