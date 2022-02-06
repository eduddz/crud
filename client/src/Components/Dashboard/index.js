import { Outlet } from "react-router-dom"
import { NavBar } from "../NavBar"

import "./styles.scss";

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <NavBar />
            <Outlet className="board" />
        </div>
    )
}