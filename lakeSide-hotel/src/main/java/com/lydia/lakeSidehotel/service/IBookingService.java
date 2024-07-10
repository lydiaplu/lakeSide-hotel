package com.lydia.lakeSidehotel.service;

import com.lydia.lakeSidehotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookings();
    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
    String saveBooking(Long roomId, BookedRoom bookingRequest);
    BookedRoom findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> getBookingsByUserEmail(String email);
    void cancelBooking(Long bookingId);
}
