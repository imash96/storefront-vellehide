import Placeholder from "@/icon/img-placeholder";
import { StoreProductImage } from "@medusajs/types";
import Image from "next/image";

type ProductThumbnailProps = {
    src?: string | StoreProductImage[] | null
} & Omit<React.ComponentPropsWithoutRef<"img">, "src">

export default function ProductThumbnail({ src, alt = "Product image", className = "", children }: ProductThumbnailProps) {
    const images = Array.isArray(src) ? src : src ? [{ url: src }] : [{ url: "/svg/placeholder.svg" }]
    const primaryUrl = images[0]?.url
    const secondaryUrl = images[1]?.url
    const hasHover = Boolean(primaryUrl && secondaryUrl)

    return (
        <div className={`relative w-full aspect-3/4 bg-white overflow-hidden ${className}`}>
            {!primaryUrl ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Placeholder className="w-12 h-12 opacity-30" />
                </div>
            ) : (
                <>
                    {/* Primary image */}
                    <Image
                        src={primaryUrl}
                        alt={alt}
                        fill
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                        className={`object-contain object-center transition-all duration-500 ease-out ${hasHover ? "group-hover:opacity-0 group-hover:scale-103 " : ""}`}
                        loading="lazy"
                    />
                    {/* Secondary hover image */}
                    {hasHover && (
                        <Image
                            src={secondaryUrl}
                            alt={`${alt} alternate view`}
                            fill
                            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                            className="object-contain object-center transition-all duration-500 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
                            // absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100
                            loading="lazy"
                        />
                    )}
                </>
            )}
            {children}
        </div>
    );
}