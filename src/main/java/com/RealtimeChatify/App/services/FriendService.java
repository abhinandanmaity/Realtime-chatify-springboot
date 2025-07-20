package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.entities.FriendEntity;
import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.repository.FriendRepo;
import com.RealtimeChatify.App.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    @Autowired
    private FriendRepo friendRepo;

    @Autowired
    private UserRepo userRepo;

    public void addGroup(GroupMessageEntity groupMessageEntity) {

//        return groupMessageRepo.save(groupMessageEntity);
    }

    public void addFriend(FriendEntity friendEntity) {

        friendRepo.save(friendEntity);
    }

    public List<UserReadDto> getFriendByUserId(int id) {

        List<FriendEntity> friends = friendRepo.findAll();

        List<Integer> friend1 = friends.stream()
                .filter((f) -> f.getRecipientid().getId() == id)
                .map((f) -> f.getSenderid().getId())
                .toList();

        List<Integer> friend2 = friends.stream()
                .filter((f) -> f.getSenderid().getId() == id)
                .map((f) -> f.getRecipientid().getId())
                .toList();

//        List<Integer> allFriends = friend1.stream()
//                .toList();
//        allFriends.addAll(friend2);
//
//        Optional<UserEntity> users = Optional.of((UserEntity) allFriends.stream()
//                .map((i) -> userRepo.findById(i))
//                .toList());
////                .map((i) -> userRepo.findById(i))
//
////        Stream<UserEntity> userRead = users.get().stream();
//        List<UserReadDto> response = users.stream()
//                .map((user) -> new UserReadDto(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getJoinedOn()))
//                .toList();
//
//        return response;

        // Use a mutable list instead of immutable lists
        List<Integer> allFriends = new ArrayList<>(friend1);
        allFriends.addAll(friend2);

        // Fetch users and map to UserReadDto
        List<UserEntity> users = allFriends.stream()
                .map(userRepo::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        List<UserReadDto> response = users.stream()
                .map(user -> new UserReadDto(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getImage(), user.getJoinedOn()))
                .toList();

        return response;
    }

    public void unfriend(int userid, int friendid) {

//        friendRequestRepo.deleteFriendRequest(id, senderid, recipientid);
        List<FriendEntity> friend = friendRepo.findAll();

        FriendEntity friendEntity = friend.stream()
                .filter(f -> (f.getSenderid().getId() == userid && f.getRecipientid().getId() == friendid) ||
                        (f.getSenderid().getId() == friendid && f.getRecipientid().getId() == userid))
                .findFirst()
                .orElse(null);

        friendRepo.delete(friendEntity);
    }
}
