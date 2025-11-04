import { Navigate, Route, Routes } from "react-router-dom"
import { RickMorty } from "./RickMorty/RickMorty"
import { Products } from "./Products/Products"
import { Upload } from "./Upload/Upload"
import { ProductDetail } from "./Products/ProductDetail"
import { CreateProduct } from "./CreateProduct/CreateProduct"
import { Header } from "../../shared/components/layout/header/Header"

export const PrivateRouter = () => {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Navigate to={"/rick-morty"} />} />
                <Route path="/rick-morty" element={<RickMorty />} />
                <Route path="/products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </>
    )
}