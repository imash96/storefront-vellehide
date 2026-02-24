import ImageMarquee from "../components/marquee";

export default function GalleryWall() {
    const tImages = [
        { src: "/images/marquee/t1.jpg", alt: "Image 1" },
        { src: "/images/marquee/t2.jpg", alt: "Image 2" },
        { src: "/images/marquee/t3.jpg", alt: "Image 3" },
        { src: "/images/marquee/t4.jpg", alt: "Image 4" },
        { src: "/images/marquee/t5.jpg", alt: "Image 5" },
        { src: "/images/marquee/t3.jpg", alt: "Image 6" },
        { src: "/images/marquee/t7.jpg", alt: "Image 7" },
        { src: "/images/marquee/t8.jpg", alt: "Image 8" },
    ]

    const bImages = [
        { src: "/images/marquee/b1.jpg", alt: "Image 1" },
        { src: "/images/marquee/b2.jpg", alt: "Image 2" },
        { src: "/images/marquee/b3.jpg", alt: "Image 3" },
        { src: "/images/marquee/b4.jpg", alt: "Image 4" },
        { src: "/images/marquee/b5.jpg", alt: "Image 5" },
        { src: "/images/marquee/b6.jpg", alt: "Image 6" },
        { src: "/images/marquee/b7.jpg", alt: "Image 7" },
        { src: "/images/marquee/b8.jpg", alt: "Image 8" },
    ]

    return (
        <div className="overflow-hidden py-8 md:py-12 lg:py-16 max-w-full space-y-8">
            <ImageMarquee
                images={tImages}
                duration={35}
            />
            <ImageMarquee
                images={bImages}
                duration={30}
                direction="backward"
            />
        </div>
    )
}