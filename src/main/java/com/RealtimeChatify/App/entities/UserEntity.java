package com.RealtimeChatify.App.entities;

import com.RealtimeChatify.App.utils.Status;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;

    @Column(
            unique = true,
            nullable = false,
            updatable = true
    )
    private String username;

    @Column(
            name = "email_id",
            unique = true,
            nullable = false,
            updatable = false
    )
    private String email;

    private String password;
    private Status status = Status.OFFLINE;
    private String image;
    private LocalDate joinedOn;

    @OneToMany(
            mappedBy = "userEntity"
//            cascade = CascadeType.ALL
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<MessageEntity> messageEntities = new ArrayList<>();

    @OneToMany(
            mappedBy = "userEntityGroup"
//            cascade = CascadeType.ALL
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<GroupMessageEntity> groupmessageEntities = new ArrayList<>();

    @OneToMany(
            mappedBy = "userEntityAdmin"
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<RoomEntity> roomEntity = new ArrayList<>();

    @OneToMany(
            mappedBy = "senderid"
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY,
//            orphanRemoval = true
    )
//    @JsonManagedReference
    private List<FriendRequestEntity> friendRequestEntity_sender = new ArrayList<>();

    @OneToMany(
            mappedBy = "recipientid"
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY,
//            orphanRemoval = true
    )
//    @JsonManagedReference
    private List<FriendRequestEntity> friendRequestEntity_recipient = new ArrayList<>();

    @OneToMany(
            mappedBy = "senderid"
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY,
//            orphanRemoval = true
    )
//    @JsonManagedReference
    private List<FriendEntity> friendEntity_sender = new ArrayList<>();

    @OneToMany(
            mappedBy = "recipientid"
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY,
//            orphanRemoval = true
    )
//    @JsonManagedReference
    private List<FriendEntity> friendEntity_recipient = new ArrayList<>();

    @ManyToMany(
            mappedBy = "userEntities_members"
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<RoomEntity> roomEntity_members = new ArrayList<>();

//    @ManyToOne(
//            mappedBy = "friend"
//    )
//    private FriendEntity friendEntity;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<RoomEntity> getRoomEntity() {
        return roomEntity;
    }

    public void setRoomEntity(List<RoomEntity> roomEntity) {
        this.roomEntity = roomEntity;
    }

    public List<GroupMessageEntity> getGroupmessageEntities() {
        return groupmessageEntities;
    }

    public void setGroupmessageEntities(List<GroupMessageEntity> groupmessageEntities) {
        this.groupmessageEntities = groupmessageEntities;
    }

    public List<MessageEntity> getMessageEntities() {
        return messageEntities;
    }

    public void setMessageEntities(List<MessageEntity> messageEntities) {
        this.messageEntities = messageEntities;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RoomEntity> getRoomEntity_members() {
        return roomEntity_members;
    }

    public void setRoomEntity_members(List<RoomEntity> roomEntity_members) {
        this.roomEntity_members = roomEntity_members;
    }

    public List<FriendRequestEntity> getFriendRequestEntity_sender() {
        return friendRequestEntity_sender;
    }

    public void setFriendRequestEntity_sender(List<FriendRequestEntity> friendRequestEntity_sender) {
        this.friendRequestEntity_sender = friendRequestEntity_sender;
    }

    public List<FriendRequestEntity> getFriendRequestEntity_recipient() {
        return friendRequestEntity_recipient;
    }

    public void setFriendRequestEntity_recipient(List<FriendRequestEntity> friendRequestEntity_recipient) {
        this.friendRequestEntity_recipient = friendRequestEntity_recipient;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    //
//    public List<FriendEntity> getFriendEntity_sender() {
//        return friendEntity_sender;
//    }
//
//    public void setFriendEntity_sender(List<FriendEntity> friendEntity_sender) {
//        this.friendEntity_sender = friendEntity_sender;
//    }
//
//    public List<FriendEntity> getFriendEntity_recipient() {
//        return friendEntity_recipient;
//    }
//
//    public void setFriendEntity_recipient(List<FriendEntity> friendEntity_recipient) {
//        this.friendEntity_recipient = friendEntity_recipient;
//    }
}
