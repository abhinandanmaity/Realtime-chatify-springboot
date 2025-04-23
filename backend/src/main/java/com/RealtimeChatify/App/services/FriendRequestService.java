package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.entities.FriendEntity;
import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.repository.FriendRequestRepo;
import com.RealtimeChatify.App.repository.RoomRepo;
import com.RealtimeChatify.App.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepo friendRequestRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private RoomService roomService;

    @Autowired
    private GroupMessageService groupService;

    @Autowired
    private FriendService friendService;

    public void sendFriendRequest(FriendRequestEntity friendRequestEntity, int senderid, int recipientid){

//        Optional<UserEntity> user = Optional.of(userRepo.findById(senderid).get());
        UserEntity user = userRepo.findById(senderid).get();
        System.out.println("Abhinandan Maity "+ friendRequestEntity);
        friendRequestEntity.setSenderid(user);
//        System.out.println(user);
        friendRequestEntity.setSendOn(LocalDateTime.now());
        friendRequestEntity.setRecipientid(userRepo.findById(recipientid).get());
        friendRequestRepo.save(friendRequestEntity);
    }

    public void acceptFriendRequest(int id, int senderid, int recipientid){

//        GroupMessageEntity groupMessageEntity = new GroupMessageEntity();
//        Set<UserEntity> members = new HashSet<>();
//        members.add(userRepo.findById(senderid).get());
//        members.add(userRepo.findById(recipientid).get());
//        groupMessageEntity.setMembers(members);
//        groupService.addGroup(groupMessageEntity);
//
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setGroup(false);
        List<UserEntity> members = new ArrayList<>();
        members.add(userRepo.findById(senderid).get());
        members.add(userRepo.findById(recipientid).get());
        roomEntity.setUserEntities_members(members);
        roomService.addRoom(roomEntity);

        FriendEntity friendEntity = new FriendEntity();
        friendEntity.setSenderid(userRepo.findById(senderid).get());
        friendEntity.setRecipientid(userRepo.findById(recipientid).get());
        friendService.addFriend(friendEntity);

        // Drop the friend request column
//        friendRequestRepo.deleteFriendRequest(id, senderid, recipientid);
        declineFriendRequest(id, senderid, recipientid);
    }

    @Transactional
    public void declineFriendRequest(int id, int senderid, int recipientid){

//        friendRequestRepo.deleteFriendRequest(id, senderid, recipientid);
        FriendRequestEntity friend = friendRequestRepo.findById(id).orElse(null);
        friendRequestRepo.delete(friend);
    }


    public List<UserReadDto> getFriendByUserid(int userid){

        List<FriendRequestEntity> friendEntity = friendRequestRepo.findAll();

        List<UserReadDto> friends_ = new ArrayList<>();
//        System.out.println(friendEntity.size());
        if (friendEntity.size() > 0) {
            List<UserReadDto> friends = friendEntity.stream()
                    .filter((friend) -> friend.getRecipientid().getId() == userid)
                    .map((friend) -> {

                        UserEntity user = friend.getSenderid();
                        UserReadDto dto = new UserReadDto(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getJoinedOn(), friend.getSendOn(), friend.getId());

                        return dto;
                    })
                    .toList();
            return friends;
        }
        return friends_;
//        return friendRequestRepo.findAllByRecipientid(userid);
    }
}
