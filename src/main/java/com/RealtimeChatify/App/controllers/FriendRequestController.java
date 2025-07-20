package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.services.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RequestMapping("/api/friend-requests")
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;

//    @GetMapping("/request/{userid}")
//    public List<FriendRequestEntity> getFriendByUserid(@PathVariable int userid) {
//
////        System.out.println(userid);
//        return friendRequestService.getFriendByUserid(userid);
//    }
//
//    @PostMapping("/accept/{id}/{senderid}/{recipientid}")
//    public void acceptFriendRequest(@PathVariable int id, @PathVariable int senderid,
//                                    @PathVariable int recipientid) {
//
//        friendRequestService.acceptFriendRequest(id, senderid, recipientid);
//    }
//
//    @PostMapping("/decline/{id}/{senderid}/{recipientid}")
//    public void declineFriendRequest(@PathVariable int id, @PathVariable int senderid,
//                                     @PathVariable int recipientid) {
//        // Decline friend request logic goes here
//
//        friendRequestService.declineFriendRequest(id, senderid, recipientid);
//    }
//
//    @PostMapping("/send/{senderid}/{recipientid}")
//    public void sendFriendRequest(@RequestBody FriendRequestEntity friendRequestEntity, @PathVariable int senderid,
//                                  @PathVariable int recipientid) {
////        FriendRequestEntity friendRequestEntity,
////        System.out.println("Abhinandan Maity "+ friendRequestEntity);
//        System.out.println("Abhinandan Maity "+ senderid);
//        System.out.println("Abhinandan Maity "+ recipientid);
//        friendRequestService.sendFriendRequest(friendRequestEntity, senderid, recipientid);
//
////        try {
////            ObjectMapper objectMapper = new ObjectMapper();
////            String json = objectMapper.writeValueAsString(friendRequestEntity);
////            System.out.println("Abhinandan Maity: " + json);
////        } catch (Exception e) {
////            e.printStackTrace();
////        }
//    }


    // Get friend requests by user ID
    @GetMapping("/request/{userid}")
    public ResponseEntity<List<UserReadDto>> getFriendByUserid(@PathVariable int userid) {

        List<UserReadDto> friends = friendRequestService.getFriendByUserid(userid);
        if (friends.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no friends found
        }
        return ResponseEntity.ok(friends); // 200 OK with the list of friends
    }

    // Accept friend request
    @PostMapping("/accept/{id}/{senderid}/{recipientid}")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable int id, @PathVariable int senderid,
                                                      @PathVariable int recipientid) {
        try {
            friendRequestService.acceptFriendRequest(id, senderid, recipientid);
            return ResponseEntity.ok("Friend request accepted successfully."); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to accept friend request."); // 500 Internal Server Error
        }
    }

    // Decline friend request
    @PostMapping("/decline/{id}/{senderid}/{recipientid}")
    public ResponseEntity<String> declineFriendRequest(@PathVariable int id, @PathVariable int senderid,
                                                       @PathVariable int recipientid) {
        try {
            friendRequestService.declineFriendRequest(id, senderid, recipientid);
            return ResponseEntity.ok("Friend request declined successfully."); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to decline friend request."); // 500 Internal Server Error
        }
    }

//    @PostMapping("/add/{senderid}/{recipientid}")
//    public ResponseEntity<String> sendFriendRequest_(@RequestBody FriendRequestEntity friendRequestEntity,
//                                                    @PathVariable int senderid, @PathVariable int recipientid) {
//
//        System.out.println("sendFriendRequest "+senderid);
//
//        try {
//            friendRequestService.sendFriendRequest(friendRequestEntity, senderid, recipientid);
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body("Friend request sent successfully."); // 201 Created
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to send friend request."); // 500 Internal Server Error
//        }
//    }

    // Send friend request
    @PostMapping("/send/{sender}/{recipient}")
    public ResponseEntity<String> sendFriendReq(@RequestBody FriendRequestEntity friendRequestEntity, @PathVariable int sender, @PathVariable int recipient) {

        System.out.println("FriendRequestEntity ");
        System.out.println("sendFriendRequest "+sender);

        try {
            friendRequestService.sendFriendRequest(friendRequestEntity, sender, recipient);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Friend request sent successfully."); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send friend request."); // 500 Internal Server Error
        }
    }
}
