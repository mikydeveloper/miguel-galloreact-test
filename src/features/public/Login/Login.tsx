import { LoginForm } from "./Login.validation"

export const Login = () => {
    return (
        <>
            <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
                <div className="d-flex flex-column w-100" style={{ maxWidth: 480 }}>
                    <LoginForm></LoginForm>
                </div>
            </div>

        </>
    )
}