package com.RealtimeChatify.App.services;

import com.RealtimeChatify.App.Payload.EditGroupRequestDto;
import com.RealtimeChatify.App.Payload.RoomDto;
import com.RealtimeChatify.App.Payload.UserReadDto;
import com.RealtimeChatify.App.entities.MessageEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.repository.MessageRepo;
import com.RealtimeChatify.App.repository.RoomRepo;
import com.RealtimeChatify.App.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class RoomService {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    public List<RoomEntity> getAllConversation() {
        List<RoomEntity> conversation = new ArrayList<>();
        roomRepo.findAll().forEach(conversation::add);

        System.out.println("Conversation "+ conversation.size());
        return conversation;
    }

    public RoomEntity addRoom(RoomEntity conversation) {

        return roomRepo.save(conversation);
//        return null;
    }

    public RoomEntity addGroupRoom(List<Integer> participants, String groupname) {

        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setUserEntityAdmin(userRepo.findById(participants.get(0)).get());
        roomEntity.setGroup(true);
        roomEntity.setName(groupname);
        List<UserEntity> members = new ArrayList<>();
        participants.forEach((userid) -> {
            members.add(userRepo.findById(userid).get());
        });
        roomEntity.setUserEntities_members(members);
        roomEntity.setCreatedOn(LocalDate.now());
//        return addRoom(roomEntity);
        return roomRepo.save(roomEntity);
//        roomRepo.save(roomEntity);
//        return null;
    }

    public Set<MessageEntity> getConversationById(int id) {

        Optional<RoomEntity> roomEntity = roomRepo.findById(id);
        Set<MessageEntity> messages_ = new HashSet<MessageEntity>();
        if (roomEntity.isPresent()) {
            Set<MessageEntity> messages = roomEntity.get().getMessageEntities();
            return messages;
        }
        return messages_;
    }

    public List<RoomEntity> getConversationByUserId(int id) {

//        return roomRepo.getConversationsByUserId(id);
        return null;
    }

    public Map<String, List<RoomDto>> getRoomByUserid(int id) {

        Optional<UserEntity> userEntity = userRepo.findById(id);
        Map<String, List<RoomDto>> result = new HashMap<>();
        Random random = new Random();

        if (userEntity.isPresent()) {
            List<RoomEntity> rooms = userEntity.get().getRoomEntity_members();

            // Separate rooms into "room" and "group"
            List<RoomDto> individualRooms = rooms.stream()
                    .filter(room -> !room.isGroup()) // Filter for individual rooms
                    .map(room -> {
                        List<UserReadDto> users = room.getUserEntities_members().stream()
                                .filter(user -> user.getId() != id) // Exclude the current user
                                .map(user -> new UserReadDto(
                                        user.getId(),
                                        user.getName(),
                                        user.getUsername(),
                                        user.getEmail(),
                                        user.getImage(),
                                        user.getJoinedOn()))
                                .toList();
                        return new RoomDto(
                                room.getId(),
                                (int) (random.nextInt() * new Date().getTime() * random.nextInt() * new Date().getTime()),
                                room.getName(),
                                room.getDescription(),
                                room.isGroup(),
                                room.getGroupimage(),
                                room.getCreatedOn(),
                                users,
                                null, // Admin is null for individual rooms
                                room.getLastMessage(),
                                room.getLastMessagegroup(),
                                room.getGroupmessageEntities(),
                                room.getMessageEntities()
                        );
                    })
                    .toList();

            List<RoomDto> groupRooms = rooms.stream()
                    .filter(RoomEntity::isGroup) // Filter for group rooms
                    .map(room -> {
                        List<UserReadDto> users = room.getUserEntities_members().stream()
                                .filter(user -> user.getId() != id) // Exclude the current user
                                .map(user -> new UserReadDto(
                                        user.getId(),
                                        user.getName(),
                                        user.getUsername(),
                                        user.getEmail(),
                                        user.getImage(),
                                        user.getJoinedOn()))
                                .toList();
                        return new RoomDto(
                                room.getId(),
                                (int) (random.nextInt() * new Date().getTime() * random.nextInt() * new Date().getTime()),
                                room.getName(),
                                room.getDescription(),
                                room.isGroup(),
                                room.getGroupimage(),
                                room.getCreatedOn(),
                                users,
                                new UserReadDto(
                                        room.getUserEntityAdmin().getId(),
                                        room.getUserEntityAdmin().getName(),
                                        room.getUserEntityAdmin().getUsername(),
                                        room.getUserEntityAdmin().getEmail(),
                                        room.getUserEntityAdmin().getImage(),
                                        room.getUserEntityAdmin().getJoinedOn()), // Include admin for group rooms
                                room.getLastMessage(),
                                room.getLastMessagegroup(),
                                room.getGroupmessageEntities(),
                                room.getMessageEntities()
                        );
                    })
                    .toList();

            // Populate the result map
            result.put("room", individualRooms);
            result.put("group", groupRooms);
        }

        return result;
    }

    public RoomEntity getRoomById(int id) {

        return roomRepo.findById(id).get();
    }

    public RoomDto EditGroupRoom(EditGroupRequestDto editroom, int roomid) {

        Optional<RoomEntity> roomEntity = roomRepo.findById(roomid);
        Random random = new Random();

        if(editroom.getGroup() != null){

            if(editroom.getGroup().getName() != null && editroom.getGroup().getName().length() != 0){

                roomEntity.get().setName(editroom.getGroup().getName());
            }
            if(editroom.getGroup().getDescription() != null && editroom.getGroup().getDescription().length() != 0){

                roomEntity.get().setDescription(editroom.getGroup().getDescription());
            }
            if(editroom.getGroup().getGroupimage() != null && editroom.getGroup().getGroupimage().length() != 0){

                roomEntity.get().setGroupimage(editroom.getGroup().getGroupimage());
            }
        }

        if(editroom.getParticipants() != null && editroom.getParticipants().size() > 0){

            List<UserEntity> members = new ArrayList<>();
            roomEntity.get().getUserEntities_members().forEach((u) ->{
                members.add(userRepo.findById(u.getId()).get());
            });
            editroom.getParticipants().forEach((userid) -> {
                members.add(userRepo.findById(userid).get());
            });
            roomEntity.get().setUserEntities_members(members);
        }

        RoomEntity group = roomRepo.save(roomEntity.get());

        List<UserReadDto> users = group.getUserEntities_members().stream()
                    .filter(user -> user.getId() != group.getUserEntityAdmin().getId()) // Exclude the current user
                    .map(user -> new UserReadDto(
                            user.getId(),
                            user.getName(),
                            user.getUsername(),
                            user.getEmail(),
                            user.getImage(),
                            user.getJoinedOn()))
                    .toList();
        RoomDto roomDto = new RoomDto(
                group.getId(),
                (int) (random.nextInt() * new Date().getTime() * random.nextInt() * new Date().getTime()),
                group.getName(),
                group.getDescription(),
                group.isGroup(),
                group.getGroupimage(),
                group.getCreatedOn(),
                users,
                new UserReadDto(
                        group.getUserEntityAdmin().getId(),
                        group.getUserEntityAdmin().getName(),
                        group.getUserEntityAdmin().getUsername(),
                        group.getUserEntityAdmin().getEmail(),
                        group.getUserEntityAdmin().getImage(),
                        group.getUserEntityAdmin().getJoinedOn()), // Include admin for group rooms
                group.getLastMessage(),
                group.getLastMessagegroup(),
                group.getGroupmessageEntities(),
                group.getMessageEntities()
            );

        return roomDto;
    }

    public RoomDto ExitGroupRoom(int roomid, int userid) {

        Optional<RoomEntity> roomEntity = roomRepo.findById(roomid);
        List<UserEntity> members = new ArrayList<>();
        roomEntity.get().getUserEntities_members().forEach((u) ->{
            if(u.getId()!= userid){
                members.add(userRepo.findById(u.getId()).get());
            }
        });
        roomEntity.get().setUserEntities_members(members);
//        return roomRepo.save(roomEntity.get());

        RoomEntity group = roomRepo.save(roomEntity.get());
        Random random = new Random();

        List<UserReadDto> users = group.getUserEntities_members().stream()
                .filter(user -> user.getId() != group.getUserEntityAdmin().getId()) // Exclude the current user
                .map(user -> new UserReadDto(
                        user.getId(),
                        user.getName(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getImage(),
                        user.getJoinedOn()))
                .toList();
        RoomDto roomDto = new RoomDto(
                group.getId(),
                (int) (random.nextInt() * new Date().getTime() * random.nextInt() * new Date().getTime()),
                group.getName(),
                group.getDescription(),
                group.isGroup(),
                group.getGroupimage(),
                group.getCreatedOn(),
                users,
                new UserReadDto(
                        group.getUserEntityAdmin().getId(),
                        group.getUserEntityAdmin().getName(),
                        group.getUserEntityAdmin().getUsername(),
                        group.getUserEntityAdmin().getEmail(),
                        group.getUserEntityAdmin().getImage(),
                        group.getUserEntityAdmin().getJoinedOn()), // Include admin for group rooms
                group.getLastMessage(),
                group.getLastMessagegroup(),
                group.getGroupmessageEntities(),
                group.getMessageEntities()
        );

        return roomDto;
    }

    public void DeleteGroupRoom(int roomid) {

        roomRepo.deleteById(roomid);
    }
}
