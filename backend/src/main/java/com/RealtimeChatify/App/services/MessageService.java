package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.Payload.messageDto;
import com.RealtimeChatify.App.entities.*;
import com.RealtimeChatify.App.exceptions.ApiException;
import com.RealtimeChatify.App.repository.GroupMessageRepo;
import com.RealtimeChatify.App.repository.MessageRepo;
import com.RealtimeChatify.App.repository.RoomRepo;
import com.RealtimeChatify.App.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class MessageService {

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private GroupMessageRepo groupmessageRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private UserRepo userRepo;

    public List<MessageEntity> getAllMessage() {

        List<MessageEntity> messages = new ArrayList<>();
        messageRepo.findAll().forEach(messages::add);

        return messages;
    }

    // adds a message to the messageTable
    public messageDto addMessageData(MessageEntity message, int roomId, int userId) {
//        Date currentSaveTime =  new Date(System.currentTimeMillis());
        Optional<RoomEntity> roomEntity = roomRepo.findById(roomId);

        if(roomEntity.isPresent()) {

            Stream<UserEntity> user = roomEntity.get().getUserEntities_members().stream();

            if(user.anyMatch(u -> u.getId() == userId)) {

                message.setMsgDateTime(LocalDateTime.now());
                message.setRoomEntity(roomRepo.findById(roomId).get());
                message.setUserEntity(userRepo.findById(userId).get());
//                System.out.println("Message");
                messageRepo.save(message);
//                if(roomEntity.get().isGroup()){
//                    roomEntity.get().setLastMessagegroup(message);
//                    roomRepo.save(roomEntity.get());
//                }
                roomEntity.get().setLastMessage(message);
                roomRepo.save(roomEntity.get());
                messageDto newmessage = new messageDto(
                        message,
                        new UserReadDto(
                                message.getUserEntity().getId(),
                                message.getUserEntity().getName(),
                                message.getUserEntity().getUsername(),
                                message.getUserEntity().getEmail(),
                                message.getUserEntity().getImage(),
                                message.getUserEntity().getJoinedOn())
                );
                return newmessage;
            }
        }
//        System.out.println("Message - 2");
//        message.setContent(null);
        throw new ApiException("Internal server error");
    }

    // gets a message based on the messageId
    public MessageEntity getMessageByMessegeId(int id) {

        return messageRepo.findById(id).orElse(null);
    }

    public List<messageDto> getMsgByRoomId(int roomId) {

        List<MessageEntity> messages = messageRepo.findByRoomEntity_Id(roomId);

        List<messageDto> allmessage = messages.stream()
                .map(message ->  new messageDto(
                            message,
                            new UserReadDto(
                                    message.getUserEntity().getId(),
                                    message.getUserEntity().getName(),
                                    message.getUserEntity().getUsername(),
                                    message.getUserEntity().getEmail(),
                                    message.getUserEntity().getImage(),
                                    message.getUserEntity().getJoinedOn())
                            ))
                .toList();

        List<GroupMessageEntity> messages_ = groupmessageRepo.findByRoomEntityGroup_Id(roomId);

        List<messageDto> allmessage_ = messages_.stream()
                .map(message ->  new messageDto(
                        message,
                        new UserReadDto(
                                message.getUserEntityGroup().getId(),
                                message.getUserEntityGroup().getName(),
                                message.getUserEntityGroup().getUsername(),
                                message.getUserEntityGroup().getEmail(),
                                message.getUserEntityGroup().getImage(),
                                message.getUserEntityGroup().getJoinedOn())
                ))
                .toList();

        if(allmessage_.size() > 0){
            return allmessage_;
        }
        return allmessage;
    }

    public List<MessageEntity> getMsgByUserId(int roomId, int userId) {

        return messageRepo.findByUserEntity_Id(userId).stream()
                .filter(message -> message.getRoomEntity().getId() == roomId)
               .toList();
    }

    public messageDto addMessageGroup(GroupMessageEntity message, int roomId, int userId) {

        Optional<RoomEntity> roomEntity = roomRepo.findById(roomId);

        if(roomEntity.isPresent()) {

            Stream<UserEntity> user = roomEntity.get().getUserEntities_members().stream();

            if(user.anyMatch(u -> u.getId() == userId)) {

                message.setMsgDateTime(LocalDateTime.now());
                message.setRoomEntityGroup(roomRepo.findById(roomId).get());
                message.setUserEntityGroup(userRepo.findById(userId).get());
//                System.out.println("Message");
                groupmessageRepo.save(message);

                roomEntity.get().setLastMessagegroup(message);
                roomRepo.save(roomEntity.get());

                messageDto newmessage = new messageDto(
                        message,
                        new UserReadDto(
                                message.getUserEntityGroup().getId(),
                                message.getUserEntityGroup().getName(),
                                message.getUserEntityGroup().getUsername(),
                                message.getUserEntityGroup().getEmail(),
                                message.getUserEntityGroup().getImage(),
                                message.getUserEntityGroup().getJoinedOn())
                );
                return newmessage;
            }
        }
//        System.out.println("Message - 2");
//        message.setContent(null);
        throw new ApiException("Internal server error");
    }
}
