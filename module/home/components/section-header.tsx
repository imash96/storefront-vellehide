import Container from "@/ui/container"
import React from "react"

type SectionHeaderProps = {
    title: string
    desc?: string
    sectionName: string
    className?: string
    align?: "left" | "center"
    eyebrow?: string
    action?: React.ReactNode
} & React.PropsWithChildren

/**
 * SectionHeader
 * ─────────────
 * Wraps each home section with consistent heading + optional eyebrow/action row.
 * Respects brand tokens: font-heading (Bricolage Grotesque), accent for eyebrow rule, text-primary/secondary scale.
 */
export default function SectionHeader({
    title,
    desc,
    sectionName,
    className = "",
    align = "left",
    eyebrow,
    action,
    children,
}: SectionHeaderProps) {
    const isCenter = align === "center"

    return (
        <Container as="section" aria-label={sectionName} className="py-12 md:py-16 lg:py-20">
            {/* ── Header row ── */}
            <div
                className={`mb-10 md:mb-12 flex flex-col gap-4 ${isCenter ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between gap-5"}`}
            >
                <div className={`flex flex-col gap-2 ${isCenter ? "max-w-lg" : "max-w-xl"}`}>
                    {/* Eyebrow */}
                    {eyebrow && (
                        <p className={`inline-flex items-center gap-2.5 text-[9px] font-semibold tracking-[0.30em] uppercase text-accent ${isCenter && 'mx-auto'}`}>
                            <span className="block h-px w-7 bg-accent" aria-hidden="true" />
                            {eyebrow}
                            {isCenter && <span className="block h-px w-7 bg-accent" aria-hidden="true" />}
                        </p>
                    )}

                    {/* Title */}
                    <h2
                        className={`font-heading font-light leading-[1.08] tracking-[-0.02em] text-text-primary text-[2rem] md:text-[2.4rem] lg:text-[2.75rem] ${className}`}
                    >
                        {title}
                    </h2>

                    {/* Description */}
                    {desc && (
                        <p className="text-sm md:text-[13.5px] leading-relaxed font-light text-text-secondary mt-0.5">
                            {desc}
                        </p>
                    )}
                </div>

                {/* Right-side action (e.g. "View All" link) — left-align only */}
                {action && !isCenter && (
                    <div className="shrink-0">{action}</div>
                )}
            </div>

            {/* ── Section content ── */}
            {children}
        </Container>
    )
}