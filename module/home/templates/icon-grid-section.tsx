import { IconItem } from "@/types/common";

type IconGridSectionProps = {
    items: IconItem[]
    className?: string
}

export default function IconGridSection({ items, className = '' }: IconGridSectionProps) {
    return (
        <div className={`container-custom py-8 lg:py-10 ${className}`}>
            <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6">
                {items.map(({ name, Icon, description }) => {
                    return (
                        <div key={name} className={`flex flex-col md:flex-row items-center gap-3 md:gap-4 py-7 px-4 sm:px-6`}>
                            <Icon className="w-14 lg:w-16 text-accent" aria-hidden />
                            <div className="sm:flex flex-col justify-center align-middle space-y-1 sm:space-y-0 text-center sm:text-left ">
                                <h3 className="text-base font-medium tracking-wider text-text-primary">{name}</h3>
                                <p className="font-light text-xs text-text-secondary">{description}</p>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div >
    )
}