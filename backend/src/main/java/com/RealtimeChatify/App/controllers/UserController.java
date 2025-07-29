package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.Payload.EditGroupRequestDto;
import com.RealtimeChatify.App.Payload.JwtDto;
import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://realtime-chatify.netlify.app") // Allow requests from React app
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public JwtDto register(@RequestBody UserEntity user) {

        return userService.register(user);
    }

    @PostMapping("/login")
    public JwtDto login(@RequestBody UserEntity user) {

        System.out.println("user "+user);
        System.out.println(user.getUsername());
        return userService.verify(user);
    }

//    @GetMapping("/getBy-name/{name}")
//    public List<UserReadDto> getUserByName(@PathVariable String name) {
//
//        return userService.usersStartsWithName(name);
//    }
//
//    @GetMapping("")
//    public List<UserEntity> getAllUser(){
//
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("user/{id}")
//    public UserEntity getUser(@PathVariable int id) {
//
//        return userService.getUserById(id);
//    }
//
//    @GetMapping("check-username/{username}")
//    public UserEntity checkUserName(@PathVariable String username) {
//
//        return userService.checkUserName(username);
//    }


    @GetMapping("/getBy-name/{name}")
    public ResponseEntity<List<UserReadDto>> getUserByName(@PathVariable String name) {
        List<UserReadDto> users = userService.usersStartsWithName(name);
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(users); // 200 OK
    }

    @GetMapping("")
    public ResponseEntity<List<UserReadDto>> getAllUser() {
        List<UserReadDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users); // 200 OK
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable int id) {
        UserEntity user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
        }
        return ResponseEntity.ok(user); // 200 OK
    }

    @GetMapping("check-username/{username}")
    public ResponseEntity<UserEntity> checkUserName(@PathVariable String username) {
        UserEntity user = userService.checkUserName(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
        }
        return ResponseEntity.ok(user); // 200 OK
    }

    // modify the user profile
    @PutMapping("/user/edit/{userid}")
    public ResponseEntity<UserEntity> EditUser(@RequestBody UserEntity user, @PathVariable int userid) {
        try {
            UserEntity u = userService.EditUser(user, userid);
            return ResponseEntity.status(HttpStatus.CREATED).body(u); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // 500 Internal Server Error
        }
    }
}
