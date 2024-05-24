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
public class AdminController {

    @Autowired
    UserServices userServices;

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<UserModel> getUsers(){
        return userServices.getUsers();
    }

    @RequestMapping(value = "api/register", method = RequestMethod.POST)
    public void registerUser(@RequestBody UserModel user){

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hashedPassword = argon2.hash(1,1024,1,user.getPassword());

        user.setPassword(hashedPassword);
        userServices.saveUser(user);}

    @RequestMapping(value = "api/updateUser", method = RequestMethod.POST)
    public void updateUser(@RequestBody UserModel user){userServices.updateUser(user);}

    @RequestMapping(value = "api/userById/{id}", method = RequestMethod.GET)
    public String findUserById(@PathVariable Long id){

        //Use ObjectMapper to write a JSON like a String (IT IS NOT A PARSE) from a ObjectModel, we can work with this String in JavaScript as a JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = "";
        try {
            userJson = objectMapper.writeValueAsString(userServices.findUserById(id));
        } catch (JsonProcessingException e) {
            userJson = "ERROR";
            throw new RuntimeException(e);
        }

        return userJson;}

    @RequestMapping(value = "api/deleteUser/{id}", method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable Long id){
        try {
            this.userServices.deleteUser(id);
            return "Se elimino con exito el usuario con id " + id;
        }catch (Exception err){
            return "No pudo eliminar el usuario con id" + id;
        }}

}
