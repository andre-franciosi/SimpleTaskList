package com.teste.tasks;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.teste.tasks.dto.StandardErrorDTO;

import java.time.Instant;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<StandardErrorDTO> entityNotFound(RuntimeException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        
        StandardErrorDTO error = new StandardErrorDTO(
            Instant.now(),
            status.value(),
            "Recurso não encontrado",
            e.getMessage(),
            request.getRequestURI()
        );
        
        return ResponseEntity.status(status).body(error);
    }
}
