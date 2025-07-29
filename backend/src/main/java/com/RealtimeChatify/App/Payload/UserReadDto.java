package com.RealtimeChatify.App.Payload;

import com.RealtimeChatify.App.entities.FriendRequestEntity;
import com.RealtimeChatify.App.entities.RoomEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
//@NoArgsConstructor
public class UserReadDto {

    private int id;
    private String name;
    private String username;
    private String email;
    private String image;
    private LocalDate joinedOn;
    private List<FriendRequestDto> friendRequestEntity_sender = new ArrayList<>();
    private List<FriendRequestDto> friendRequestEntity_recipient = new ArrayList<>();
    private List<RoomDto> roomEntity_members = new ArrayList<>();
    private List<messageDto> messageEntities = new ArrayList<>();
    private List<groupmessageDto> groupmessageEntities = new ArrayList<>();
    private LocalDateTime sendOn;
    private int friendid;

    public UserReadDto() {
    }

    public UserReadDto(int id, String name, String username, String email, String image, LocalDate joinedOn) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.image = image;
        this.joinedOn = joinedOn;
    }

    public UserReadDto(int id, String name, String username, String email, String image, LocalDate joinedOn, LocalDateTime sendOn, int friendid) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.image = image;
        this.joinedOn = joinedOn;
        this.sendOn = sendOn;
        this.friendid = friendid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getJoinedOn() {
        return joinedOn;
    }

    public void setJoinedOn(LocalDate joinedOn) {
        this.joinedOn = joinedOn;
    }

    public List<FriendRequestDto> getFriendRequestEntity_sender() {
        return friendRequestEntity_sender;
    }

    public void setFriendRequestEntity_sender(List<FriendRequestDto> friendRequestEntity_sender) {
        this.friendRequestEntity_sender = friendRequestEntity_sender;
    }

    public List<FriendRequestDto> getFriendRequestEntity_recipient() {
        return friendRequestEntity_recipient;
    }

    public void setFriendRequestEntity_recipient(List<FriendRequestDto> friendRequestEntity_recipient) {
        this.friendRequestEntity_recipient = friendRequestEntity_recipient;
    }

    public List<RoomDto> getRoomEntity_members() {
        return roomEntity_members;
    }

    public void setRoomEntity_members(List<RoomDto> roomEntity_members) {
        this.roomEntity_members = roomEntity_members;
    }

    public List<messageDto> getMessageEntities() {
        return messageEntities;
    }

    public void setMessageEntities(List<messageDto> messageEntities) {
        this.messageEntities = messageEntities;
    }

    public List<groupmessageDto> getGroupmessageEntities() {
        return groupmessageEntities;
    }

    public void setGroupmessageEntities(List<groupmessageDto> groupmessageEntities) {
        this.groupmessageEntities = groupmessageEntities;
    }

    public LocalDateTime getSendOn() {
        return sendOn;
    }

    public void setSendOn(LocalDateTime sendOn) {
        this.sendOn = sendOn;
    }

    public int getFriendid() {
        return friendid;
    }

    public void setFriendid(int friendid) {
        this.friendid = friendid;
    }
}
