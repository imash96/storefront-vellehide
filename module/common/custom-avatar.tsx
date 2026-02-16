'use client';

import Image from "next/image";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    shape?: 'circle' | 'square' | 'rounded';
    status?: 'online' | 'offline' | 'busy' | 'away';
    showStatus?: boolean;
    fallbackIcon?: React.ReactNode;
}

export const Avatar = ({
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    status,
    showStatus = false,
    fallbackIcon,
    className = '',
    ...props
}: AvatarProps) => {
    const sizeClasses = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-24 h-24 text-3xl',
    };

    const shapeClasses = {
        circle: 'rounded-full',
        square: '',
        rounded: 'rounded-lg',
    };

    const statusColors = {
        online: 'bg-success',
        offline: 'bg-muted',
        busy: 'bg-error',
        away: 'bg-warning',
    };

    const statusSizes = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4',
        '2xl': 'w-5 h-5',
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div
            className={`
                    relative inline-flex items-center justify-center
                    ${sizeClasses[size]}
                    ${shapeClasses[shape]}
                    overflow-hidden
                    ${className}
                `}
            {...props}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className="w-full h-full object-cover"
                />
            ) : name ? (
                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-semibold">
                    {getInitials(name)}
                </div>
            ) : fallbackIcon ? (
                <div className="w-full h-full flex items-center justify-center bg-muted text-text-secondary">
                    {fallbackIcon}
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-text-secondary">
                    <svg className="w-2/3 h-2/3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            {/* Status Indicator */}
            {showStatus && status && (
                <span
                    className={`
                            absolute bottom-0 right-0
                            ${statusSizes[size]}
                            ${statusColors[status]}
                            border-2 border-background
                            ${shape === 'circle' ? 'rounded-full' : 'rounded'}
                        `}
                />
            )}
        </div>
    );
};

Avatar.displayName = 'Avatar';

// Avatar Group (overlapping avatars)
export interface AvatarGroupProps {
    avatars: Array<{
        src?: string;
        alt?: string;
        name?: string;
    }>;
    max?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const AvatarGroup = ({
    avatars,
    max = 5,
    size = 'md',
    className = '',
}: AvatarGroupProps) => {
    const displayAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
        <div className={`flex items-center -space-x-2 ${className}`}>
            {displayAvatars.map((avatar, index) => (
                <Avatar
                    key={index}
                    src={avatar.src}
                    alt={avatar.alt}
                    name={avatar.name}
                    size={size}
                    className="ring-2 ring-background"
                />
            ))}

            {remainingCount > 0 && (
                <div
                    className={`
                        flex items-center justify-center
                        bg-muted text-text-primary
                        font-semibold text-xs
                        ring-2 ring-background
                        rounded-full
                        ${size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'}
                    `}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
};