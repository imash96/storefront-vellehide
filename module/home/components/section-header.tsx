
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
        <section aria-label={sectionName} className="container-custom py-10 md:py-16">
            <div className={`mb-8 md:mb-10 flex flex-col gap-3 ${isCenter ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
                <div className={`space-y-2 ${isCenter ? "max-w-xl" : ""}`}>
                    {/* Eyebrow label */}
                    {eyebrow && (
                        <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-accent">
                            <span
                                className="block h-px w-6 bg-accent"
                                aria-hidden="true"
                            />
                            {eyebrow}
                        </p>
                    )}

                    {/* Title */}
                    <h2 className={`font-heading text-3xl lg:text-4xl xl:text-[2.65rem] font-light leading-[1.1] tracking-tight text-text-primary ${className}`}>
                        {title}
                    </h2>

                    {/* Description */}
                    {desc && (
                        <p className="mt-1 max-w-xl text-sm lg:text-[13.5px] leading-relaxed font-light text-text-secondary">
                            {desc}
                        </p>
                    )}
                </div>

                {/* Optional right-side action (e.g. "View All" link) */}
                {action && !isCenter && (
                    <div className="shrink-0">{action}</div>
                )}
            </div>
            {children}
        </section>
    );
}

type SectionHeaderProps = {
    title: string;
    desc: string;
    sectionName: string;
    className?: string;
    align?: "left" | "center"
    eyebrow?: string
    action?: React.ReactNode
} & React.PropsWithChildren;