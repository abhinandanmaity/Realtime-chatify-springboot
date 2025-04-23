package com.RealtimeChatify.App.Payload;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.MessageEntity;

import java.time.LocalDateTime;

public class messageDto {

    private int id;
    private String content;
    private LocalDateTime msgDateTime;
    private String attachments;
    private UserReadDto userEntity;

    public messageDto(MessageEntity message, UserReadDto user) {

        this.id = message.getId();
        this.content = message.getContent();
        this.msgDateTime = message.getMsgDateTime();
        this.attachments = message.getAttachments();
        this.userEntity = user;
    }
    public messageDto(GroupMessageEntity message, UserReadDto user) {

        this.id = message.getId();
        this.content = message.getContent();
        this.msgDateTime = message.getMsgDateTime();
        this.attachments = message.getAttachments();
        this.userEntity = user;
    }

    public messageDto(int id) {

        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getMsgDateTime() { return msgDateTime; }
    public void setMsgDateTime(LocalDateTime msgDateTime) { this.msgDateTime = msgDateTime; }

    public String getAttachments() { return attachments; }
    public void setAttachments(String attachments) { this.attachments = attachments; }

    public UserReadDto getUserEntity() { return userEntity; }
    public void setUserEntity(UserReadDto userEntity) { this.userEntity = userEntity; }

}
