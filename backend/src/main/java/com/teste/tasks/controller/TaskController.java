package com.teste.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teste.tasks.dto.TaskCreateDTO;
import com.teste.tasks.dto.TaskUpdateDTO;
import com.teste.tasks.model.TaskModel;
import com.teste.tasks.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://localhost:4200"})
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @PostMapping("/task")
    public ResponseEntity<TaskModel> createTask(
        @RequestBody TaskCreateDTO taskCreateDto
    ) 
    {
        TaskModel newTask = taskService.createTask(taskCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }

    @GetMapping("/task")
    public ResponseEntity<List<TaskModel>> listTasks(
        @RequestParam(value = "userId") Long userId
    ) {
        List<TaskModel> tasks = taskService.listTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    @PatchMapping("/task")
    public ResponseEntity<TaskModel> updateTask(
        @RequestParam(value = "taskId") Long taskId,
        @RequestBody TaskUpdateDTO taskDto
    ) {
        return taskService.updateTask(taskId, taskDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/task")
    public void deleteTask(
        @RequestParam(value = "taskId") Long taskId
    ) {
        taskService.deleteTask(taskId);
    }
}