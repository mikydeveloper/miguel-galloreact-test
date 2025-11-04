import React, { useMemo, useState } from "react";
import moment from "moment";
import type { Character } from "../../interfaces/Character";

interface Props {
    data: Character[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Table = ({ data, totalPages, currentPage, onPageChange }: Props) => {
    const [sortKey, setSortKey] = useState<"id" | "name" | "species" | "gender" | "created">("id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const rows = useMemo(() => {
        const sorted = [...(data ?? [])].sort((a, b) => {
            const A = sortKey === "created" ? new Date(a.created).getTime() : a[sortKey];
            const B = sortKey === "created" ? new Date(b.created).getTime() : b[sortKey];
            if (A < B) return sortDir === "asc" ? -1 : 1;
            if (A > B) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [data, sortKey, sortDir]);

    const toggleSort = (key: typeof sortKey) => {
        if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"));
        else { setSortKey(key); setSortDir("asc"); }
    };

    const windowSize = 5;
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;
    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - windowSize + 1);
    }
    const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <Th active={sortKey === "id"} dir={sortDir} onClick={() => toggleSort("id")}>ID</Th>
                            <Th active={sortKey === "name"} dir={sortDir} onClick={() => toggleSort("name")}>Nombre</Th>
                            <Th active={sortKey === "species"} dir={sortDir} onClick={() => toggleSort("species")}>Especie</Th>
                            <Th active={sortKey === "gender"} dir={sortDir} onClick={() => toggleSort("gender")}>Género</Th>
                            <th>Imagen</th>
                            <Th active={sortKey === "created"} dir={sortDir} onClick={() => toggleSort("created")}>Fecha creación</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-4">Cargando…</td></tr>
                        ) : (
                            rows.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.species}</td>
                                    <td>{c.gender}</td>
                                    <td><img src={c.image} alt={c.name} width={48} height={48} className="rounded" /></td>
                                    <td>{moment(c.created).format("DD/MM/YYYY")}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <nav>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
                                    Anterior
                                </button>
                            </li>

                            {visiblePages.map((n) => (
                                <li key={n} className={`page-item ${n === currentPage ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => onPageChange(n)}>{n}</button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};

function Th({
    children, onClick, active, dir,
}: { children: React.ReactNode; onClick: () => void; active: boolean; dir: "asc" | "desc" }) {
    return (
        <th role="button" onClick={onClick} className={active ? "text-primary" : undefined}>
            <span className="me-1">{children}</span>
            {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
        </th>
    );
}
