package com.classroom.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PasswordValidator {
    @Value("${security.password.min-length}")
    private int minLength;

    @Value("${security.password.require-uppercase}")
    private boolean requireUppercase;

    @Value("${security.password.require-lowercase}")
    private boolean requireLowercase;

    @Value("${security.password.require-numbers}")
    private boolean requireNumbers;

    @Value("${security.password.require-special-chars}")
    private boolean requireSpecialChars;

    public boolean validate(String password) {
        if (password == null || password.length() < minLength) {
            return false;
        }

        if (requireUppercase && !password.matches(".*[A-Z].*")) {
            return false;
        }

        if (requireLowercase && !password.matches(".*[a-z].*")) {
            return false;
        }

        if (requireNumbers && !password.matches(".*\\d.*")) {
            return false;
        }

        if (requireSpecialChars && !password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            return false;
        }

        return true;
    }

    public String getPasswordRequirements() {
        StringBuilder requirements = new StringBuilder("A senha deve ter pelo menos " + minLength + " caracteres");
        
        if (requireUppercase) {
            requirements.append(", uma letra maiúscula");
        }
        if (requireLowercase) {
            requirements.append(", uma letra minúscula");
        }
        if (requireNumbers) {
            requirements.append(", um número");
        }
        if (requireSpecialChars) {
            requirements.append(", um caractere especial");
        }
        
        return requirements.toString();
    }
} 