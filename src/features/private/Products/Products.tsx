import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "./interfaces/Product";
import { ENV } from "../../../config/env";
import { useFetch } from "../../../hooks/useFetch";


export const Products = () => {
    const { data } = useFetch<Product[]>({
        url: `${ENV.API_PRODUCTS}/products`,
        page: "1",
    });

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const filtered = useMemo(() => {
        const list = data ?? [];
        if (!query.trim()) return list;
        const q = query.toLowerCase();
        return list.filter((p) => p.title.toLowerCase().includes(q));
    }, [data, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const start = (page - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    const windowSize = 5;
    let wStart = Math.max(1, page - Math.floor(windowSize / 2));
    let wEnd = wStart + windowSize - 1;
    if (wEnd > totalPages) {
        wEnd = totalPages;
        wStart = Math.max(1, wEnd - windowSize + 1);
    }
    const visiblePages = Array.from({ length: wEnd - wStart + 1 }, (_, i) => wStart + i);

    return (
        <div className="container py-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h4 mb-0">Productos</h1>
                <div className="w-50">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Buscar por nombre…"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                    />
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
                {pageItems.map((p) => (
                    <div className="col" key={p.id}>
                        <div className="card h-100">
                            <img src={p.image} alt={p.title} className="card-img-top p-3" style={{ height: 180, objectFit: "contain" }} />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title mb-2 text-truncate" title={p.title}>{p.title}</h6>
                                <p className="mb-2 text-muted small">{p.category}</p>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <span className="fw-semibold">${p.price.toFixed(2)}</span>
                                    <Link className="btn btn-sm btn-primary" to={`/private/product/${p.id}`}>
                                        Ver detalle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {pageItems.length === 0 && (
                    <div className="col-12">
                        <div className="alert alert-warning mb-0">No se encontraron productos.</div>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPage(Math.max(1, page - 1))}>
                                    Anterior
                                </button>
                            </li>

                            {visiblePages.map((n) => (
                                <li key={n} className={`page-item ${n === page ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setPage(n)}>
                                        {n}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPage(Math.min(totalPages, page + 1))}>
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};
