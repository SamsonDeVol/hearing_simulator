/** @jsxImportSource @emotion/react */

import { NavLink } from "react-router-dom"
import './Navbar.css'
const activeStyle = {backgroundColor: "rgb(253, 210, 110)"}

function Dropdown() {
    return (
        <div className={"dropdown"}>
            <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className={"link"} to="audiogram">Audiogram</NavLink>
            <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className={"link"} to="contributors">Contributors</NavLink>
            <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className={"link"} to="sources">Sources</NavLink>
        </div>
    )
}

export default Dropdown