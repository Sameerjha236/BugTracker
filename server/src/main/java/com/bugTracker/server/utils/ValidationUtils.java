package com.bugTracker.server.utils;

import java.util.regex.Pattern;

public class ValidationUtils {
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z\\s]{2,50}$");
    private static final Pattern PASSWORD_PATTERN =
            Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$");

    // Validate name (only letters & spaces, length 2–50)
    public static boolean isValidName(String name) {
        return name != null && NAME_PATTERN.matcher(name).matches();
    }

    // Validate password (min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char)
    public static boolean isValidPassword(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }
}
