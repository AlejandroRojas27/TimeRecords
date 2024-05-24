package com.example.Register.Controllers;

import com.example.Register.Model.UserModel;
import com.example.Register.Services.UserServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StartController {

   @Autowired
   UserServices userServices;

    @RequestMapping(value = "api/userByCredential/{credential}", method = RequestMethod.GET)
    public List<UserModel> findUserByCredential(@PathVariable String credential){return userServices.findUserByCredential(credential);}

    @RequestMapping(value = "api/userByCurp/{curp}", method = RequestMethod.GET)
    public List<UserModel> findUserByCurp(@PathVariable String curp){return userServices.findUserByCurp(curp);}

    @RequestMapping(value = "api/isUserAdmin/{credential}", method = RequestMethod.GET)
    public boolean isUserAdmin(@PathVariable String credential){
       return userServices.isUserAdmin(credential);
    }

}