import { create } from "zustand";
import { AccountResType } from "@/schemaValidations/auth.schema";

type UserState = {
    user: AccountResType["data"]["account"] | null;
    setUser: (user: AccountResType["data"]["account"] | null) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
