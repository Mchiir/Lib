package com.school.library.librarymanagement.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Load environment variables from .env file
    private final Dotenv dotenv;

    public SecurityConfig() {
        dotenv = Dotenv.load(); // Loads the environment variables from .env file
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").authenticated() // Requires authentication for Swagger docs
                        .anyRequest().permitAll() // Allow other requests without authentication
                )
                .httpBasic(Customizer.withDefaults()) // Enables basic authentication
                .csrf(csrf -> csrf.disable()); // Disable CSRF for simplicity (consider your security needs)

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Retrieve username and password from environment variables
        String username = dotenv.get("SPRING_SECURITY_USERNAME"); // Accessing the environment variable for username
        String password = dotenv.get("SPRING_SECURITY_PASSWORD"); // Accessing the environment variable for password

        // Check if the environment variables are not null or empty (optional, but recommended)
        if (username == null || password == null) {
            throw new IllegalArgumentException("Environment variables SPRING_SECURITY_USERNAME or SPRING_SECURITY_PASSWORD not set.");
        }

        // Create a user with credentials from environment variables
        UserDetails user = User.builder()
                .username(username) // Use the username from .env
                .password(passwordEncoder().encode(password)) // Encode the password from .env
                .roles("USER") // Assign roles as needed
                .build();

        return new InMemoryUserDetailsManager(user);
    }
}