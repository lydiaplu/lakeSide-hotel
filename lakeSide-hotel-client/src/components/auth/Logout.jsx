import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from './AuthProvider'

export default function Logout() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: { message: " You have been logged out!" } })
    }

    return (
        <>
            <li>
                <Link className="dropdown-item" to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}
