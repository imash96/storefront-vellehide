
export default function SectionHeader({ title, desc, sectionName, className = "", children }: SectionHeaderProps) {
    return (
        <section aria-label={sectionName} className="container-custom mx py-10 md:py-16">
            <div className={`space-y-0 ${className}`}>
                <h2 className="text-3xl lg:text-5xl tracking-tight font-light">
                    {title}
                </h2>
                <p className="max-w-2xl hidden text-xs lg:text-[13px] tracking-wide font-light text-gray-600">
                    {desc}
                </p>
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
} & React.PropsWithChildren;