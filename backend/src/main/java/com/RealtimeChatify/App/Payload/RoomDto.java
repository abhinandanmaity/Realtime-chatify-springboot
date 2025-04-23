package com.RealtimeChatify.App.Payload;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.MessageEntity;
import com.RealtimeChatify.App.entities.UserEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RoomDto {

    private int id;
    private int _id;
    private String name;
    private String description;
    private boolean isGroup;
    private String groupimage;
    private LocalDate createdOn;

    private MessageEntity lastMessage;
    private GroupMessageEntity lastMessagegroup;

    private UserReadDto userEntityAdmin;
    private List<UserReadDto> users = new ArrayList<>();

    private Set<GroupMessageEntity> groupmessageEntities = new HashSet<>();
    private Set<MessageEntity> messageEntities = new HashSet<>();

    public RoomDto(int id) {

        this.id = id;
    }
    public RoomDto(int id, int _id, String name, String description, boolean isGroup, String groupimage, LocalDate createdOn,
                   List<UserReadDto> users, UserReadDto userEntityAdmin, MessageEntity lastMessage, GroupMessageEntity lastMessagegroup,
                   Set<GroupMessageEntity> groupmessageEntities, Set<MessageEntity> messageEntities) {

        this.id = id;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.isGroup = isGroup;
        this.groupimage = groupimage;
        this.createdOn = createdOn;
        this.users = users;
        this.userEntityAdmin = userEntityAdmin;
        this.lastMessage = lastMessage;
        this.lastMessagegroup = lastMessagegroup;
        this.groupmessageEntities = groupmessageEntities;
        this.messageEntities = messageEntities;
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

    public List<UserReadDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserReadDto> users) {
        this.users = users;
    }

    public UserReadDto getUserEntityAdmin() {
        return userEntityAdmin;
    }

    public void setUserEntityAdmin(UserReadDto userEntityAdmin) {
        this.userEntityAdmin = userEntityAdmin;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getGroupimage() {
        return groupimage;
    }

    public void setGroupimage(String groupimage) {
        this.groupimage = groupimage;
    }

    public boolean isGroup() {
        return isGroup;
    }

    public void setGroup(boolean group) {
        isGroup = group;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MessageEntity getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(MessageEntity lastMessage) {
        this.lastMessage = lastMessage;
    }

    public GroupMessageEntity getLastMessagegroup() {
        return lastMessagegroup;
    }

    public void setLastMessagegroup(GroupMessageEntity lastMessagegroup) {
        this.lastMessagegroup = lastMessagegroup;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public Set<GroupMessageEntity> getGroupmessageEntities() {
        return groupmessageEntities;
    }

    public void setGroupmessageEntities(Set<GroupMessageEntity> groupmessageEntities) {
        this.groupmessageEntities = groupmessageEntities;
    }

    public Set<MessageEntity> getMessageEntities() {
        return messageEntities;
    }

    public void setMessageEntities(Set<MessageEntity> messageEntities) {
        this.messageEntities = messageEntities;
    }
}
