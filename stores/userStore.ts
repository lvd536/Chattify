import { IUser } from "@/types/IUser";
import { create } from "zustand";

interface UserStore {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export const userStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
}));
