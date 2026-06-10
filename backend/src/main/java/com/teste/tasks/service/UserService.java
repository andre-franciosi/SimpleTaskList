package com.teste.tasks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teste.tasks.dto.UserCreateDTO;
import com.teste.tasks.model.UserModel;
import com.teste.tasks.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    
    public UserModel addUser(
        UserCreateDTO userDTO
    ){
        UserModel newUser = new UserModel();
        newUser.setIdade(userDTO.idade());
        newUser.setName(userDTO.name());
        return userRepository.save(newUser);
    } 

    public List<UserModel> listUsers () {
        return userRepository.findAll();
    }

}
