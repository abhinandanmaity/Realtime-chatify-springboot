package com.RealtimeChatify.App.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "friends")
@Data
public class FriendEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @OneToMany
//    @JoinColumn(
//            name = "friend"
//    )
//    private List<UserEntity> friend = new ArrayList<>();

    @ManyToOne
    @JoinColumn(
            name = "sender_id"
    )
    private UserEntity senderid;

    @ManyToOne
    @JoinColumn(
            name = "recipient_id"
    )
    private UserEntity recipientid;

    public FriendEntity() {

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
}
