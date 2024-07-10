import React, { useEffect, useState } from 'react'
import { getRoomType } from '../utils/ApiFunction';

function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("");

    // get all room types from server and initialize roomTypes
    useEffect(() => {
        getRoomType().then((data) => {
            setRoomTypes(data);
        })
    }, [])

    // type select change
    const selectChange = (e) => {
        if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true)
        }else {
            handleRoomInputChange(e);
        }
    }

    // new type input change
    const handleNewRoomTypeInputChange = (e)=>{
        setNewRoomType(e.target.value)
    }

    // add new type input
    const handleAddNewRoomType = () =>{
        if(newRoomType!=="") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="roomType"
                        value={newRoom.roomType}
                        onChange={selectChange}
                    >
                        <option value="">Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option value={type} key={index}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Room Type"
                                    name="newRoomType"
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button
                                    type='button'
                                    className='btn btn-hotel'
                                    onClick={handleAddNewRoomType}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector;
