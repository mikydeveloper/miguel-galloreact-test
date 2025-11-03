import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type FormValues } from "./CreateProductForm";
import { usePost } from "../../hooks/usePost";
import { PRODUCT_URL } from "./CreateProduct.constants";
import type { ProductResponse } from "./CreateProduct.interface";

export const CreateProduct = () => {
    const [result, setResult] =
        useState<null | { ok: boolean; id?: number; error?: string }>(null);

    const { post, loading, error } = usePost<ProductResponse>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(productSchema) });

    const onSubmit = async (values: FormValues) => {
        try {
            setResult(null);
            const created = await post(PRODUCT_URL, {
                title: values.title,
                price: Number(values.price),
                description: values.description,
                image: values.image,
                category: "electronic",
            });
            setResult({ ok: true, id: created.id });
            reset();
        } catch (e: any) {
            setResult({ ok: false, error: e?.message ?? "Error desconocido" });
        }
    };

    return (
        <div className="container py-3">
            <h1 className="h4 mb-3">Crear producto</h1>

            {result?.ok && (
                <div className="alert alert-success">
                    Producto creado correctamente {result.id ? `(id: ${result.id})` : ""}.
                </div>
            )}
            {(result && !result.ok) && (
                <div className="alert alert-danger">No se pudo crear: {result.error}</div>
            )}
            {error && (
                <div className="alert alert-warning">Error del servidor: {error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder="Solo letras"
                        {...register("title")}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                        placeholder="Números, se acepta punto"
                        {...register("price")}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        placeholder="Solo letras"
                        {...register("description")}
                    />
                    {errors.description && (
                        <div className="invalid-feedback">{errors.description.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="text"
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        placeholder="URL de imagen (https://...)"
                        {...register("image")}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                </div>

                <div className="d-grid">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
};
