import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSessionStore } from "../store/sessionStore";
import { useSessionGuard } from "./useSessionGuard";

export const PrivateGuard = () => {
    const storeAny = useSessionStore as any;

    const [hydrated, setHydrated] = useState(
        storeAny.persist?.hasHydrated?.() ?? true
    );

    useSessionGuard();

    useEffect(() => {
        const u1 = storeAny.persist?.onHydrate?.(() => setHydrated(false));
        const u2 = storeAny.persist?.onFinishHydration?.(() => setHydrated(true));
        if (storeAny.persist?.hasHydrated?.()) setHydrated(true);
        return () => { u1?.(); u2?.(); };
    }, [storeAny]);

    const isAuth = useSessionStore((s) => s.session?.isAuth ?? false);

    if (!hydrated) return null;

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
