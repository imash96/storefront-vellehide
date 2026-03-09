import { IconItem } from "@/types/common";
import Container from "@/ui/container";

type IconGridSectionProps = {
    items: IconItem[]
    className?: string
}

export default function IconGridSection({ items, className = '' }: IconGridSectionProps) {
    return (
        <div className={`w-full border-y border-border py-7 lg:py-9 ${className}`}>
            <Container size="2xl" as="ul" role="list" className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6">
                {items.map(({ name, Icon, description }) => {
                    return (
                        <li key={name} className={`flex flex-col md:flex-row items-center gap-3 md:gap-4 p-3 md:p-4`}>
                            <Icon className="size-14 lg:size-14 shrink-0 text-accent" aria-hidden />
                            <div className="flex flex-col items-center md:items-start gap-0.5 text-center md:text-left">
                                <h3 className="text-[13px] md:text-sm font-semibold tracking-wide text-text-primary">
                                    {name}
                                </h3>
                                <p className="text-xs font-light leading-snug text-text-secondary">
                                    {description}
                                </p>
                            </div>
                        </li>
                    )
                })}
            </Container>
        </div>
    )
}