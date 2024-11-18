package com.school.library.librarymanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.school.library.librarymanagement.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByContact(String contact);

    boolean existsByContact(String contact);

    boolean existsById(Long id);

    Optional<User> findByFirstUsernameAndLastUsername(String firstUsername, String lastUsername);
}