import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { InputCustom } from "../../../shared/components";
import { Navigate, useNavigate } from "react-router-dom";
import { useSessionStore } from "../../../store/sessionStore";

const loginSchema = z.object({
    email: z.email("Correo inválido").min(1, "El correo es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener minimo 6 caracteres").max(12, "La contraseña debe ser de máximo 12 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación de contraseña debe tener minimo 6 caracteres").max(12, "La contraseña debe ser de máximo 12 caracteres"),
}).refine(data => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden",
    path: ['confirmPassword']
})

type formLogin = z.infer<typeof loginSchema>

export const LoginForm = () => {
    const navigate = useNavigate();
    const login = useSessionStore(s => s.login);
    const isAuth = useSessionStore(s => !!s.session?.isAuth);

    if (isAuth) return <Navigate to="/private/rick-morty" replace />;

    const { control, handleSubmit, formState: { errors } } = useForm<formLogin>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<formLogin> = (data) => {
        login(data.email);
        navigate("/private/rick-morty", { replace: true });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-direction-column">
                <InputCustom name="email" control={control} label="Correo" type="email" error={errors.email} />
                <InputCustom name="password" control={control} label="Contraseña" type="password" error={errors.password} />
                <InputCustom name="confirmPassword" control={control} label="Confirmar contraseña" type="password" error={errors.confirmPassword} />
            </div>
            <div style={{ marginTop: 20 }}>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </div>
        </form>


    )
}