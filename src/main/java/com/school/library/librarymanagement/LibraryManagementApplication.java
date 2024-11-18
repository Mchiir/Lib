package com.school.library.librarymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibraryManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }
}

// swagger-ui doc http://localhost:8080/swagger-ui/index.html
// cridentials are in config.SecurityConfig
// json swagger: http://localhost:8080/v3/api-docs
