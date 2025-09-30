package com.bugTracker.server.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())   // modern way to disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/user/login", "/api/user/signup", "/api/user/deleteUser", "/api/user/hello", "/api/project/createProject","/api/project/addUser","/api/project/updateUserRole","/api/project/removeUser").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}

