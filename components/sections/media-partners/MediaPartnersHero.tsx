 export function MediaPartnersHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Our Media Partners
          </h1>
          <p className="mt-6 text-pretty font-sans text-xl text-muted-foreground sm:text-2xl md:text-3xl">
            हमारे सहयोगी जिन्होंने हमारी आवाज़ को बुलंद करने में मदद की।
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            We are incredibly grateful for the collaboration and support from our media partners. Their partnership is
            vital in helping us promote the Bhojpuri language and culture to a wider audience. Together, we are making a
            significant impact.
          </p>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px]" />
      </div>
    </section>
  )
}
