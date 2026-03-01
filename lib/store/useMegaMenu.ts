import { create } from 'zustand'

type MegaMenu = {
    activeMenu: string | null
    closeTimer: ReturnType<typeof setTimeout> | null
    setActiveMenu: (name: string | null) => void
    scheduleClose: () => void
    cancelClose: () => void
    openMenu: (name: string) => void
}

export const useMegaMenu = create<MegaMenu>((set, get) => ({
    activeMenu: null,
    closeTimer: null,
    setActiveMenu: (name) => set({ activeMenu: name }),
    scheduleClose: () => {
        const existingTimer = get().closeTimer
        if (existingTimer) clearTimeout(existingTimer)

        const timer = setTimeout(() => {
            set({ activeMenu: null, closeTimer: null })
        }, 130)

        set({ closeTimer: timer })
    },
    cancelClose: () => {
        const timer = get().closeTimer
        if (timer) {
            clearTimeout(timer)
            set({ closeTimer: null })
        }
    },
    openMenu: (name) => {
        const timer = get().closeTimer
        if (timer) {
            clearTimeout(timer)
            set({
                closeTimer: null,
                activeMenu: name
            })
        }

    }
}))