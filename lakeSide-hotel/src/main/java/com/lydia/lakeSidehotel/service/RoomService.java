package com.lydia.lakeSidehotel.service;

import com.lydia.lakeSidehotel.exception.InternalServerException;
import com.lydia.lakeSidehotel.exception.ResourceNotFoundException;
import com.lydia.lakeSidehotel.model.Room;
import com.lydia.lakeSidehotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    private final RoomRepository roomRepository;

    // MultipartFile 接口是为处理 HTTP 请求中的文件上传（通常是通过 multipart/form-data 类型的表单）而设计的
    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        // 实例化Room model
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        // 设置图片
        if (!photo.isEmpty()) {
            // 将原始格式转换为可存储在数据库中的格式
            // 将MultipartFile的photo转换为byte[]格式
            byte[] photoByes = photo.getBytes();
            // SerialBlob将byte[]转换为 Blob 对象
            Blob photoBlob = new SerialBlob(photoByes);
            room.setPhoto(photoBlob);
        }
        // 保存后，返回一个room实体
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // 需要单独从数据库中取一次photo
    // 与controller的交互，使用byte[]格式
    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        // 根据id获取对应room数据，根据repository获取到的数据为room的模型
        Optional<Room> theRoom = roomRepository.findById(roomId);
        // 如果获取的room为kong，则抛出错误
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }

        // 从room实体中取到的photo为Blog类型
        Blob photoBlob = theRoom.get().getPhoto();
        if (photoBlob != null) {
            // 使用Blob的getBytes方法，将Blob转换为byte[]
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isPresent()) {
            roomRepository.deleteById(roomId);
        }
    }


    // 这里更新数据，不更新booking
    // 为什么update使用的是Byte[]格式
    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        // 根据id获取到对应room实体的数据
        Room room = roomRepository.findById(roomId).get();
        // 设置新的数据
        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                // 使用SerialBlob将byte[]转换为Blob
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Fail updating room");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        // 这里使用repository查询到room的实体，然后转换为Optional对象
        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }
}
