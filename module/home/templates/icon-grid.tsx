import { IconItem } from "@/types/common"
import Container from "@/ui/container"

type IconGridSectionProps = {
    items: IconItem[]
    className?: string
    /** Visual style variant */
    variant?: "bar" | "cards"
}

/**
 * IconGridSection — USP / Trust Signal Bar
 * ──────────────────────────────────────────
 * "bar" variant (default): Horizontal strip with dividers.
 *   → Used below hero for quick trust signals.
 *
 * "cards" variant: Padded card tiles with border.
 *   → Used standalone in the page body.
 *
 * Both variants: 2-col on mobile, 4-col on tablet+.
 */
export default function IconGridSection({
    items,
    className = "",
    variant = "bar",
}: IconGridSectionProps) {
    if (variant === "cards") {
        return (
            <Container className={`py-10 md:py-14 ${className}`}>
                <ul
                    role="list"
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    {items.map(({ name, Icon, description }) => (
                        <li
                            key={name}
                            className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-5 md:p-6 bg-card border border-card-border hover:border-border-strong hover:shadow-sm transition-all duration-200"
                        >
                            <Icon
                                className="size-10 md:size-11 shrink-0 text-accent"
                                aria-hidden
                            />
                            <div className="flex flex-col items-center md:items-start gap-0.5 text-center md:text-left">
                                <h3 className="text-[13px] font-semibold tracking-wide text-text-primary">
                                    {name}
                                </h3>
                                <p className="text-[12px] font-light leading-snug text-text-secondary max-w-[18ch]">
                                    {description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        )
    }

    // ── "bar" variant (default) ────────────────────────────────────────────────
    return (
        <div
            className={`w-full border-y border-border-subtle bg-background-secondary ${className}`}
        >
            <Container>
                <ul
                    role="list"
                    className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-subtle"
                >
                    {items.map(({ name, Icon, description }) => (
                        <li
                            key={name}
                            className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 py-5 px-4 sm:px-6 text-center sm:text-left"
                        >
                            <Icon
                                className="size-8 sm:size-9 shrink-0 text-accent"
                                aria-hidden
                            />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-[12.5px] font-semibold tracking-wide text-text-primary leading-none">
                                    {name}
                                </h3>
                                <p className="text-[11.5px] font-light text-text-secondary leading-snug">
                                    {description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}