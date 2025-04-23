package com.RealtimeChatify.App.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Rooms")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private boolean isGroup;
    private String groupimage;
    private LocalDate createdOn;
    @OneToOne
    @JoinColumn(
            name = "lastMessage_id"
    )
    private MessageEntity lastMessage;
    @OneToOne
    @JoinColumn(
            name = "lastMessagegroup_id"
    )
    private GroupMessageEntity lastMessagegroup;

    @ManyToOne
    @JoinColumn(
            name = "admin_id"
    )
    private UserEntity userEntityAdmin;

    @ManyToMany
    @JoinTable(
            name = "users_rooms",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
//    @JsonBackReference
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<UserEntity> userEntities_members = new ArrayList<>();

    @OneToMany(
            mappedBy = "roomEntity"
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<MessageEntity> messageEntities = new HashSet<>();

    @OneToMany(
            mappedBy = "roomEntityGroup"
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<GroupMessageEntity> groupmessageEntities = new HashSet<>();


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserEntity getUserEntityAdmin() {
        return userEntityAdmin;
    }

    public void setUserEntityAdmin(UserEntity userEntityAdmin) {
        this.userEntityAdmin = userEntityAdmin;
    }

    public List<UserEntity> getUserEntities_members() {
        return userEntities_members;
    }

    public void setUserEntities_members(List<UserEntity> userEntities_members) {
        this.userEntities_members = userEntities_members;
    }

    public String getGroupimage() {
        return groupimage;
    }

    public void setGroupimage(String groupimage) {
        this.groupimage = groupimage;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
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
}
