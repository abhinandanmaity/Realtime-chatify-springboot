package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<MessageEntity, Integer> {

    // Automatically sort messages by m_datetime in ascending order
    List<MessageEntity> findByRoomEntity_Id(int roomId);

    List<MessageEntity> findByUserEntity_Id(int userId);
}
