import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RoomCard from './RoomCard'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { getAllRooms } from '../utils/ApiFunction'

export default function Room() {
    const [data, setData] = useState([{ roomType: "", roomPrice: 0, photo: null }])

    const [filteredData, setFilteredData] = useState([{ roomType: "", roomPrice: 0, photo: null }])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(6)

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        // useEffect的回调函数，不能添加async，所以只能在内部的函数中加上async
        const fetchRooms = async () => {
            setIsLoading(true);
            try {
                const result = await getAllRooms();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                setErrorMessage(error.message)
            }
            setIsLoading(false);
        }

        fetchRooms()
    }, [])


    if (isLoading) {
        return <div>Loading rooms... ...</div>
    }

    if (errorMessage) {
        return <div className='text-danger'>Error: {errorMessage}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    let totalPages = Math.ceil(filteredData.length / roomsPerPage)

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;

        const showData = filteredData
            .slice(startIndex, endIndex)
            .map((room) => <RoomCard key={room.id} room={room} />)

        return showData;
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                {/* <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col> */}
            </Row>

            <Row>{renderRooms()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}
