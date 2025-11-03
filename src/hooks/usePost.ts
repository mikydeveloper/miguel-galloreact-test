import { useState } from "react";

interface PostOptions {
    headers?: HeadersInit;
}

export const usePost = <T = unknown>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const post = async (url: string, body: unknown, options?: PostOptions) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers,
                },
                body: JSON.stringify(body),
            });

            const json = await resp.json();

            if (!resp.ok) {
                throw new Error(json?.message || "Error en la petición");
            }

            setData(json);
            return json as T;
        } catch (e: any) {
            setError(e?.message ?? "Error desconocido");
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { post, data, loading, error };
}