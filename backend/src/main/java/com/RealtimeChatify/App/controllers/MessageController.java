package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.Payload.messageDto;
import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.MessageEntity;
import com.RealtimeChatify.App.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;
//
//    @GetMapping("")
//    public List<MessageEntity> getAllMessage() {
//
//        return messageService.getAllMessage();
//    }
//
//    // remove this  method or only for admins
//    @GetMapping("/{id}")
//    public MessageEntity getMessage(@PathVariable int id) {
//
//        return messageService.getMessageByMessegeId(id);
//    }
//
//    @GetMapping("conversation/{roomId}")
//    public List<MessageEntity> getMessageByConversationId(@PathVariable int roomId){
//
//        return messageService.getMsgByRoomId(roomId);
//    }
//
////    @GetMapping("conversation/{roomId}/{userId}")
////    public List<MessageEntity> getMessageByUserId(@PathVariable int roomId,@PathVariable int userId){
////
////        return messageService.getMsgByUserId(roomId, userId);
////    }
//
//    @PostMapping("add-message/{roomId}/{userId}")
//    public MessageEntity addMessage(@PathVariable int roomId, @RequestBody MessageEntity message, @PathVariable int userId) {
//
//        return messageService.addMessageData(message, roomId, userId);
//    }


// Get all messages
@GetMapping("")
public ResponseEntity<List<MessageEntity>> getAllMessage() {
    List<MessageEntity> messages = messageService.getAllMessage();
    if (messages.isEmpty()) {
        return ResponseEntity.noContent().build(); // 204 No Content if no messages found
    }
    return ResponseEntity.ok(messages); // 200 OK with the list of messages
}

    // Get message by ID
    @GetMapping("/{id}")
    public ResponseEntity<MessageEntity> getMessage(@PathVariable int id) {
        MessageEntity message = messageService.getMessageByMessegeId(id);
        if (message == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found if message not found
        }
        return ResponseEntity.ok(message); // 200 OK with the message data
    }

    // Get messages by conversation ID
    @GetMapping("conversation/{roomId}")
    public ResponseEntity<List<messageDto>> getMessageByConversationId(@PathVariable int roomId) {
        List<messageDto> messages = messageService.getMsgByRoomId(roomId);
        if (messages.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no messages found
        }
        return ResponseEntity.ok(messages); // 200 OK with the list of messages
    }

    // Add a new message to a conversation
    @PostMapping("add-message/{roomId}/{userId}")
    public ResponseEntity<messageDto> addMessage(@PathVariable int roomId, @RequestBody MessageEntity message, @PathVariable int userId) {
        try {
            messageDto addedMessage = messageService.addMessageData(message, roomId, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedMessage); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }

    @PostMapping("add-message-group/{roomId}/{userId}")
    public ResponseEntity<messageDto> addMessageGroup(@PathVariable int roomId, @RequestBody GroupMessageEntity message, @PathVariable int userId) {
        try {
            messageDto addedMessage = messageService.addMessageGroup(message, roomId, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedMessage); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }

}
