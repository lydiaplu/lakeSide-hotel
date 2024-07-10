import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaUtensils, FaWifi, FaTv, FaWineGlassAlt, FaParking, FaCar, FaTshirt } from "react-icons/fa"

import BookingForm from './BookingForm'
import RoomCarousel from '../common/RoomCarousel'
import { getRoomById } from '../utils/ApiFunction'

export default function Checkout() {
    const { roomId } = useParams()

    const [roomInfo, setRoomInfo] = useState({ photo: "", roomType: "", roomPrice: "" })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const result = await getRoomById(roomId)
                setRoomInfo(result)
            } catch (error) {
                setError(error)
            }
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [roomId])

    if (isLoading) {
        return <p>Loading room information...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <section className='container'>
                <div className='row'>

                    <div className="room-info">
                        <img
                            src={`data:image/png;base64,${roomInfo.photo}`}
                            alt="Room photo"
                            style={{ width: "100%", height: "200px" }}
                        />
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Room Type:</th>
                                    <td>{roomInfo.roomType}</td>
                                </tr>
                                <tr>
                                    <th>Price per night:</th>
                                    <td>${roomInfo.roomPrice}</td>
                                </tr>
                                <tr>
                                    <th>Room Service:</th>
                                    <td>
                                        <ul className='list-unstyled'>
                                            <li>
                                                <FaWifi /> Wifi
                                            </li>
                                            <li>
                                                <FaTv /> Netfilx Premium
                                            </li>
                                            <li>
                                                <FaUtensils /> Breakfast
                                            </li>
                                            <li>
                                                <FaWineGlassAlt /> Mini bar refreshment
                                            </li>
                                            <li>
                                                <FaCar /> Car Service
                                            </li>
                                            <li>
                                                <FaParking /> Parking Space
                                            </li>
                                            <li>
                                                <FaTshirt /> Laundry
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='col-md-8'>
                        <BookingForm />
                    </div>
                </div>
            </section>
            <div className='container'>
                <RoomCarousel />
            </div>
        </div>
    )
}
