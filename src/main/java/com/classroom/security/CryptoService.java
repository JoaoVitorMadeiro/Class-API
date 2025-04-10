package com.classroom.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

@Service
public class CryptoService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final TextEncryptor emailEncryptor;
    private final String secretKey = "sua-chave-secreta-aqui"; // Em produção, use uma chave segura e armazene em variáveis de ambiente

    public CryptoService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.emailEncryptor = Encryptors.text(secretKey, "1234567890abcdef");
    }

    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public boolean matchesPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public String encryptEmail(String email) {
        return emailEncryptor.encrypt(email);
    }

    public String decryptEmail(String encryptedEmail) {
        return emailEncryptor.decrypt(encryptedEmail);
    }
} 