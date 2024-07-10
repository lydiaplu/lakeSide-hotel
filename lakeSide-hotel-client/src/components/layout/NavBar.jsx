import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logout from '../auth/Logout'

export default function NavBar() {
    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick = ()=>{
        setShowAccount(!showAccount)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">

                {/* Logo */}
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">lakeSide Hotel</span>
                </Link>

                {/* 手机版的导航按钮 */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                {/* nav list */}
                <div className="collapse navbar-collapse" id="navbarScroll">

                    {/* the left nav button */}
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"} >
                                Browse all rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"} >
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    {/* the right nav button */}
                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {" "}
                                Account
                            </a>

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
