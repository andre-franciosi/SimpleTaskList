package com.teste.tasks.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.teste.tasks.dto.TaskCreateDTO;
import com.teste.tasks.dto.TaskUpdateDTO;
import com.teste.tasks.model.TaskModel;
import com.teste.tasks.model.UserModel;
import com.teste.tasks.repository.TaskRepository;
import com.teste.tasks.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    public TaskModel createTask(TaskCreateDTO taskDTO) {
        UserModel user = userRepository.findById(taskDTO.userId())
            .orElseThrow(() -> new RuntimeException("Utilizador não encontrado com o ID: " + taskDTO.userId()));

        TaskModel newTask = new TaskModel();
        newTask.setTitle(taskDTO.title());
        newTask.setDescription(taskDTO.description());
        newTask.setStatus(taskDTO.status());
        newTask.setUser(user);
        
        return taskRepository.save(newTask);
    }

    public List<TaskModel> listTasks(
        @RequestParam(value = "userId") Long userId
    ) {
        UserModel existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Utilizador não encontrado com o ID: " + userId));
            
        return taskRepository.findByUser(existingUser);
    }

    public Optional<TaskModel> updateTask(
        @RequestParam(value = "taskId") Long taskId,
        @RequestBody TaskUpdateDTO taskDto
    ) {
        return taskRepository.findById(taskId)
            .map(existingTask -> {
                if (taskDto.title() != null) {
                    existingTask.setTitle(taskDto.title());
                }
                if (taskDto.description() != null) {
                    existingTask.setDescription(taskDto.description());
                }
                
                return taskRepository.save(existingTask);
            });
    }

    public void deleteTask(
        @RequestParam(value = "taskId") Long taskId
    ) {
        taskRepository.deleteById(taskId);
    }
    
}
