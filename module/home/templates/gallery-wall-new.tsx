import ImageMarquee from "../components/marquee-new"

const tImages = [
    { src: "/images/marquee/t1.jpg", alt: "" },
    { src: "/images/marquee/t2.jpg", alt: "" },
    { src: "/images/marquee/t3.jpg", alt: "" },
    { src: "/images/marquee/t4.jpg", alt: "" },
    { src: "/images/marquee/t5.jpg", alt: "" },
    { src: "/images/marquee/t6.jpg", alt: "" },
    { src: "/images/marquee/t7.jpg", alt: "" },
    { src: "/images/marquee/t8.jpg", alt: "" },
]

const bImages = [
    { src: "/images/marquee/b1.jpg", alt: "" },
    { src: "/images/marquee/b2.jpg", alt: "" },
    { src: "/images/marquee/b3.jpg", alt: "" },
    { src: "/images/marquee/b4.jpg", alt: "" },
    { src: "/images/marquee/b5.jpg", alt: "" },
    { src: "/images/marquee/b6.jpg", alt: "" },
    { src: "/images/marquee/b7.jpg", alt: "" },
    { src: "/images/marquee/b8.jpg", alt: "" },
]

export default function GalleryWall() {
    return (
        <section
            aria-label="Premium leather lookbook"
            className="w-full overflow-hidden no-scrollbar bg-background py-12 md:py-16 lg:py-24"
        >
            <div className="container-custom mb-10 md:mb-14">
                <p className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.32em] uppercase text-accent">
                    <span className="block h-px w-8 bg-accent" aria-hidden />
                    The Edit
                </p>
            </div>

            <div className="space-y-3 md:space-y-4">
                <ImageMarquee
                    items={tImages}
                    direction="left"
                    duration={52}
                    tileWidth={220}
                />

                <ImageMarquee
                    items={bImages}
                    direction="right"
                    duration={40}
                    tileWidth={190}
                />
            </div>
        </section>
    )
}