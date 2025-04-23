package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.FriendRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRequestRepo extends JpaRepository<FriendRequestEntity, Integer> {

    @Modifying
    @Query(value = "DELETE FROM FriendRequestEntity WHERE id = :id AND senderId = :senderId AND recipientId = :recipientId", nativeQuery = true)
    void deleteFriendRequest(@Param("id") int id, @Param("senderId") int senderId, @Param("recipientId") int recipientId);

}
