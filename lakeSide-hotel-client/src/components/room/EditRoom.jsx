import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRoomById, updateRoom } from '../utils/ApiFunction'

export default function EditRoom() {
    const { roomId } = useParams()
    const [room, setRoom] = useState({ photo: "", roomType: "", roomPrice: "" })
    const [imageBase64Preview, setImageBase64Preview] = useState("")
    const [imageUploadPreview, setImageUploadPreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                // 这里设置base64的图片
                setImageBase64Preview(roomData.photo)
                // 隐藏upload的图片
                setImageUploadPreview("");
            } catch (error) {
                console.log(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateRoom(roomId, room)
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully!")
                setErrorMessage("")

                // 获取更新后的room
                const updateRoomData = await getRoomById(roomId)
                setRoom(updateRoomData)
                // 这里设置base64的图片
                setImageBase64Preview(updateRoomData.photo)
                // 隐藏upload的图片
                setImageUploadPreview("");
            } else {
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target
        setRoom({ ...room, [name]: value })
    }

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        // 设置upload的图片显示
        setImageUploadPreview(URL.createObjectURL(selectedImage))
        // 清空base64的图片显示
        setImageBase64Preview("")
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Room</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    {/* message */}
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label hotel-color">
                                Room Type
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='roomType'
                                name='roomType'
                                value={room.roomType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label hotel-color">
                                Room Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color">
                                Photo
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imageBase64Preview && (
                                <img
                                    src={`data:image/jpeg;base64,${imageBase64Preview}`}
                                    alt="Room preview"
                                    style={{ maxWidth: "400px", maxHeight: "400" }}
                                    className="mt-3"
                                />
                            )}
                            {imageUploadPreview && (
                                <img
                                    src={imageUploadPreview}
                                    alt="Room preview"
                                    style={{ maxWidth: "400px", maxHeight: "400" }}
                                    className="mt-3"
                                />
                            )}
                        </div>

                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                back
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
