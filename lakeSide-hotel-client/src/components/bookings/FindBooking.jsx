import React, { useState } from 'react'
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunction"

export default function FindBooking() {
    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    const [bookingInfo, setBookingInfo] = useState(emptyBookingInfo)
    const [confirmationCode, setConfirmationCode] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)

    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)

            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async (BookingId) =>{
        try{
            await cancelBooking(BookingId)
            setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
			setError(null)
        } catch (error) {
			setError(error.message)
		}

        setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
    }

    if (isLoading) {
        return <div>Finding your booking...</div>
    }

    if (error) {
        <div className="text-danger">Error: {error}</div>
    }



    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Find My Booking</h2>

                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />
                    </div>

                    <button type="submit" className="btn btn-hotel input-group-text">
                        Find booking
                    </button>
                </form>

                {bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Room Number: {bookingInfo.room.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumOfGuests}</p>

                        {!isDeleted && (
                            <button
                                className="btn btn-danger"
                                onClick={() => handleBookingCancellation(bookingInfo.id)}>
                                Cancel Booking
                            </button>
                        )}

                    </div>
                ) : (
                    <div>find booking...</div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}