package com.RealtimeChatify.App.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "GroupMessages")
@Data
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class GroupMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private LocalDateTime MsgDateTime;
    private String attachments;

    @OneToOne(
            mappedBy = "lastMessagegroup"
    )
    private RoomEntity roomLastMessagegroup;

    @ManyToOne
    @JoinColumn(
            name = "sender_id"
    )
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//    @JsonIdentityReference(alwaysAsId = true)
    private UserEntity userEntityGroup;

    @ManyToOne
    @JoinColumn(
            name = "room_id"
    )
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//    @JsonIdentityReference(alwaysAsId = true)
    private RoomEntity roomEntityGroup;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public RoomEntity getRoomEntityGroup() {
        return roomEntityGroup;
    }

    public void setRoomEntityGroup(RoomEntity roomEntityGroup) {
        this.roomEntityGroup = roomEntityGroup;
    }

    public UserEntity getUserEntityGroup() {
        return userEntityGroup;
    }

    public void setUserEntityGroup(UserEntity userEntityGroup) {
        this.userEntityGroup = userEntityGroup;
    }

    public LocalDateTime getMsgDateTime() {
        return MsgDateTime;
    }

    public void setMsgDateTime(LocalDateTime msgDateTime) {
        this.MsgDateTime = msgDateTime;
    }

    public String getAttachments() {
        return attachments;
    }

    public void setAttachments(String attachments) {
        this.attachments = attachments;
    }

    public RoomEntity getRoomLastMessagegroup() {
        return roomLastMessagegroup;
    }

    public void setRoomLastMessagegroup(RoomEntity roomLastMessagegroup) {
        this.roomLastMessagegroup = roomLastMessagegroup;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
