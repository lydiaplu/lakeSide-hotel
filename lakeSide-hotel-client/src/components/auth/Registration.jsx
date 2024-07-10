import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/ApiFunction'

export default function Registration() {
    const navigate = useNavigate()
    const registrationInfo = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
    }
    const [registration, setRegistration] = useState(registrationInfo)

    console.log("registration: ", registration);

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleRegistration = async (event) => {
        event.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration(registrationInfo)
            navigate("/login", { replace: true })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Registration error : ${error.message}`)
        }

        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    const handleInputChange = (event) => {
        setRegistration({ ...registration, [event.target.name]: event.target.value })
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">
                        first Name
                    </label>

                    <div className='col-sm-10'>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className='form-control'
                            value={registration.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">
                        Last Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={registration.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={registration.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
                        Register
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </div>

            </form>
        </section>
    )
}
