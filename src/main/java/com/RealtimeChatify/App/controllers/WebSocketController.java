package com.RealtimeChatify.App.controllers;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import com.RealtimeChatify.App.entities.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "https://realtime-chatify.netlify.app") // Allow requests from React app
public class WebSocketController {

    private SimpMessagingTemplate simpMessageTemplate;

    @Autowired
    public WebSocketController(SimpMessagingTemplate simpMessageTemplate) {
        this.simpMessageTemplate = simpMessageTemplate;
    }

    @MessageMapping("/message/{id}") //// Client sends to /app/message
    public MessageEntity recievePublicMessage(@Payload MessageEntity message, @PathVariable int id) {

        String sendToStr = "/messages/" + id;
        simpMessageTemplate.convertAndSend(sendToStr, message);
        return message;
    }

    // change to DTO, save messege and return messege.
    @MessageMapping("/group-message/{id}") //// Client sends to /app/group-message
//    @SendTo("/group/public") // /group/public
    public GroupMessageEntity recieveGroupMessege(@Payload GroupMessageEntity message, @PathVariable int id) {

        System.out.println("Abhimess");
        System.out.println(id);
        System.out.println(message);
        String sendToStr = "/group/public" + id;
        System.out.println(sendToStr);
//        Conversation conversation = new Conversation(messegeDto.getConversationId(), null, null);

//        GroupMessageEntity messege = new GroupMessageEntity();
//        messege.setUserEntityGroup(messege.getFromuser());
//        messege.setMessegeTexts(messegeDto.getMessegeTexts());
//
//
//        simpMessagingTemplate.convertAndSend(sendToStr, messege);
//        messegeService.addMessegeData(messegeDto.getConversationId(), messege);
        simpMessageTemplate.convertAndSend(sendToStr, message);
        return message;
    }
}
