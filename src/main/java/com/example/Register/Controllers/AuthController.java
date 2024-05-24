package com.example.Register.Controllers;

import com.example.Register.Model.UserModel;
import com.example.Register.Repositories.UserRepository;


import com.example.Register.Utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public boolean login(@RequestBody UserModel user){
        UserModel userLogged = userRepository.findUserByIdentifications(user);
        return userLogged != null;
    }

    @RequestMapping(value = "api/authlogin", method = RequestMethod.POST)
    public String authLogin(@RequestBody UserModel user){
        UserModel userlogged = userRepository.findUserByIdentifications(user);

        if(userlogged != null){
            String token = jwtUtil.generateToken(String.valueOf(userlogged.getCredential()));
            return token;
        }
        return "FAIL";

    }

    //crear mapping para autentificar token




}
