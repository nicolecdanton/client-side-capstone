import "./NavBar.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item navbar-home">
                <Link to ="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link to ="/plant-library">Plant Library</Link>
            </li>
            <li className="navbar-item">
                <Link to ="/my-stash">My Stash</Link>
            </li>
            <li className="navbar-item">
                <Link to ="/planner">Garden Planner</Link>
            </li>
                {localStorage.getItem("garden_user") ? (
            <li className="navbar-item navbar-logout">
                    <Link
                    className="navbar-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("garden_user")
                        navigate("/", { replace: true })
                    }}
                    >
                    Logout
                    </Link>
                </li>
                ) : (
                    ""
)}
        </ul>
    )
}