"use client"

import { useMemo, useState, useCallback, createElement } from "react";
import { X, Globe, ChevronDown, Search, Check, MapPin, ArrowRight } from "lucide-react";
import { regions } from "@/data/regions";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TYPES & HELPERS
// ═══════════════════════════════════════════════════════════════════════════

type CountryOption = {
    value: string;
    label: string;
    currency: string;
};

type RegionModalProps = {
    countryCode?: string;
    variant?: 1 | 2 | 3 | 4;
};

function CountryFlag({ countryCode, alt, className = "w-6", ...props }: React.ComponentPropsWithoutRef<"img"> & { countryCode?: string }) {
    const flagUrl = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode?.toLowerCase()}.svg`

    return createElement("img", {
        src: flagUrl,
        alt,
        className: `inline-block align-middle h-auto rounded-sm ${className ?? ""}`,
        loading: "lazy",
        ...props,
    })
}

function useCountryOptions() {
    return useMemo(
        () =>
            regions
                .flatMap((region) =>
                    region.countries.map((country) => ({
                        value: country.iso_2.toLowerCase(),
                        label: country.display_name,
                        currency: region.currency_code.toUpperCase(),
                    }))
                )
                .sort((a, b) => a.label.localeCompare(b.label)),
        []
    );
}

function useCurrentRegion(countryOptions: CountryOption[], countryCode?: string) {
    return useMemo(() => {
        const fallback = { value: "us", label: "United States", currency: "USD" };
        return countryOptions.find((o) => o.value === countryCode) ?? fallback;
    }, [countryOptions, countryCode]);
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL BACKDROP
// ═══════════════════════════════════════════════════════════════════════════

function Backdrop({ onClick }: { onClick: () => void }) {
    return (
        <div
            className="fixed inset-0 z-40 bg-overlay-heavy/80 backdrop-blur-sm"
            style={{ animation: "modal-overlay-in 0.2s ease-out" }}
            onClick={onClick}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT 1 — Classic Elegant
// Clean card dialog with refined form controls
// ═══════════════════════════════════════════════════════════════════════════

function RegionModalV1({ countryCode }: { countryCode?: string }) {
    const countryOptions = useCountryOptions();
    const current = useCurrentRegion(countryOptions, countryCode);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<CountryOption>(current);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
    };

    return (
        <>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 border border-transparent hover:border-border bg-transparent hover:bg-surface transition-all duration-300"
            >
                <CountryFlag countryCode={current.value} className="w-6 h-4 shadow-sm" />
                <span className="text-sm font-medium">{current.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Modal */}
            {isOpen && (
                <>
                    <Backdrop onClick={() => setIsOpen(false)} />
                    <div
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
                        style={{ animation: "modal-content-in 0.3s ease-out forwards" }}
                    >
                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-divider">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-5 right-5 p-2 rounded-lg text-foreground-tertiary hover:text-foreground hover:bg-muted transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary-subtle">
                                    <Globe className="w-6 h-6 text-primary" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-semibold text-foreground">
                                        Select Your Region
                                    </h2>
                                    <p className="text-sm text-foreground-secondary mt-0.5">
                                        For the best shopping experience
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                            {/* Country Select */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                                    Country / Region
                                </label>
                                <div className="relative">
                                    <select
                                        value={selected.value}
                                        onChange={(e) => {
                                            const opt = countryOptions.find((o) => o.value === e.target.value);
                                            if (opt) setSelected(opt);
                                        }}
                                        className="w-full appearance-none rounded-xl border border-input-border bg-input-background px-4 py-3.5 pr-12 text-sm text-input-text font-medium hover:border-input-border-hover focus:border-input-border-focus focus:ring-2 focus:ring-focus-ring focus:outline-none transition-all duration-200"
                                    >
                                        {countryOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-tertiary pointer-events-none" />
                                </div>
                            </div>

                            {/* Currency */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                                    Currency
                                </label>
                                <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-sunken px-4 py-3.5">
                                    <CountryFlag countryCode={selected.value} className="w-5 h-3.5" />
                                    <span className="text-sm font-medium text-foreground">{selected.currency}</span>
                                    <span className="text-xs text-foreground-tertiary ml-auto">Auto-detected</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-primary-hover active:bg-primary-active transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Confirm Selection
                            </button>

                            <p className="text-[11px] text-foreground-tertiary text-center leading-relaxed">
                                Sets your preferred currency and shipping options
                            </p>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT 2 — Search-First Modern
// Searchable list with country cards
// ═══════════════════════════════════════════════════════════════════════════

function RegionModalV2({ countryCode }: { countryCode?: string }) {
    const countryOptions = useCountryOptions();
    const current = useCurrentRegion(countryOptions, countryCode);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<CountryOption>(current);

    const filtered = useMemo(
        () => countryOptions.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())),
        [countryOptions, search]
    );

    const handleConfirm = useCallback(() => {
        setIsOpen(false);
        setSearch("");
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 border border-transparent hover:border-border transition-all duration-300"
            >
                <CountryFlag countryCode={current.value} className="w-6 h-4 shadow-sm" />
                <span className="text-sm font-medium">{current.label}</span>
                <Globe className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>

            {isOpen && (
                <>
                    <Backdrop onClick={() => { setIsOpen(false); setSearch(""); }} />
                    <div
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        style={{ animation: "modal-content-in 0.3s ease-out forwards" }}
                    >
                        {/* Header with Search */}
                        <div className="px-6 pt-6 pb-4 border-b border-divider space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
                                    <h2 className="text-lg font-heading font-semibold text-foreground">
                                        Choose Your Region
                                    </h2>
                                </div>
                                <button
                                    onClick={() => { setIsOpen(false); setSearch(""); }}
                                    className="p-2 rounded-lg text-foreground-tertiary hover:text-foreground hover:bg-muted transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
                                <input
                                    type="text"
                                    placeholder="Search countries..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-input-border bg-input-background pl-10 pr-4 py-3 text-sm text-input-text placeholder:text-input-placeholder hover:border-input-border-hover focus:border-input-border-focus focus:ring-2 focus:ring-focus-ring focus:outline-none transition-all duration-200"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Country List */}
                        <div className="flex-1 overflow-y-auto py-2 px-3 no-scrollbar" style={{ maxHeight: "320px" }}>
                            {filtered.length === 0 ? (
                                <div className="py-12 text-center text-foreground-tertiary text-sm">
                                    No countries found
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filtered.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setSelected(opt)}
                                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-200 ${selected.value === opt.value
                                                ? "bg-primary-subtle border border-primary/20 text-foreground"
                                                : "hover:bg-muted border border-transparent text-foreground-secondary hover:text-foreground"
                                                }`}
                                        >
                                            <CountryFlag countryCode={opt.value} className="w-7 h-5 rounded shadow-sm" />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-sm font-medium block truncate">{opt.label}</span>
                                                <span className="text-[11px] text-foreground-tertiary">{opt.currency}</span>
                                            </div>
                                            {selected.value === opt.value && (
                                                <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-divider bg-surface-sunken/50">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 flex items-center gap-2">
                                    <CountryFlag countryCode={selected.value} className="w-5 h-3.5" />
                                    <span className="text-sm font-medium text-foreground">{selected.label}</span>
                                    <span className="text-xs text-foreground-tertiary">· {selected.currency}</span>
                                </div>
                                <button
                                    onClick={handleConfirm}
                                    className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-all duration-200 flex items-center gap-2"
                                >
                                    Confirm
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default function RegionModal({ countryCode, variant = 1 }: RegionModalProps) {
    switch (variant) {
        case 1: return <RegionModalV1 countryCode={countryCode} />;
        case 2: return <RegionModalV2 countryCode={countryCode} />;
        default: return <RegionModalV1 countryCode={countryCode} />;
    }
}

export { RegionModalV1, RegionModalV2 };