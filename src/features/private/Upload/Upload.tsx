import { useEffect, useRef, useState } from "react";

type ImgFile = File | null;
const ACCEPTED_MIME = ["image/png", "image/jpeg"];
const MAX_MB = 5;

export const Upload = () => {
    const [file, setFile] = useState<ImgFile>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const validate = (f: File) => {
        if (!ACCEPTED_MIME.includes(f.type)) return "Formato no permitido. Solo PNG o JPG/JPEG.";
        if (f.size > MAX_MB * 1024 * 1024) return `La imagen excede ${MAX_MB}MB.`;
        return null;
    };

    const onFiles = (files: FileList | null) => {
        setError(null);
        if (!files || files.length === 0) return;
        const f = files[0];
        const err = validate(f);
        if (err) {
            setFile(null);
            setPreview(null);
            setError(err);
            return;
        }
        setFile(f);
    };

    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onFiles(e.dataTransfer.files);
    };
    const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => e.preventDefault();

    const openFileDialog = () => inputRef.current?.click();
    const clear = () => {
        setFile(null);
        setPreview(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="container py-3">
            <h1 className="h4 mb-3">Upload</h1>

            <div
                className={`border border-2 rounded-3 p-4 text-center bg-light ${error ? "border-danger" : "border-secondary"}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={openFileDialog}
                role="button"
                style={{ cursor: "pointer" }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                    className="d-none"
                    onChange={(e) => onFiles(e.target.files)}
                />

                {!preview ? (
                    <>
                        <p className="mb-1">Arrastra una imagen aquí o <span className="text-primary text-decoration-underline">haz click</span> para seleccionar</p>
                        <small className="text-muted">Formatos: PNG, JPG/JPEG · Máx {MAX_MB}MB</small>
                    </>
                ) : (
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={preview}
                            alt="preview"
                            className="img-thumbnail mb-3"
                            style={{ maxHeight: 280, objectFit: "contain" }}
                        />
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary" onClick={openFileDialog}>
                                Cambiar imagen
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={clear}>
                                Eliminar
                            </button>
                        </div>
                        <small className="text-muted mt-2">{file?.name}</small>
                    </div>
                )}
            </div>

            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>
    );
};
