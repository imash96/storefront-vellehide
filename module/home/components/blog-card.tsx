"use client"

import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read blog post: ${post.title}`}
            className="group block overflow-hidden no-scrollbar transition-all duration-150 ease-out bg-card border border-card-border rounded-sm hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            {/* Image Container */}
            <div className="relative h-52 sm:h-56 overflow-hidden no-scrollbar rounded-t-sm">
                <Image
                    src={post.thumbnail || "/svg/placeholder.svg"}
                    alt={post.title || "Blog thumbnail"}
                    width={350}
                    height={250}
                    className="object-cover size-full transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                {post.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-md shadow-sm">
                        {post.category}
                    </span>
                )}

                {/* Read More Button */}
                <div
                    className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-black/30 backdrop-blur-sm border border-white/20 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    aria-hidden="true"
                >
                    <ArrowRight className="size-4" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <time dateTime={post.uploadDate}>
                            {new Date(post.uploadDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>
                    </span>
                    <span className="w-px h-3 bg-border" aria-hidden="true" />
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                        {post.readTime}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold leading-snug line-clamp-2 transition-colors duration-200 text-text-primary group-hover:text-accent">
                    <span className="hover:underline">{post.title}</span>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-divider" />

                {/* Author */}
                <div className="flex items-center gap-2.5">
                    <div className="relative size-7 rounded-full overflow-hidden no-scrollbar border border-border shrink-0">
                        <Image
                            src={post.author.avatar || "/svg/placeholder.svg"}
                            alt={`Author: ${post.author.name}`}
                            width={35}
                            height={35}
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>
                    <p className="text-xs font-medium text-foreground">
                        {post.author.name}
                    </p>
                </div>
            </div>
        </Link>
    )
}