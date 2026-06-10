package com.teste.tasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teste.tasks.model.TaskModel;
import com.teste.tasks.model.UserModel;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {

    List<TaskModel> findByUser(UserModel user);
}