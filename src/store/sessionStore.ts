import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const IDLE_MS = 5 * 60 * 1000; // 5 minutos de sesion

interface Session {
    user: string;
    isAuth: boolean;
    lastActive: number;
}

interface SessionStore {
    session: Session | null;
    login: (user: string) => void;
    logout: () => void;
    touch: () => void;
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            session: null,
            login: (user) =>
                set({ session: { user, isAuth: true, lastActive: Date.now() } }),
            logout: () => set({ session: null }),
            touch: () =>
                set((state) =>
                    state.session
                        ? { session: { ...state.session, lastActive: Date.now() } }
                        : state
                ),
        }),
        {
            name: "session-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
