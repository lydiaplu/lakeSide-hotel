import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunction"


export default function Profile() {
    const auth = useAuth()
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")

    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{ id: "", name: "" }]
    })

    const [bookings, setBookings] = useState({
        id: "",
        room: { id: "", roomType: "" },
        checkInDate: "",
        checkOutDate: "",
        bookingConfirmationCode: ""
    })

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 这里token中的userId为Email
                const userData = await getUser(userId)
                setUser(userData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId)
                setBookings(response)
            } catch (error) {
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }

        fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")

        if (confirmed) {
            try {
                const response = await deleteUser()
                auth.handleLogout()
                setMessage(response.data)
                navigate("/")
            } catch (error) {
                setErrorMessage(error.data)
            }
        }
    }

    if (!user) {
        return <p>Loading user data...</p>
    }

    return (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}


            <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                <h4 className="card-title text-center">User Information</h4>
                <div className="col-md-10 mx-auto">

                    {/* user profile information */}
                    <div className="card mb-3 shadow">
                        <div className="row g-0">
                            {/* user image */}
                            <div className="col-md-2">
                                <div className="d-flex justify-content-center align-items-center mb-4">
                                    <img
                                        src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                        alt="Profile"
                                        className='rounded-circle'
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}

                                    />
                                </div>
                            </div>

                            {/* user information */}
                            <div className="col-md-10">
                                <div className="card-body">
                                    {/* user id */}
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label fw-bold">ID:</label>
                                        <div className="col-md-10">
                                            <p className="card-text">{user.id}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* user firstname */}
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label fw-bold">First Name:</label>
                                        <div className="col-md-10">
                                            <p className="card-text">{user.firstName}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* user lastname */}
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label fw-bold">Last Name:</label>
                                        <div className="col-md-10">
                                            <p className="card-text">{user.lastName}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* user email */}
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label fw-bold">Email:</label>
                                        <div className="col-md-10">
                                            <p className="card-text">{user.email}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* user roles */}
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label fw-bold">Roles:</label>
                                        <div className="col-md-10">
                                            <ul className="list-unstyled">
                                                {user.roles.map((role) => (
                                                    <li key={role.id} className="card-text">
                                                        {role.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <h4 className="card-title text-center">Booking History</h4>

                    {/* booking information */}
                    {bookings.length > 0 ? (
                        <table className="table table-bordered table-hover shadow">
                            <thead>
                                <tr>
                                    <th scope="col">Booking ID</th>
                                    <th scope="col">Room ID</th>
                                    <th scope="col">Room Type</th>
                                    <th scope="col">Check In Date</th>
                                    <th scope="col">Check Out Date</th>
                                    <th scope="col">Confirmation Code</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{booking.id}</td>
                                        <td>{booking.room.id}</td>
                                        <td>{booking.room.roomType}</td>
                                        <td>
                                            {moment(booking.checkInDate)
                                                .subtract(1, "month")
                                                .format("MMM Do, YYYY")}
                                        </td>
                                        <td>
                                            {moment(booking.checkOutDate)
                                                .subtract(1, "month")
                                                .format("MMM Do, YYYY")}
                                        </td>
                                        <td>{booking.bookingConfirmationCode}</td>
                                        <td className="text-success">On-going</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>You have not made any bookings yet.</p>
                    )}

                    {/* delete account */}
                    <div className="d-flex justify-content-center">
                        <div className="mx-2">
                            <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                                Close account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
