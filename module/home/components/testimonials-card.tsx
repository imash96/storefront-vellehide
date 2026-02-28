import { Testimonial } from "@/data/testimonials";
import { BadgeCheck, Quote } from "lucide-react";
import Rating from "./testimonals-rating";

interface TestimonialCardProps {
    testimonial: Testimonial;
    isActive?: boolean;
}

export default function TestimonialCard({ testimonial, isActive = false, }: TestimonialCardProps) {
    return (
        <article
            className={` group relative flex h-full flex-col rounded-2xl border border-card-border bg-card p-6 sm:p-7 transition-all duration-500 ease-out hover:border-border-strong hover:shadow-lg ${isActive && "border-accent/30 shadow-md"}`}
        >
            {/* Decorative quote icon */}
            <div className="absolute right-5 top-5 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1]">
                <Quote size={48} strokeWidth={1} />
            </div>
            {/* Stars + Date row */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <Rating rating={testimonial.star} size="sm" />
                {testimonial.date && (
                    <span className="shrink-0 text-[11px] font-medium tracking-wide text-text-tertiary">
                        {testimonial.date}
                    </span>
                )}
            </div>
            {/* Review text */}
            <blockquote className="relative mb-6 flex-1">
                <p className="text-[13.5px] leading-[1.7] font-normal text-text-secondary line-clamp-5">
                    {testimonial.review}
                </p>
            </blockquote>
            {/* Divider */}
            <div className="mb-5 h-px w-full bg-divider" />
            {/* Author row */}
            <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-border-subtle ring-offset-2 ring-offset-card">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                {/* Name + Product */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-sm font-semibold text-text-primary font-heading">
                            {testimonial.name}
                        </h3>
                        {testimonial.verified && (
                            <BadgeCheck
                                size={14}
                                className="shrink-0 fill-success text-success-foreground"
                                aria-label="Verified purchase"
                            />
                        )}
                    </div>
                    {testimonial.location && (
                        <p className="mt-0.5 truncate text-[11.5px] font-medium text-text-tertiary">
                            {testimonial.location}
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}