package com.school.library.librarymanagement.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.school.library.librarymanagement.model.User;
import com.school.library.librarymanagement.repository.UserRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Use the PasswordEncoder bean

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        // Check if the user exists
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (!existingUserOpt.isPresent()) {
            throw new IllegalArgumentException("User ID is invalid or does not exist.");
        }

        User existingUser = existingUserOpt.get();

        // Update fields
        existingUser.setContact(updatedUser.getContact());
        existingUser.setFirstUsername(updatedUser.getFirstUsername());
        existingUser.setLastUsername(updatedUser.getLastUsername());

        // Update password if provided (you might want to check if it's not null)
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        // Save the updated user
        return userRepository.save(existingUser);
    }

    public User saveUser(User user) {
        // Check for duplicate contact
        if (userRepository.findByContact(user.getContact()).isPresent()) {
            throw new IllegalArgumentException("A user with this contact already exists.");
        }

        // Ensure ID is not auto-generated and does not already exist
        if (user.getId() != null && userRepository.existsById(user.getId())) {
            throw new IllegalArgumentException("User ID is invalid or already exists.");
        }
        if (user.getId() != null && userRepository.existsByContact(user.getContact())) {
            throw new IllegalArgumentException("User Contact is invalid or already exists.");
        }


        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public List<User> saveUsers(List<User> users) {
        for (User user : users) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.saveAll(users);
    };

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByContact(String contact) {
        return userRepository.findByContact(contact);
    }

    public Optional<User> getUserByFullName(String firstUsername, String lastUsername) {
        return userRepository.findByFirstUsernameAndLastUsername(firstUsername, lastUsername);
    }
}