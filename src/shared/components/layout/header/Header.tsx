import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
            <div className="container">
                <NavLink className="navbar-brand" to="/private/rick-morty">
                    Rick & Morty App
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/private/rick-morty"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                            >
                                Rick Morty
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/private/products"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                            >
                                Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/private/create-product"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                            >
                                Crear Producto
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/private/upload"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                            >
                                Upload
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
