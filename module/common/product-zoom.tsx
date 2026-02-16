'use client';

import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';

export interface ImageZoomProps {
    src: string;
    alt: string;
    zoomScale?: number;
    className?: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({
    src,
    alt,
    zoomScale = 2,
    className = '',
}) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPosition({ x, y });
    };

    return (
        <div
            ref={imageRef}
            className={`relative overflow-hidden rounded-lg bg-muted cursor-zoom-in ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />

            {/* Zoomed View */}
            {isZoomed && (
                <div
                    className="absolute inset-0 bg-background"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${zoomScale * 100}%`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            )}
        </div>
    );
};

// Lens Magnifier (shows zoomed portion in a separate lens)
export interface LensMagnifierProps {
    src: string;
    alt: string;
    lensSize?: number;
    zoomLevel?: number;
    className?: string;
}

export const LensMagnifier: React.FC<LensMagnifierProps> = ({
    src,
    alt,
    lensSize = 150,
    zoomLevel = 2.5,
    className = '',
}) => {
    const [showLens, setShowLens] = useState(false);
    const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
    const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Lens position (centered on cursor)
        const lensX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
        const lensY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

        // Background position for zoomed image
        const bgX = (x / rect.width) * 100;
        const bgY = (y / rect.height) * 100;

        setLensPosition({ x: lensX, y: lensY });
        setBackgroundPosition({ x: bgX, y: bgY });
    };

    return (
        <div
            ref={imageRef}
            className={`relative overflow-hidden rounded-lg bg-muted ${className}`}
            onMouseEnter={() => setShowLens(true)}
            onMouseLeave={() => setShowLens(false)}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />

            {/* Lens */}
            {showLens && (
                <div
                    className="absolute border-2 border-primary rounded-full pointer-events-none"
                    style={{
                        width: lensSize,
                        height: lensSize,
                        left: lensPosition.x,
                        top: lensPosition.y,
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${zoomLevel * 100}%`,
                        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            )}
        </div>
    );
};

// Side-by-Side Zoom (shows zoomed image next to original)
export interface SideBySideZoomProps {
    src: string;
    alt: string;
    zoomScale?: number;
    className?: string;
}

export const SideBySideZoom: React.FC<SideBySideZoomProps> = ({
    src,
    alt,
    zoomScale = 2,
    className = '',
}) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPosition({ x, y });
    };

    return (
        <div className={`grid grid-cols-2 gap-4 ${className}`}>
            {/* Original Image */}
            <div
                ref={imageRef}
                className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-crosshair"
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />

                {/* Position Indicator */}
                <div
                    className="absolute w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                    }}
                />
            </div>

            {/* Zoomed View */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-background border border-border">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${zoomScale * 100}%`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>
        </div>
    );
};