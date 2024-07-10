package com.lydia.lakeSidehotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    // 使用 @Lob 注解来处理大型对象，大型对象：二进制数据Blob、文本数据Clob
    @Lob
    private Blob photo;
    // 这里要关联到booking的数据，通过mappedBy关联到room，关联模式为OneToMany
    @OneToMany(mappedBy = "room",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        // 初始化关联的bookings数组
        this.bookings = new ArrayList<>();
    }

    // 这里要添加booking数据到room中
    public void addBooking(BookedRoom booking){
        if (bookings == null){
            bookings = new ArrayList<>();
        }
        bookings.add(booking);

        // 这里要关联对应的room数据到booking模型上
        booking.setRoom(this);

        // 如果这里有添加任何booking数据的话，证明这个房间是被book了
        isBooked = true;

        // 生成一个随机数为booking code，然后设置到booking的模型上
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);

        // 不明白为什么关于booking的一堆业务逻辑要在这里处理，而不是在外面其他的地方处理
    }
}
