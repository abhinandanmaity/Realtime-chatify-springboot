package com.RealtimeChatify.App.Payload;

public class FriendRequestDto {

    private int id;

    public FriendRequestDto(int id) {

        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
