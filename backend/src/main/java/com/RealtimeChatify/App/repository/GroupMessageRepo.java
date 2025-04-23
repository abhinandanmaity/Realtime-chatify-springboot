package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.GroupMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMessageRepo extends JpaRepository<GroupMessageEntity, Integer> {

    // Automatically sort messages by m_datetime in ascending order
//    List<GroupMessageEntity> findByRoomEntityGroup_IdOrderByMsgDateTimeAsc(int roomId);
    List<GroupMessageEntity> findByRoomEntityGroup_Id(int roomId);

    List<GroupMessageEntity> findByUserEntityGroup_Id(int userId);
}
