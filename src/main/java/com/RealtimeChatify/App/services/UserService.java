package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.Payload.*;
import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.exceptions.ApiException;
import com.RealtimeChatify.App.exceptions.ResourceNotFoundException;
import com.RealtimeChatify.App.repository.UserRepo;
import com.RealtimeChatify.App.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    public JwtDto register(UserEntity user) {

        String password = user.getPassword();
        UserEntity u = userRepo.findByEmail(user.getEmail());
        if(u != null){
            throw new ApiException("Email already exists");
        }
        user.setPassword(bCryptPasswordEncoder
                .encode(user.getPassword()));
        user.setJoinedOn(LocalDate.now());
        userRepo.save(user);

//        System.out.println(userEntity.getEmail());
//        System.out.println(user.getPassword());
//        System.out.println(userEntity.getPassword());

        UserEntity userEntity = userRepo.findByUsername(user.getUsername());
        if (userEntity == null) {
            throw new ResourceNotFoundException("User not found with username: " + user.getUsername());
        }

        JwtDto jwtDto = new JwtDto();
        jwtDto.setToken(jwtService.generateToken(user));
        jwtDto.setUser(new UserReadDto(userEntity.getId(), userEntity.getName(), userEntity.getUsername(),
                userEntity.getEmail(), userEntity.getImage(), userEntity.getJoinedOn()));
        return jwtDto;
//        return userRepo.save(user);
    }

//    public void disconnect(ChatUser user) {
//        var storedUser = repository.findById(user.getNickName()).orElse(null);
//        if (storedUser != null) {
//            storedUser.setStatus(Status.OFFLINE);
//            repository.save(storedUser);
//        }
//    }

    public List<UserEntity> findConnectedUsers() {
        return userRepo.findAllByStatus(Status.ONLINE);
    }

    public JwtDto verify(UserEntity user) {

        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(), user.getPassword()
                    )
            );

            if (authenticate.isAuthenticated()) {
                UserEntity userEntity = userRepo.findByUsername(user.getUsername());
                if (userEntity == null) {
                    throw new ResourceNotFoundException("User not found with username: " + user.getUsername());
                }

                JwtDto jwtDto = new JwtDto();
                jwtDto.setToken(jwtService.generateToken(user));
                jwtDto.setUser(new UserReadDto(userEntity.getId(), userEntity.getName(), userEntity.getUsername(),
                        userEntity.getEmail(), userEntity.getImage(), userEntity.getJoinedOn()));
                return jwtDto;
            }
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password");
        } catch (Exception e) {
            throw new ApiException("An error occurred during authentication");
        }

        throw new ApiException("Authentication failed");
    }

    public UserEntity getUserById(int id) {

        return userRepo.findById(id).get();
    }

    public List<UserReadDto> getAllUsers() {

        List<UserEntity> users = userRepo.findAll();
//        System.out.println(user.get(0).getEmail());

//        user.get(0).getRoomEntity_members().stream()
//                .map(RoomEntity::getId)
//                .forEach(System.out::println);
//        return userRepo.findAll();

        return users.stream()
                .map((user) -> {
                    UserReadDto dto = new UserReadDto();
                    dto.setId(user.getId());
                    dto.setName(user.getName());
                    dto.setUsername(user.getUsername());
                    dto.setEmail(user.getEmail());
                    dto.setImage(user.getImage());
                    dto.setJoinedOn(user.getJoinedOn());

                    // Transform friendRequestEntity_sender to only include IDs
                    List<FriendRequestDto> senderIds = user.getFriendRequestEntity_sender().stream()
                            .map(friendRequest -> new FriendRequestDto(friendRequest.getId()))
                            .toList();
                    dto.setFriendRequestEntity_sender(senderIds);

                    // Transform friendRequestEntity_recipient to only include IDs
                    List<FriendRequestDto> recipientIds = user.getFriendRequestEntity_recipient().stream()
                            .map(friendRequest -> new FriendRequestDto(friendRequest.getId()))
                            .toList();
                    dto.setFriendRequestEntity_recipient(recipientIds);

                    // Transform friendRequestEntity_recipient to only include IDs
                    List<RoomDto> roomIds = user.getRoomEntity_members().stream()
                            .map(room -> new RoomDto(room.getId()))
                            .toList();
                    dto.setRoomEntity_members(roomIds);

                    // Transform friendRequestEntity_recipient to only include IDs
                    List<messageDto> messageIds = user.getMessageEntities().stream()
                            .map(message -> new messageDto(message.getId()))
                            .toList();
                    dto.setMessageEntities(messageIds);

                    // Transform friendRequestEntity_recipient to only include IDs
                    List<groupmessageDto> groupmessageIds = user.getGroupmessageEntities().stream()
                            .map(message -> new groupmessageDto(message.getId()))
                            .toList();
                    dto.setGroupmessageEntities(groupmessageIds);

                    return dto;
                })
                .toList();
    }

    public List<UserReadDto> usersStartsWithName(String name) {

        Optional<List<UserEntity>> searchedUsers = userRepo.findByNameStartingWith(name);
        List<UserReadDto> response = new ArrayList<>();

        if(searchedUsers.isPresent()) {
//            List<UserEntity> users = searchedUsers.get();
//            for(UserEntity u : users) {
//                response.add(new UserReadDto(u.getId(), u.getName(), u.getUsername()));
//            }

            // OR
            Stream<UserEntity> users = searchedUsers.get().stream();
            response = users.map((user) -> new UserReadDto(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getJoinedOn()))
                    .toList();
        }
        return response;
    }

//    public List<UserReadDto> usersforgroup(String name, int userid) {
//
//        Optional<List<UserEntity>> searchedUsers = userRepo.findByNameStartingWith(name);
//        List<UserReadDto> response = new ArrayList<>();
//
//        if(searchedUsers.isPresent()) {
////            List<UserEntity> users = searchedUsers.get();
////            for(UserEntity u : users) {
////                response.add(new UserReadDto(u.getId(), u.getName(), u.getUsername()));
////            }
//
//            // OR
//            Stream<UserEntity> users = searchedUsers.get().stream();
//            response = users
//                    .filter((user) -> )
//                    .map((user) -> new UserReadDto(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getJoinedOn()))
//                    .toList();
//        }
//        return response;
//    }

    public UserEntity checkUserName(String username) {

        UserEntity u = userRepo.findByUsername(username);
        if(u != null){
            throw new ApiException("Username already exists");
        }
        return u;
    }


    public UserEntity EditUser(UserEntity user, int userid) {

        UserEntity u = userRepo.findById(userid).orElse(null);
        if(u == null){
            throw new ResourceNotFoundException("User not found with id: " + userid);
        }

        if(user.getName() != null && user.getName().length() != 0){

            u.setName(user.getName());
        }
        if(user.getImage() != null && user.getImage().length() != 0){

            u.setImage(user.getImage());
        }
        if(user.getDescription() != null && user.getDescription().length() != 0){

            u.setDescription(user.getDescription());
        }
        return userRepo.save(u);
    }
}
