package com.RealtimeChatify.App.repository;

import com.RealtimeChatify.App.entities.UserEntity;
import com.RealtimeChatify.App.utils.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {

    List<UserEntity> findAllByStatus(Status status);

//    UserEntity findById(int id);
    Optional<List<UserEntity>> findByNameStartingWith(String name);

//    Optional<List<UserEntity>> findByUsernameStartingWith(String name);

    UserEntity findByUsername(String username);
    UserEntity findByEmail(String username);
}
