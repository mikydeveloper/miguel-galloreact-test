import { useParams, Link } from "react-router-dom";
import type { Product } from "./interfaces/Product";
import { ENV } from "../../../config/env";
import { useFetch } from "../../../hooks/useFetch";

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data } = useFetch<Product>({
        url: `${ENV.API_PRODUCTS}/products/${id}`,
        page: "1",
    });

    if (!data) {
        return <div className="container py-3"><p>Cargando…</p></div>;
    }

    return (
        <div className="container py-3">
            <div className="mb-3">
                <Link to="/private/products" className="btn btn-outline-secondary btn-sm">← Volver</Link>
            </div>

            <div className="row g-4">
                <div className="col-md-5">
                    <div className="card">
                        <img src={data.image} alt={data.title} className="card-img-top p-4" style={{ height: 360, objectFit: "contain" }} />
                    </div>
                </div>
                <div className="col-md-7">
                    <h2 className="h4">{data.title}</h2>
                    <p className="text-muted">{data.category}</p>
                    <h3 className="h5 text-primary">${data.price.toFixed(2)}</h3>
                    {data.rating && (
                        <p className="mb-2 small text-muted">Rating: {data.rating.rate} ({data.rating.count} reviews)</p>
                    )}
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    );
};
