import Logo from "@/icon/logo";
import Link from "next/link"
import { Clock, Mail, MessageCircleQuestionMark } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { IconProp } from "@/types/common";
import RegionModal from "./region-modal";
import type { Route } from "next";
import Container from "@/module/common/create-section";
import { footer } from "@/lib/constant/footer";

export default async function Footer() {
    const countryCode = (await cookies()).get('__country_code')?.value
    return (
        <footer aria-labelledby="footer-heading" className="bg-primary text-primary-foreground border-t border-primary-hover/20 pb-6 lg:pb-0">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <div className="grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
                    <div className="grid gap-y-6">
                        <Logo
                            className="w-32 fill-primary-foreground"
                            aria-label="Company Logo"
                        />
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <info.icon
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-primary-foreground/80"
                                        aria-hidden="true"
                                    />
                                    <span className="text-base tracking-wide font-medium">
                                        {info.title}
                                    </span>
                                </div>
                                <p className="text-sm tracking-wider px-6 text-primary-foreground/70 leading-relaxed">
                                    {info.content}
                                </p>
                            </div>
                        ))}
                        <RegionModal countryCode={countryCode} />
                    </div>
                    {/* Footer Columns */}
                    {Object.entries(footer).map(([title, data]) => (
                        <FooterColumn
                            key={title}
                            title={title}
                            data={data}
                        />
                    ))}
                </div>
                {/* Footer Bottom */}
                <div className="border-t border-primary-hover/20 px-4 py-6">
                    <FooterBottom />
                </div>
            </Container>
        </footer>
    )
}

// Footer Column Component
const FooterColumn = ({ title, data }: FooterColumnProps) => {
    return (
        <nav aria-label={`${title} navigation`} className="grid grid-cols-2 md:grid-cols-1 w-full gap-y-4">
            <h3 className="useful-link text-lg tracking-widest font-semibold uppercase text-primary-foreground col-span-2 md:col-span-1">
                {title}
            </h3>
            <ul className="contents">
                {data.map((item) => (
                    <li key={item.name} className="listHoverAnimation list-none text-sm transition-all duration-200">
                        <Link key={item.name} href={item.href as Route} className="flex items-center gap-x-2 text-primary-foreground/70 hover:text-primary-foreground hover:translate-x-1 transition-all duration-200 py-1 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 rounded-sm">
                            {item.icon && (
                                <item.icon
                                    className="size-5 shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// Footer Bottom Component
export function FooterBottom() {
    return (
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between text-center md:text-left">
            {/* Copyright */}
            <p className="text-sm text-primary-foreground/70 order-2 md:order-1">
                &copy; {new Date().getFullYear()} Velle Hide. All rights reserved.
            </p>

            {/* Payment Badge */}
            <div className="order-1 md:order-2">
                <Image
                    className="h-12 w-auto mx-auto md:mx-0"
                    height={100}
                    width={200}
                    loading="lazy"
                    src="/images/contents/StripeBadge.png"
                    alt="Secure payment by Stripe"
                />
            </div>
        </div>
    )
}

// Contact Info Data
const contactInfo = [
    {
        icon: Clock,
        title: "Our Timing",
        content: "Mon to Sat - 11:00 AM to 7:30 PM",
    },
    {
        icon: MessageCircleQuestionMark,
        title: "Order Query",
        content: "Contact: 98-6777-2418",
    },
    {
        icon: Mail,
        title: "Email Us",
        content: "contact@vellehide.com",
    },
];

// Types
type FooterColumnProps = {
    title: string
    data: {
        name: string;
        href: string;
        icon?: ({ ...props }: IconProp) => React.ReactNode
    }[]
}