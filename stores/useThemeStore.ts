import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const themeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () =>
                set((prev) => ({
                    theme: prev.theme === "dark" ? "light" : "dark",
                })),
        }),
        {
            name: "theme-storage",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);

export const toggleTheme = () => themeStore.getState().toggleTheme();

export const getTheme = () => themeStore((s) => s.theme);
