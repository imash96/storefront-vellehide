'use client';

import { useState } from 'react';

export interface ShareButtonsProps {
    url: string;
    title?: string;
    description?: string;
    hashtags?: string[];
    variant?: 'buttons' | 'icons' | 'dropdown';
    platforms?: Array<'facebook' | 'twitter' | 'pinterest' | 'whatsapp' | 'email' | 'copy'>;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
    url,
    title = '',
    description = '',
    hashtags = [],
    variant = 'icons',
    platforms = ['facebook', 'twitter', 'pinterest', 'email', 'copy'],
    size = 'md',
    className = '',
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [copied, setCopied] = useState(false);

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const shareLinks = {
        facebook: {
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            label: 'Share on Facebook',
            color: 'bg-[#1877F2] hover:bg-[#166FE5]',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        twitter: {
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}${hashtags.length ? '&hashtags=' + hashtags.join(',') : ''}`,
            label: 'Share on Twitter',
            color: 'bg-[#1DA1F2] hover:bg-[#1A94DA]',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
        },
        pinterest: {
            url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description || title)}`,
            label: 'Share on Pinterest',
            color: 'bg-[#E60023] hover:bg-[#D50020]',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
            ),
        },
        whatsapp: {
            url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
            label: 'Share on WhatsApp',
            color: 'bg-[#25D366] hover:bg-[#20BD5A]',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
        email: {
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
            label: 'Share via Email',
            color: 'bg-text-secondary hover:bg-text-primary',
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
        },
        copy: {
            url: '',
            label: copied ? 'Copied!' : 'Copy Link',
            color: 'bg-text-secondary hover:bg-text-primary',
            icon: copied ? (
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            ),
        },
    };

    const handleShare = (platform: string) => {
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            const link = shareLinks[platform as keyof typeof shareLinks];
            if (link) {
                window.open(link.url, '_blank', 'noopener,noreferrer,width=600,height=600');
            }
        }
        setShowDropdown(false);
    };

    if (variant === 'dropdown') {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`
                        flex items-center gap-2 px-4 py-2
                        rounded-lg border border-border
                        bg-surface text-text-primary
                        hover:bg-muted transition-colors
                    `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Share</span>
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50">
                        {platforms.map((platform) => {
                            const link = shareLinks[platform];
                            return (
                                <button
                                    key={platform}
                                    onClick={() => handleShare(platform)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-text-primary hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                                >
                                    <span className="w-5 h-5">{link.icon}</span>
                                    <span className="text-sm">{link.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {platforms.map((platform) => {
                const link = shareLinks[platform];

                if (variant === 'buttons') {
                    return (
                        <button
                            key={platform}
                            onClick={() => handleShare(platform)}
                            className={`
                                flex items-center gap-2 px-4 py-2
                                rounded-lg text-white font-medium
                                transition-colors
                                ${link.color}
                            `}
                        >
                            <span className={iconSizeClasses[size]}>{link.icon}</span>
                            <span className="text-sm">{link.label}</span>
                        </button>
                    );
                }

                // Icons variant
                return (
                    <button
                        key={platform}
                        onClick={() => handleShare(platform)}
                        className={`
                            flex items-center justify-center
                            rounded-full text-white
                            transition-all active:scale-95
                            ${link.color}
                            ${sizeClasses[size]}
                        `}
                        title={link.label}
                        aria-label={link.label}
                    >
                        <span className={iconSizeClasses[size]}>{link.icon}</span>
                    </button>
                );
            })}
        </div>
    );
};