package com.example.Register.Controllers;

import com.example.Register.Model.SaveTimeModel;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaveTimeController {


    @RequestMapping(value = "api/saveTime/in")
    public void saveTime(@RequestBody SaveTimeModel saveTimeModel){

        System.out.println(saveTimeModel.getCredential() + " | " + saveTimeModel.getTime());
    }


}
