import Placeholder from "@/icon/img-placeholder";
import { StoreProductImage } from "@medusajs/types";

type ProductThumbnailProps = {
    src?: string | StoreProductImage[] | null;
} & Omit<React.ComponentPropsWithoutRef<"img">, 'src'>

export default function ProductThumbnail({ src, alt = "Product image", className = "", children, }: ProductThumbnailProps) {
    const hasMultipleImages = Array.isArray(src) && src.length > 1;
    const primaryUrl = (Array.isArray(src) ? src[0]?.url : src) || "/svg/placeholder.svg";
    const secondaryUrl = hasMultipleImages ? src[1]?.url || "/svg/placeholder.svg" : null;

    return (
        <div
            className={`relative w-full aspect-3/4 bg-white overflow-hidden border border-border ${className}`}
        >
            {!src ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Placeholder className="w-12 h-12 opacity-30" />
                </div>
            ) : (
                <>
                    {/* Primary image */}
                    <img
                        src={primaryUrl}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 ease-out ${hasMultipleImages && "group-hover:opacity-0 group-hover:scale-105"}`}
                    />
                    {/* Secondary image (swap on hover) */}
                    {secondaryUrl && (
                        <img
                            src={secondaryUrl}
                            alt={`${alt} — alternate view`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-500 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
                        />
                    )}
                </>
            )}
            {children}
        </div>
    );
}