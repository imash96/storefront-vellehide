import { IconItem } from "@/types/common";
import Container from "@/ui/container";

type IconGridSectionProps = {
    items: IconItem[]
    className?: string
}

export default function IconGridSection({ items, className = '' }: IconGridSectionProps) {
    return (
        <Container className={`py-8 lg:py-10 ${className}`}>
            <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6">
                {items.map(({ name, Icon, description }) => {
                    return (
                        <div key={name} className={`flex flex-col md:flex-row items-center gap-3 md:gap-4 p-4`}>
                            <Icon className="w-14 lg:w-16 text-accent" aria-hidden />
                            <div className="flex flex-col items-center md:items-start gap-0.5 text-center md:text-left">
                                <h3 className="text-sm font-semibold tracking-wide text-text-primary">
                                    {name}
                                </h3>
                                <p className="text-xs font-light leading-snug text-text-secondary">
                                    {description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </Container>
    )
}