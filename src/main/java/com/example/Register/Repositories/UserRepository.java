package com.example.Register.Repositories;

import com.example.Register.Model.UserModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    List<UserModel> getUsers();

    void saveUser(UserModel user);

    UserModel findUserById(Long id);

    void deleteUser(Long id);

    UserModel findUserByIdentifications(UserModel user);

    List<UserModel> findUserByCredential(String email);

}
