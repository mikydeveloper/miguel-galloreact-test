import { Controller, type Control, type FieldError } from "react-hook-form";

interface Props {
    name: string;
    control: Control<any>,
    label: string,
    type?: string,
    error?: FieldError
}

export const InputCustom = ({ name, control, label, type, error }: Props) => {
    return (
        <div className="input-group">
            <span className="input-group-text" id="email-label">{label}</span>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) =>
                    <input id={name} type={type} {...field} className={`w-100 form-control ${error ? "is-invalid" : ""}`} />}
            />
            {error && <p className="error">{error.message}</p>}
        </div>
    )
}
