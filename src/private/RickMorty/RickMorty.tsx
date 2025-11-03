import { useState } from "react";
import type { ApiResponse } from "./interfaces";
import { useFetch } from "../../hooks/useFetch";
import { Table } from "./components/table/Table";
import { ENV } from "../../config/env";

export const RickMorty = () => {
    const [page, setPage] = useState(1);

    const { data } = useFetch<ApiResponse>({
        url: `${ENV.API_RM}/character/`,
        page: String(page),
    });

    const totalPages = data?.info.pages ?? 1;

    return (
        <>
            {data ? (
                <Table
                    data={data.results}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
            ) : (
                <p className="text-center">Cargando…</p>
            )}
        </>
    );
};
