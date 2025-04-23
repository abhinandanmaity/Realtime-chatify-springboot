package com.RealtimeChatify.App.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "friend-request")
@Data
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class FriendRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(
            name = "sender_id"
    )
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//    @JsonIdentityReference(alwaysAsId = true)
    private UserEntity senderid;
    private LocalDateTime sendOn;

    @ManyToOne
    @JoinColumn(
            name = "recipient_id"
    )
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//    @JsonIdentityReference(alwaysAsId = true)
    private UserEntity recipientid;

    public FriendRequestEntity() {

    }

    public FriendRequestEntity(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getSenderid() {
        return senderid;
    }

    public void setSenderid(UserEntity senderid) {
        this.senderid = senderid;
    }

    public UserEntity getRecipientid() {
        return recipientid;
    }

    public void setRecipientid(UserEntity recipientid) {
        this.recipientid = recipientid;
    }

    public LocalDateTime getSendOn() {
        return sendOn;
    }

    public void setSendOn(LocalDateTime sendOn) {
        this.sendOn = sendOn;
    }

}
