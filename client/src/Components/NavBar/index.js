import { Link } from "react-router-dom";

import "./styles.scss";

export const NavBar = () => {



    return (
        <>
            <nav className="nav">
                <ul>
                    <Link to="/">
                        <li>Registrar</li>
                    </Link>
                    <Link to="/alterar">
                        <li>Alterar</li>
                    </Link>
                    <Link to="/consultapelonome">
                        <li>Consultar Por Nome</li>
                    </Link>
                    <Link to="/consultar">
                        <li>Consultar Todos</li>
                    </Link>
                </ul>
            </nav>
        </>
    )
}