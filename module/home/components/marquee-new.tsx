"use client"

import Image from "next/image"

import "@/css/marquee.css"

type MarqueeItem = {
    src: string
    alt: string
}

interface ImageMarqueeProps {
    items: MarqueeItem[]
    direction?: "left" | "right"
    duration?: number
    tileWidth?: number
    className?: string
}

export default function ImageMarquee({
    items,
    direction = "left",
    duration = 44,
    tileWidth = 220,
    className = "",
}: ImageMarqueeProps) {

    const minW = Math.round(tileWidth * 0.7)
    const vwCoeff = Math.round(tileWidth / 12.8)

    return (
        <div
            className={`relative overflow-hidden no-scrollbar group/marquee ${className}`}
            aria-hidden="true"
            style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
        >
            <div
                className={[
                    "flex w-max",
                    "will-change-transform",
                    "motion-safe:animate-marquee",
                    "animate-marquee",
                    "group-hover/marquee:[animation-play-state:paused]",
                    "group-active/marquee:[animation-play-state:paused]",
                ].join(" ")}
                style={{
                    animationDuration: `${duration}s`,
                    animationDirection: direction === "left" ? "normal" : "reverse",
                    transform: "translateZ(0)", // GPU stabilize
                }}
            >
                {[...items, ...items].map((item, i) => (
                    <div
                        key={`${item.src}-${i}`}
                        className="group/tile relative shrink-0 overflow-hidden no-scrollbar bg-muted rounded-md aspect-3/4 mr-2.5"
                        style={{
                            width: `clamp(${minW}px, ${vwCoeff}vw, ${tileWidth}px)`,
                        }}
                    >
                        <Image
                            src={item.src}
                            alt=""
                            fill
                            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover/tile:scale-[1.05]"
                            sizes="(max-width: 768px) 45vw, (max-width: 1200px) 18vw, 220px"
                            priority={i < items.length}
                        />

                        <div
                            className="absolute inset-0 bg-background/0 motion-safe:transition-colors motion-safe:duration-500 group-hover/tile:bg-background/5"
                            aria-hidden
                        />

                        <div
                            className="absolute inset-x-0 bottom-0 h-1/3 opacity-0 motion-safe:transition-opacity motion-safe:duration-500 group-hover/tile:opacity-100"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 100%)",
                            }}
                            aria-hidden
                        />
                    </div>
                ))}
            </div>

            <div
                className="absolute bottom-0 inset-x-0 h-0.5 bg-accent origin-left scale-x-0 group-hover/marquee:scale-x-100 motion-safe:transition-transform motion-safe:duration-600"
                aria-hidden
            />
        </div>
    )
}