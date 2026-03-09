import Image from "next/image"
import Link from "next/link"
import { product_collections } from "@/data/collection"
import { collecionToShow } from "@/data/home"
import Button from "@/ui/button-new"
import SectionHeader from "../components/section-header"
import { ArrowRight } from "lucide-react"

export default async function Collection() {
  const collections = product_collections.filter((col) =>
    collecionToShow.includes(col.title)
  )

  return (
    <SectionHeader
      title="Shop by Collection"
      desc="Curated collections for every style and occasion."
      sectionName="Shop by Collection"
      eyebrow="Curated Edits"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-7 md:gap-4 md:gap-y-9">
        {collections.map((item) => (
          <Link
            key={item.id}
            href={`/collection/${item.handle}`}
            className="group block space-y-2.5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            aria-label={`Shop ${item.title} collection`}
          >
            <div className="relative aspect-3/4 overflow-hidden bg-muted">
              <Image
                src={(item.metadata?.thumbnail as string) ?? ""}
                alt={item.title}
                fill
                loading="lazy"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] will-change-transform"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
              />

              {/* Hover reveal overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                style={{
                  background:
                    "linear-gradient(to top, var(--scrim) 0%, transparent 60%)",
                }}
                aria-hidden
              >
                <span
                  className="flex items-center gap-1 text-white text-[10px] font-semibold tracking-[0.12em] uppercase"
                >
                  Explore
                  <ArrowRight className="size-2.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </div>

              {/* Corner accent mark */}
              <span
                className="absolute top-2 right-2 size-4 border-t border-r border-white/0 group-hover:border-white/50 group-hover:size-5 transition-all duration-300"
                aria-hidden
              />
            </div>

            {/* Title */}
            <div className="space-y-1 text-center">
              {/* FIX: text-sm vs text-[13.5px] — cleaner type scale */}
              <h3 className="text-sm font-light text-text-primary group-hover:text-primary transition-colors duration-200 leading-snug">
                {item.title}
              </h3>
              {/* Animated underline */}
              <div
                className="mx-auto h-px w-0 bg-accent group-hover:w-8 transition-all duration-300 ease-out"
                aria-hidden
              />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA — FIX: added mt-8 (was mt implied by section padding only) */}
      <div className="flex justify-center mt-8 md:mt-10">
        <Button href="/collection" variant="outline" icon={<ArrowRight className="size-3.5" />} iconPosition="right">
          View all Collections
        </Button>
      </div>
    </SectionHeader>
  )
}