import "./NavBar.css"
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to ="/plant-library">Plant Library</Link>
            </li>
        </ul>
    )
}