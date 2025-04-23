package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.repository.GroupMessageRepo;
import com.RealtimeChatify.App.repository.RoomRepo;
import com.RealtimeChatify.App.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class GroupMessageService {

    @Autowired
    private GroupMessageRepo groupMessageRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private UserRepo userRepo;

    public GroupMessageEntity addGroup(GroupMessageEntity groupMessageEntity) {

        return groupMessageRepo.save(groupMessageEntity);
    }

    public List<GroupMessageEntity> getAllMessage() {

        List<GroupMessageEntity> messages = new ArrayList<>();
        groupMessageRepo.findAll().forEach(messages::add);

        return messages;
    }

    // adds a message to the messageTable
    public GroupMessageEntity addMessageData(GroupMessageEntity message, int roomId, int userId) {
//        Date currentSaveTime =  new Date(System.currentTimeMillis());
        Optional<RoomEntity> roomEntity = roomRepo.findById(roomId);

        if(roomEntity.isPresent()) {

            Stream<UserEntity> user = roomEntity.get().getUserEntities_members().stream();

            if(user.anyMatch(u -> u.getId() == userId)) {

                message.setMsgDateTime(LocalDateTime.now());
                message.setRoomEntityGroup(roomRepo.findById(roomId).get());
                message.setUserEntityGroup(userRepo.findById(userId).get());

                return groupMessageRepo.save(message);
            }
        }

//        message.setContent(null);
        return null;
    }

    // gets a message based on the messageId
    public GroupMessageEntity getMessageByMessegeId(int id) {

        return groupMessageRepo.findById(id).orElse(null);
    }

    public List<GroupMessageEntity> getMsgByRoomId(int roomId) {

        return groupMessageRepo.findByRoomEntityGroup_Id(roomId);
    }

    public List<GroupMessageEntity> getMsgByUserId(int roomId, int userId) {

        return groupMessageRepo.findByUserEntityGroup_Id(userId).stream()
                .filter(message -> message.getRoomEntityGroup().getId() == roomId)
                .toList();
    }
}
