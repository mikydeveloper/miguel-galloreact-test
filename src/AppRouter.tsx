import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./public/Login/Login"
import { PrivateGuard } from "./guards/PrivateGuard"
import { NotFound } from "./public/NotFound/NotFound"
import { PrivateRouter } from "./private/PrivateRouter"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to={"/not-found"} />} />
                <Route path="/private/*" element={< PrivateGuard />} >
                    <Route path="*" element={<PrivateRouter />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}