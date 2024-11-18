package com.school.library.librarymanagement.model;
// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class User {
    @Id
    private Long id;

    @NotBlank(message = "Email or phone number is mandatory")
    @Size(min = 5, max = 50, message = "Contact must be between 5 and 50 characters")
    // @Pattern(regexp = "^(.+)@(.+)$|^[0-9]{10}$", message = "Provide a valid email or phone number")
    private String contact; // Can be an email or phone number

    @NotBlank(message = "First username is mandatory")
    @Size(min = 3, max = 50, message = "First username must be between 3 and 50 characters")
    private String firstUsername;

    @NotBlank(message = "Last username is mandatory")
    @Size(min = 3, max = 50, message = "Last username must be between 3 and 50 characters")
    private String lastUsername;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    private String password;


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstUsername() {
        return firstUsername;
    }

    public void setFirstUsername(String firstUsername) {
        this.firstUsername = firstUsername;
    }

    public String getLastUsername() {
        return lastUsername;
    }

    public void setLastUsername(String lastUsername) {
        this.lastUsername = lastUsername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
}