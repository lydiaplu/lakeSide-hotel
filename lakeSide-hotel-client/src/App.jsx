import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

import { AuthProvider } from "./components/auth/AuthProvider"

import AddRoom from "./components/room/AddRoom"
import ExistingRooms from "./components/room/ExistingRooms"
import EditRoom from "./components/room/EditRoom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Home from "./components/home/Home"
import Checkout from "./components/bookings/Checkout"
import BookingSuccess from "./components/bookings/BookingSuccess"
import FindBooking from "./components/bookings/FindBooking"
import Bookings from "./components/bookings/Bookings"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout"
import Profile from "./components/auth/Profile"
import Admin from "./components/admin/Admin"
import Registration from "./components/auth/Registration"
import RequireAuth from "./components/auth/RequireAuth"


function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            {/* room part */}
            <Route path="/" element={<Home />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route
              path="/book-room/:roomId"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            {/* booking part */}
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-fail" element={<BookingSuccess />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/existing-bookings" element={<Bookings />} />

            {/* auth part */}
            <Route path="/admin" element={<Admin />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />

          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App