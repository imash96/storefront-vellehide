import { create } from "zustand"

type DrawerType = "menu" | "cart" | 'filter' | null

type DrawerState = {
    activeDrawer: DrawerType

    open: (drawer: Exclude<DrawerType, null>) => void
    close: () => void
    toggle: (drawer: Exclude<DrawerType, null>) => void

    isOpen: (drawer: Exclude<DrawerType, null>) => boolean
}

export const useDrawerStore = create<DrawerState>((set, get) => ({
    activeDrawer: null,

    open: (drawer) =>
        set(() => ({
            activeDrawer: drawer,
        })),

    close: () =>
        set(() => ({
            activeDrawer: null,
        })),

    toggle: (drawer) => {
        const current = get().activeDrawer

        set(() => ({
            activeDrawer: current === drawer ? null : drawer,
        }))
    },

    isOpen: (drawer) => get().activeDrawer === drawer,
}))