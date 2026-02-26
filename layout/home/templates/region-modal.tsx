"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogTrigger,
} from "@/ui/modal";
import { createElement, useMemo, useState, useTransition } from "react"
import { X, Globe } from "lucide-react";
import { updateRegion } from "@/lib/action/cart";
import { regions } from "@/lib/constant/regions";
import Button from "@/ui/button";
import NativeSelect from "@/ui/native-select";
import Input from "@/ui/input";
import { div as Div, form as Form } from "motion/react-client"

export default function RegionModal({ countryCode }: RegionModalProps) {
    const [showModal, setShowModal] = useState(!countryCode)
    const [isPending, startTransition] = useTransition();

    // Build all countries list
    const countryOptions = useMemo(() => regions.flatMap(region =>
        region.countries.map(country => ({
            value: country.iso_2.toLowerCase(),
            label: country.display_name,
            currency: region.currency_code.toUpperCase(),
        }))
    ).sort((a, b) => a.label.localeCompare(b.label)), [])

    const current = useMemo(() => {
        const fallback = {
            value: "us",
            label: "United States",
            currency: "USD",
        }
        return countryOptions.find(o => o.value === countryCode) ?? fallback
    }, [countryOptions, countryCode])

    const [selected, setSelected] = useState<CurrentRegion>(current)

    const handleChange = (formData: FormData) => {
        const code = formData.get("code") as string
        if (!code) return

        startTransition(() => updateRegion(code))
        setShowModal(false)
    }

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
                <button
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-left hover:border hover:border-border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 min-h-11"
                    aria-haspopup="dialog"
                    aria-expanded={showModal}
                    aria-label={`Current region: ${current.label}. Click to change`}
                >
                    <CountryFlag
                        countryCode={current.value}
                        alt={current.label}
                        aria-hidden="true"
                        className="w-6 h-4"
                    />
                    <span className="text-sm font-medium">{current.label}</span>
                </button>
            </DialogTrigger>
            <DialogContent
                rounded={false}
                size="md"
                className="space-y-0"
            >
                {/* Header */}
                <DialogHeader>
                    <div className="space-y-2 pr-8">
                        <Div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Globe className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <DialogTitle className="text-foreground font-heading">
                                    Welcome to Artisan Hide
                                </DialogTitle>
                                <DialogDescription className="text-foreground-secondary font-light">
                                    Select your region for the best shopping experience
                                </DialogDescription>
                            </div>
                        </Div>
                    </div>
                    <DialogClose className="absolute top-4 right-4">
                        <X className="w-5 h-5" />
                    </DialogClose>
                </DialogHeader>

                {/* Form */}
                <Form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 px-6 py-6"
                    action={handleChange}
                >
                    {/* Country Selection */}
                    <NativeSelect
                        label="COUNTRY / REGION"
                        name="code"
                        options={countryOptions}
                        defaultValue={selected.value}
                        autoFocus
                        required
                        onChange={(e) => {
                            const selected = countryOptions.find(o => o.value === e.currentTarget.value)
                            if (selected) setSelected(selected)
                        }}
                        aria-label="Select your country or region"
                    />

                    {/* Currency Display */}
                    <Input
                        label="CURRENCY"
                        value={selected.currency}
                        disabled
                        aria-label="Currency (read-only)"
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            isLoading={isPending}
                            disabled={isPending}
                            fullWidth
                            size="lg"
                            className="uppercase tracking-wide"
                        >
                            {isPending ? 'Updating...' : 'Confirm Selection'}
                        </Button>
                    </div>

                    {/* Helper Text */}
                    <p className="text-xs text-foreground-tertiary text-center leading-relaxed">
                        This will set your preferred currency and shipping options
                    </p>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

// ==================== COUNTRY FLAG COMPONENT ====================

const CountryFlag = ({
    countryCode,
    alt,
    className = "w-5",
    ...props
}: CountryFlagProps) => {
    const flagUrl = `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${countryCode?.toLowerCase()}.svg`

    return createElement("img", {
        src: flagUrl,
        alt,
        className: `inline-block align-middle h-auto rounded-sm ${className ?? ""}`,
        loading: "lazy",
        ...props,
    })
}

// ==================== TYPES ====================

type CountryFlagProps = React.ComponentPropsWithoutRef<"img"> & {
    countryCode?: string
}

type RegionModalProps = {
    className?: string
    countryCode?: string
}

type CurrentRegion = {
    value: string
    label: string
    currency: string
}