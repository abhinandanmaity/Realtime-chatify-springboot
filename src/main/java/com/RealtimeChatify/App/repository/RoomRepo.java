package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepo extends JpaRepository<RoomEntity, Integer> {

//    @Query("SELECT DISTINCT c FROM Conversation c LEFT JOIN Messages mg on c.id = mg.conversation.id where mg.user.id = ?#{[0]}")
//    List<RoomEntity> getConversationsByUserId(int id);

//    @Query("SELECT r FROM RoomEntity r WHERE r.group = false AND r.userEntities_members.id = ?1")
//    List<RoomEntity> getRoomByUserid(int id);



}
