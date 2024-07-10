package com.lydia.lakeSidehotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    // 这里将Blob改为String，是因为HTTP响应是基于文本的
    private String photo;
    // 这里的list使用Booking的Response
    private List<BookingResponse> bookings;

    // 这里初始化，需要id，roomType，roomPrice三个参数
    // 不明白这里为什么不要photo
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    // 这里初始化，需要处理photo数据
    // 将图片或其他二进制数据作为 byte[] 类型处理是一种常见做法
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked,
                        byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        // 将byte[]类型转换为base64编码的字符串
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
    }
}
