package com.RealtimeChatify.App.controllers;

//import com.RealtimeChatify.App.Payload.UserReadDto;
//import com.RealtimeChatify.App.services.FriendService;
import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private FriendService friendService;

    @GetMapping("/{userid}")
    public ResponseEntity<List<UserReadDto>> getFriendByUserid(@PathVariable int userid) {
        List<UserReadDto> friends = friendService.getFriendByUserId(userid);
        if (friends.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no friends found
        }
        return ResponseEntity.ok(friends); // 200 OK with the list of friends
    }

    @PostMapping("/unfriend/{userid}/{friendid}")
    public ResponseEntity<String> unfriend(@PathVariable int userid, @PathVariable int friendid) {
        try {
            friendService.unfriend(userid, friendid);
            return ResponseEntity.ok("Friend request declined successfully."); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to decline friend request."); // 500 Internal Server Error
        }
    }
}
