import Logo from "@/icon/logo";
import Link from "next/link"
import { Clock, Mail, MessageCircleQuestionMark } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { IconProp } from "@/types/common";
import RegionModal from "./region-modal";
import type { Route } from "next";
import Container from "@/ui/container";
import { footer } from "@/data/footer";

export default async function Footer() {
    const countryCode = (await cookies()).get('__country_code')?.value
    return (
        <footer aria-labelledby="footer-heading" className="bg-background-secondary border-t border-border pb-6 lg:pb-0">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container size="2xl" >
                <div className="grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
                    <div className="grid gap-y-6">
                        <Logo
                            className="w-32 fill-foreground"
                            aria-label="Company Logo"
                        />
                        <div className="space-y-4">
                            {contactInfo.map((info, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <info.icon size={16} strokeWidth={1.5} className="text-accent mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-foreground-tertiary uppercase tracking-wider">{info.title}</p>
                                        <p className="text-sm text-foreground-secondary mt-0.5">{info.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
            <h3 className="font-heading text-lg font-semibold text-foreground uppercase tracking-widest flex items-center gap-2 col-span-2 md:col-span-1">
                <span className="w-6 h-px bg-accent" />
                {title}
            </h3>
            <ul className="contents">
                {data.map((item) => (
                    <li key={item.name}>
                        <Link key={item.name} href={item.href as Route} className="text-sm text-foreground-secondary hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                            <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
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
    // const socialLinks = [
    //     { icon: Instagram, label: "Instagram" },
    //     { icon: Mail, label: "Email" },
    //     { icon: Phone, label: "Phone" },
    //     { icon: MapPin, label: "Store" },
    // ];
    return (
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between text-center md:text-left">
            {/* Copyright */}
            <p className="text-xs text-foreground-tertiary">
                &copy; {new Date().getFullYear()} Velle Hide · Crafted with care
            </p>
            {/* {current.level === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="shrink-0 border-t border-divider px-6 py-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-tertiary">
                            Connect with us
                        </p>
                        <div className="h-px flex-1 bg-divider ml-4" />
                    </div>
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                className="p-3 rounded-xl bg-muted/60 hover:bg-accent/15 hover:text-accent text-foreground-secondary transition-all duration-200 active:scale-95"
                                aria-label={label}
                            >
                                <Icon className="size-4" strokeWidth={1.5} />
                            </button>
                        ))}
                    </div>
                </motion.div>
            )} */}
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