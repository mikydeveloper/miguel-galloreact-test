import z from "zod";

export const onlyLetters = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

export const productSchema = z.object({
    title: z.string().min(1, "Requerido").regex(onlyLetters, "Solo letras"),
    price: z
        .string()
        .min(1, "Requerido")
        .regex(/^\d+(\.\d+)?$/, "Solo números (se acepta punto)"),
    description: z.string().min(1, "Requerido").regex(onlyLetters, "Solo letras"),
    image: z
        .string()
        .min(1, "Requerido")
        .url("Debe ser una URL válida (https://...)"),
});

export type FormValues = z.infer<typeof productSchema>;