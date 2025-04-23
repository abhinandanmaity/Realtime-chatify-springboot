package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.FriendEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepo extends JpaRepository<FriendEntity, Integer> {
}
