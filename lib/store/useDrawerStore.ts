import { create } from "zustand"
import { devtools } from "zustand/middleware"

// ── Panel registry ────────────────────────────────────────────────
export const PANELS = ["menu", "cart", "filter", "search"] as const

export type Panel = (typeof PANELS)[number]

// ── State ─────────────────────────────────────────────────────────

type UIState = {
    open: Record<Panel, boolean>
}

// ── Actions ───────────────────────────────────────────────────────

type UIActions = {
    /** Open a panel. All other panels close first. */
    openPanel: (panel: Panel) => void
    /** Close a specific panel. */
    closePanel: (panel: Panel) => void
    /** Toggle a panel. Opening closes all others. */
    togglePanel: (panel: Panel) => void
    /** Close every open panel (route change, ESC key, backdrop click). */
    closeAll: () => void
}

// ── Defaults ──────────────────────────────────────────────────────

const CLOSED = Object.fromEntries(PANELS.map((p) => [p, false])) as Record<Panel, boolean>

// ── Scroll lock ───────────────────────────────────────────────────

function setBodyScroll(openMap: Record<Panel, boolean>) {
    if (typeof document === "undefined") return
    const anyOpen = Object.values(openMap).some(Boolean)
    document.body.style.overflow = anyOpen ? "hidden" : ""
}

// ── Store ─────────────────────────────────────────────────────────

export const useUIStore = create<UIState & UIActions>()(
    devtools(
        (set) => ({
            open: { ...CLOSED },

            openPanel: (panel) =>
                set(
                    (s) => {
                        if (s.open[panel]) return s // already open — no-op
                        const next = { ...CLOSED, [panel]: true }
                        setBodyScroll(next)
                        return { open: next }
                    },
                    false,
                    `ui/open:${panel}`,
                ),

            closePanel: (panel) =>
                set(
                    (s) => {
                        if (!s.open[panel]) return s // already closed — no-op
                        const next = { ...s.open, [panel]: false }
                        setBodyScroll(next)
                        return { open: next }
                    },
                    false,
                    `ui/close:${panel}`,
                ),

            togglePanel: (panel) =>
                set(
                    (s) => {
                        const next = s.open[panel]
                            ? { ...s.open, [panel]: false }    // was open  → just close it
                            : { ...CLOSED, [panel]: true }     // was closed → close all, open it
                        setBodyScroll(next)
                        return { open: next }
                    },
                    false,
                    `ui/toggle:${panel}`,
                ),

            closeAll: () =>
                set(
                    () => {
                        setBodyScroll(CLOSED)
                        return { open: { ...CLOSED } }
                    },
                    false,
                    "ui/closeAll",
                ),
        }),
        {
            name: "ui-store",
            enabled: process.env.NODE_ENV === "development",
        },
    ),
)

// ─────────────────────────────────────────────────────────────────
// Public hooks
// Each hook subscribes to exactly ONE boolean — surgical re-renders.
// ─────────────────────────────────────────────────────────────────

function usePanelState(panel: Panel) {
    const isOpen = useUIStore((s) => s.open[panel])
    const openFn = useUIStore((s) => s.openPanel)
    const closeFn = useUIStore((s) => s.closePanel)
    const toggleFn = useUIStore((s) => s.togglePanel)

    return {
        isOpen,
        open: () => openFn(panel),
        close: () => closeFn(panel),
        toggle: () => toggleFn(panel),
    } as const
}

export const useMenuDrawer = () => usePanelState("menu")
export const useCartDrawer = () => usePanelState("cart")
export const useFilterDrawer = () => usePanelState("filter")
export const useSearchModal = () => usePanelState("search")

/** true if ANY panel is open — use for backdrop / overlay rendering */
export const useAnyPanelOpen = () =>
    useUIStore((s) => PANELS.some((p) => s.open[p]))

/** Stable closeAll reference — no re-renders on panel state changes */
export const useCloseAll = () => useUIStore((s) => s.closeAll)