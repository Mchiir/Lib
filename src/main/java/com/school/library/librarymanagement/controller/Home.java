package com.school.library.librarymanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
    @GetMapping("/")
    public String welcome() {
        return "<h1>Welcome to Library Management System's logic.</h1> <br /> <a href=\"http://localhost:8080/swagger-ui/index.html\"> Swagger doc</a>";
    }
}