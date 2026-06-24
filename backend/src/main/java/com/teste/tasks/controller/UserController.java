package com.teste.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.teste.tasks.dto.UserCreateDTO;
import com.teste.tasks.model.UserModel;
import com.teste.tasks.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<UserModel> addUser(@RequestBody UserCreateDTO userDTO){
        try {
            UserModel newUser = userService.addUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 

    @GetMapping("/user")
    public List<UserModel> listUsers () {
        return userService.listUsers();
    }
}
