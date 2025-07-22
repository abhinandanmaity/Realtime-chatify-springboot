package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.Payload.EditGroupRequestDto;
import com.RealtimeChatify.App.Payload.RoomDto;
import com.RealtimeChatify.App.entities.MessageEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin(origins = "https://realtime-chatify.netlify.app") // Allow requests from React app
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Get all conversations
    @GetMapping("/conversations")
    public ResponseEntity<List<RoomEntity>> getAllConversation() {
        List<RoomEntity> rooms = roomService.getAllConversation();
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no rooms found
        }
        return ResponseEntity.ok(rooms); // 200 OK with the list of rooms
    }

    // Get rooms by user ID
    @GetMapping("/user/{userid}")
    public ResponseEntity<Map<String, List<RoomDto>>> getRoomByUserid(@PathVariable int userid) {
        Map<String, List<RoomDto>> rooms = roomService.getRoomByUserid(userid);
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no rooms found
        }
        return ResponseEntity.ok(rooms); // 200 OK with the list of rooms
    }

    // Get conversation by room ID
    @GetMapping("/conversation/{roomid}")
    public ResponseEntity<Set<MessageEntity>> getConversationById(@PathVariable int roomid) {
        Set<MessageEntity> messages = roomService.getConversationById(roomid);
        if (messages.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no messages found
        }
        return ResponseEntity.ok(messages); // 200 OK with the list of messages
    }

    // Get conversations for a specific user by user ID
    @GetMapping("/user/{id}/conversations")
    public ResponseEntity<List<RoomEntity>> getConversationByUserId(@PathVariable int id) {
        List<RoomEntity> rooms = roomService.getConversationByUserId(id);
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no rooms found
        }
        return ResponseEntity.ok(rooms); // 200 OK with the list of rooms
    }

    // Get room by room ID
    @GetMapping("room/{id}")
    public ResponseEntity<RoomEntity> getRoomById(@PathVariable int id) {

        System.out.println("getRoom "+ id);
        RoomEntity room = roomService.getRoomById(id);
        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found if room not found
        }
        return ResponseEntity.ok(room); // 200 OK with the room data
    }

    // Add a new room
    @PostMapping("/add-room")
    public ResponseEntity<RoomEntity> addRoom(@RequestBody RoomEntity conversation) {
        try {
            roomService.addRoom(conversation);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversation); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }

    // Add a new group room
    @PostMapping("/add-group-room/{groupname}")
    public ResponseEntity<RoomEntity> addGroupRoom(@RequestBody List<Integer> participants, @PathVariable String groupname) {
        try {
            System.out.println(participants);
            System.out.println(groupname);
            RoomEntity conversation = roomService.addGroupRoom(participants, groupname);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversation); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }

    // modify the group profile
    @PutMapping("/group/edit/{roomid}")
    public ResponseEntity<RoomDto> EditGroupRoom(@RequestBody EditGroupRequestDto editroom, @PathVariable int roomid) {
        try {
            RoomDto conversation = roomService.EditGroupRoom(editroom, roomid);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversation); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }
    // modify the group profile
    @PutMapping("/group/exit/{roomid}/{userid}")
    public ResponseEntity<RoomDto> ExitGroupRoom(@PathVariable int roomid, @PathVariable int userid) {
        try {
            RoomDto conversation = roomService.ExitGroupRoom(roomid, userid);
            return ResponseEntity.status(HttpStatus.OK).body(conversation); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }

    // modify the group profile
    @DeleteMapping("/group/delete/{roomid}")
    public ResponseEntity<RoomEntity> DeleteGroupRoom(@RequestBody @PathVariable int roomid) {
        try {
            roomService.DeleteGroupRoom(roomid);
            return ResponseEntity.status(HttpStatus.OK).body(null); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }
}
