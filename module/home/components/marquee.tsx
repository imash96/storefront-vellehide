import Image from "next/image"

export default function Marquee({ images, direction = "forward", duration = 20, className = "" }: MarqueeProps) {
    const doubled = [...images, ...images]
    return (
        <div className={`overflow-hidden no-scrollbar whitespace-nowrap ${className ?? ""}`} aria-hidden="true">
            <div
                className="flex animate-marquee"
                style={{
                    animationDuration: `${duration}s`,
                    animationDirection: direction === "forward" ? "normal" : "reverse",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    willChange: "transform",
                }}
            >
                {doubled.map((img, index) => (
                    <div
                        key={index}
                        className="shrink-0 mx-1.5 overflow-hidden"
                        style={{ width: "220px", height: "272px" }}
                    >
                        <Image
                            src={img.src || "/svg/placeholder.svg"}
                            alt=""   /* decorative images need empty alt */
                            width={220}
                            height={272}
                            className="w-full h-full object-cover object-center
                                       transition-transform duration-500 ease-out
                                       hover:scale-[1.04]"
                            sizes="220px"
                            priority={index < 5}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

type MarqueeImages = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

interface MarqueeProps {
    images: MarqueeImages[]
    direction?: "forward" | "backward"
    duration?: number
    className?: string
}