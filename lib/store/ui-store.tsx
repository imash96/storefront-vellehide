/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ui-store.ts — Cordova UI State Store
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages all overlay UI panels: menu drawer, cart drawer, filter drawer,
 * and search modal.
 *
 * Design decisions:
 * • Single store — all panels share one Zustand slice so they can coordinate
 *   (e.g. opening one closes all others — prevents layered open panels).
 * • Selector hooks per panel — components subscribe only to what they need,
 *   preventing unnecessary re-renders.
 * • Stable action refs — actions are defined outside subscribed state so they
 *   never change identity between renders (no useCallback needed at call sites).
 * • Body scroll lock — toggled automatically when any panel is open.
 * • SSR-safe — all store reads are guarded against server-side rendering.
 *
 * Usage:
 *   const { isOpen, open, close, toggle } = useMenuDrawer()
 *   const { isOpen, open, close, toggle } = useCartDrawer()
 *   const { isOpen, open, close, toggle } = useFilterDrawer()
 *   const { isOpen, open, close, toggle } = useSearchModal()
 *   const closeAll = useCloseAllPanels()
 *   const anyOpen  = useAnyPanelOpen()
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"

// ─── Panel names ──────────────────────────────────────────────────────────────

export type PanelName = "menu" | "cart" | "filter" | "search"

// ─── State shape ──────────────────────────────────────────────────────────────

type PanelState = {
    /** Which panels are currently open */
    openPanels: Record<PanelName, boolean>
}

// ─── Action shape ─────────────────────────────────────────────────────────────

type PanelActions = {
    /** Open a specific panel. Closes all other panels first (single-panel rule). */
    openPanel: (panel: PanelName) => void

    /** Close a specific panel. */
    closePanel: (panel: PanelName) => void

    /** Toggle a specific panel. Closes others when opening. */
    togglePanel: (panel: PanelName) => void

    /** Close every open panel at once (e.g. route change, ESC key). */
    closeAll: () => void
}

type UIStore = PanelState & PanelActions

// ─── Default state ────────────────────────────────────────────────────────────

const DEFAULT_PANELS: Record<PanelName, boolean> = {
    menu: false,
    cart: false,
    filter: false,
    search: false,
}

// ─── Body scroll lock helper ──────────────────────────────────────────────────

function syncBodyScroll(openPanels: Record<PanelName, boolean>) {
    if (typeof document === "undefined") return
    const anyOpen = Object.values(openPanels).some(Boolean)
    document.body.style.overflow = anyOpen ? "hidden" : ""
}

// ─── Store ────────────────────────────────────────────────────────────────────

const useUIStore = create<UIStore>()(
    devtools(
        (set) => ({
            // ── Initial state ──────────────────────────────────────────────────
            openPanels: { ...DEFAULT_PANELS },

            // ── openPanel ─────────────────────────────────────────────────────
            // Enforces the "only one panel open at a time" rule.
            openPanel: (panel) =>
                set(
                    (state) => {
                        // If already open, no-op to prevent redundant re-renders
                        if (state.openPanels[panel]) return state

                        const next: Record<PanelName, boolean> = {
                            ...DEFAULT_PANELS,
                            [panel]: true,
                        }
                        syncBodyScroll(next)
                        return { openPanels: next }
                    },
                    false,
                    `openPanel/${panel}`
                ),

            // ── closePanel ────────────────────────────────────────────────────
            closePanel: (panel) =>
                set(
                    (state) => {
                        // If already closed, no-op
                        if (!state.openPanels[panel]) return state

                        const next = { ...state.openPanels, [panel]: false }
                        syncBodyScroll(next)
                        return { openPanels: next }
                    },
                    false,
                    `closePanel/${panel}`
                ),

            // ── togglePanel ───────────────────────────────────────────────────
            togglePanel: (panel) =>
                set(
                    (state) => {
                        const isCurrentlyOpen = state.openPanels[panel]
                        // Closing: just close that panel, leave others as-is
                        // Opening: close all others first (single-panel rule)
                        const next: Record<PanelName, boolean> = isCurrentlyOpen
                            ? { ...state.openPanels, [panel]: false }
                            : { ...DEFAULT_PANELS, [panel]: true }

                        syncBodyScroll(next)
                        return { openPanels: next }
                    },
                    false,
                    `togglePanel/${panel}`
                ),

            // ── closeAll ──────────────────────────────────────────────────────
            closeAll: () =>
                set(
                    () => {
                        syncBodyScroll(DEFAULT_PANELS)
                        return { openPanels: { ...DEFAULT_PANELS } }
                    },
                    false,
                    "closeAll"
                ),
        }),
        { name: "cordova/ui-store", enabled: process.env.NODE_ENV === "development" }
    )
)

// ─────────────────────────────────────────────────────────────────────────────
// Public selector hooks
// Each hook returns a stable object specific to one panel.
// Components only re-render when their own panel's state changes.
// ─────────────────────────────────────────────────────────────────────────────

/** Returns open state + actions scoped to the menu drawer. */
export function useMenuDrawer() {
    const isOpen = useUIStore((s) => s.openPanels.menu)
    const open = useUIStore((s) => s.openPanel)
    const close = useUIStore((s) => s.closePanel)
    const toggle = useUIStore((s) => s.togglePanel)

    return {
        isOpen,
        open: () => open("menu"),
        close: () => close("menu"),
        toggle: () => toggle("menu"),
    } as const
}

/** Returns open state + actions scoped to the cart drawer. */
export function useCartDrawer() {
    const isOpen = useUIStore((s) => s.openPanels.cart)
    const open = useUIStore((s) => s.openPanel)
    const close = useUIStore((s) => s.closePanel)
    const toggle = useUIStore((s) => s.togglePanel)

    return {
        isOpen,
        open: () => open("cart"),
        close: () => close("cart"),
        toggle: () => toggle("cart"),
    } as const
}

/** Returns open state + actions scoped to the filter drawer. */
export function useFilterDrawer() {
    const isOpen = useUIStore((s) => s.openPanels.filter)
    const open = useUIStore((s) => s.openPanel)
    const close = useUIStore((s) => s.closePanel)
    const toggle = useUIStore((s) => s.togglePanel)

    return {
        isOpen,
        open: () => open("filter"),
        close: () => close("filter"),
        toggle: () => toggle("filter"),
    } as const
}

/** Returns open state + actions scoped to the search modal. */
export function useSearchModal() {
    const isOpen = useUIStore((s) => s.openPanels.search)
    const open = useUIStore((s) => s.openPanel)
    const close = useUIStore((s) => s.closePanel)
    const toggle = useUIStore((s) => s.togglePanel)

    return {
        isOpen,
        open: () => open("search"),
        close: () => close("search"),
        toggle: () => toggle("search"),
    } as const
}

/** Returns a single `closeAll` function — stable reference, no re-renders. */
export function useCloseAllPanels() {
    return useUIStore((s) => s.closeAll)
}

/** Returns true if ANY panel is currently open. Useful for backdrop/overlay. */
export function useAnyPanelOpen() {
    return useUIStore((s) => Object.values(s.openPanels).some(Boolean))
}

/**
 * Low-level escape hatch — use only when you need simultaneous access to
 * multiple panels in one component (e.g. a top nav that shows all states).
 * Prefer the panel-specific hooks above to minimise re-renders.
 */
export { useUIStore }