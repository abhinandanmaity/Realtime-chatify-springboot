package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.MessageEntity;
import com.RealtimeChatify.App.services.GroupMessageService;
import com.RealtimeChatify.App.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RequestMapping("/api/groupmessages")
public class GroupMessageController {

    @Autowired
    private GroupMessageService groupMessageService;

//    @GetMapping("")
//    public List<GroupMessageEntity> getAllMessage() {
//
//        return groupMessageService.getAllMessage();
//    }
//
//    // remove this  method or only for admins
//    @GetMapping("/{id}")
//    public GroupMessageEntity getMessage(@PathVariable int id) {
//
//        return groupMessageService.getMessageByMessegeId(id);
//    }
//
//    @GetMapping("conversation/{roomId}")
//    public List<GroupMessageEntity> getMessageByConversationId(@PathVariable int roomId){
//
//        return groupMessageService.getMsgByRoomId(roomId);
//    }
//
////    @GetMapping("conversation/{roomId}/{userId}")
////    public List<MessageEntity> getMessageByUserId(@PathVariable int roomId,@PathVariable int userId){
////
////        return groupMessageService.getMsgByUserId(roomId, userId);
////    }
//
//    @PostMapping("add-groupmessage/{roomId}/{userId}")
//    public GroupMessageEntity addMessage(@PathVariable int roomId, @RequestBody GroupMessageEntity message, @PathVariable int userId) {
//
//        return groupMessageService.addMessageData(message, roomId, userId);
//    }


// Get all group messages
@GetMapping("")
public ResponseEntity<List<GroupMessageEntity>> getAllMessage() {
    List<GroupMessageEntity> messages = groupMessageService.getAllMessage();
    if (messages.isEmpty()) {
        return ResponseEntity.noContent().build(); // 204 No Content if no messages found
    }
    return ResponseEntity.ok(messages); // 200 OK with the list of messages
}

    // Get group message by ID
    @GetMapping("/{id}")
    public ResponseEntity<GroupMessageEntity> getMessage(@PathVariable int id) {
        GroupMessageEntity message = groupMessageService.getMessageByMessegeId(id);
        if (message == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found if message not found
        }
        return ResponseEntity.ok(message); // 200 OK with the message data
    }

    // Get group messages by room ID (conversation)
    @GetMapping("conversation/{roomId}")
    public ResponseEntity<List<GroupMessageEntity>> getMessageByConversationId(@PathVariable int roomId) {
        List<GroupMessageEntity> messages = groupMessageService.getMsgByRoomId(roomId);
        if (messages.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no messages found
        }
        return ResponseEntity.ok(messages); // 200 OK with the list of messages
    }

    // Add a new group message
    @PostMapping("add-groupmessage/{roomId}/{userId}")
    public ResponseEntity<GroupMessageEntity> addMessage(@PathVariable int roomId, @RequestBody GroupMessageEntity message, @PathVariable int userId) {
        try {
            GroupMessageEntity addedMessage = groupMessageService.addMessageData(message, roomId, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedMessage); // 201 Created with the added message
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }
}
