package com.example.Register.Controllers;

import com.example.Register.Model.UserModel;
import com.example.Register.Repositories.UserRepository;


import com.example.Register.Utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public boolean login(@RequestBody UserModel user) {
        UserModel userLogged = userRepository.findUserByIdentifications(user);
        return userLogged != null;
    }

    @RequestMapping(value = "api/authLogin", method = RequestMethod.POST)
    public String authLogin(@RequestBody UserModel user) {
        UserModel userlogged = userRepository.findUserByIdentifications(user);

        if (userlogged != null) {

            String subject = String.valueOf(userlogged.getCredential());
            String fullName = String.valueOf(userlogged.getFirstName()) + " " + String.valueOf(userlogged.getLastName());

            String token = jwtUtil.generateToken(subject, fullName);
            return token;
        }
        return "FAIL";
    }

    @RequestMapping(value = "api/authToken")
    public boolean tokenIsValid(@RequestHeader(value = "Authorization") String token) {
        return jwtUtil.validateToken(token);
    }

}
