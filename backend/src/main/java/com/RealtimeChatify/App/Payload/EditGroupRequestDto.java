package com.RealtimeChatify.App.Payload;

import com.RealtimeChatify.App.entities.RoomEntity;
import lombok.Data;

import java.util.List;

@Data
public class EditGroupRequestDto {

    private RoomEntity group;
    private List<Integer> participants;

    public RoomEntity getGroup() {
        return group;
    }

    public void setGroup(RoomEntity group) {
        this.group = group;
    }

    public List<Integer> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Integer> participants) {
        this.participants = participants;
    }
}
