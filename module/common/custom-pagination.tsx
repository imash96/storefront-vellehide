'use client';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    getPageUrl?: (page: number) => string;
    showTotalItems?: boolean;
    totalItems?: number;
    itemsPerPage?: number;
    maxPagesToShow?: number;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showTotalItems = false,
    totalItems,
    itemsPerPage,
    maxPagesToShow = 5,
    className = '',
}: PaginationProps) {
    const getPages = () => {
        const pages: (number | 'ellipsis')[] = [];
        const halfMax = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfMax);
        let endPage = Math.min(totalPages, currentPage + halfMax);

        if (endPage - startPage < maxPagesToShow - 1) {
            if (currentPage < totalPages / 2) {
                endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
            } else {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('ellipsis');
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    const buttonClass = (isActive: boolean = false, isDisabled: boolean = false) => `
        min-w-[44px] h-10 sm:min-w-[40px] sm:h-10 px-3 sm:px-4
        flex items-center justify-center
        text-sm font-medium rounded-lg
        transition-all duration-200
        ${isDisabled
            ? 'text-text-disabled cursor-not-allowed opacity-50'
            : isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-text-primary hover:bg-muted active:scale-95'
        }
    `;

    return (
        <nav className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`} aria-label="Pagination">
            {/* Items Info */}
            {showTotalItems && totalItems !== undefined && itemsPerPage !== undefined && (
                <div className="text-xs sm:text-sm text-text-secondary order-2 sm:order-1">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={buttonClass(false, currentPage === 1)}
                    aria-label="Previous page"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span className="hidden sm:inline ml-1">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pages.map((page, index) => {
                        if (page === 'ellipsis') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={buttonClass(currentPage === page)}
                                aria-label={`Page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={buttonClass(false, currentPage === totalPages)}
                    aria-label="Next page"
                >
                    <span className="hidden sm:inline mr-1">Next</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}