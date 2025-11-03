import { useEffect } from "react";
import { useSessionStore, IDLE_MS } from "../store/sessionStore";

export const useSessionGuard = () => {
    const session = useSessionStore((s) => s.session);
    const logout = useSessionStore((s) => s.logout);
    const touch = useSessionStore((s) => s.touch);

    useEffect(() => {
        if (session) {
            const elapsed = Date.now() - session.lastActive;
            if (elapsed >= IDLE_MS) {
                logout();
                return;
            }
        }

        let timer: ReturnType<typeof setTimeout> | undefined;

        const startTimer = () => {
            const s = useSessionStore.getState().session;
            if (!s) return;
            const remaining = Math.max(0, IDLE_MS - (Date.now() - s.lastActive));
            console.log(`⏳ Restante: ${(remaining / 1000).toFixed(0)}s`);
            clearTimeout(timer);
            timer = setTimeout(() => logout(), remaining);
        };

        const onUserActivity = () => {
            if (!useSessionStore.getState().session) return;
            touch();
            startTimer();
        };

        const events: Array<keyof WindowEventMap> = [
            "mousemove", "mousedown", "keydown", "touchstart", "scroll",
        ];
        events.forEach((ev) =>
            window.addEventListener(ev, onUserActivity, { passive: true })
        );

        const onVisibility = () => {
            const s = useSessionStore.getState().session;
            if (document.visibilityState === "visible") {
                if (s && Date.now() - s.lastActive >= IDLE_MS) logout();
                else startTimer();
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        startTimer();

        return () => {
            events.forEach((ev) => window.removeEventListener(ev, onUserActivity));
            clearTimeout(timer);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [logout, touch]);
};
