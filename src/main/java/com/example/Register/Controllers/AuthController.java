package com.example.Register.Controllers;

import com.example.Register.Model.UserModel;
import com.example.Register.Repositories.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    //IMPLEMENTAR TOKEN
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public boolean login(@RequestBody UserModel user){
        UserModel userLogged = userRepository.findUserByIdentifications(user);
        return userLogged != null;
    }




}
