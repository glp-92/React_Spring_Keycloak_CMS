package com.blog.service;

import org.springframework.security.oauth2.jwt.Jwt;

import com.blog.model.dto.LoginRequest;
import com.blog.model.dto.LoginResponse;
import com.blog.model.dto.RefreshTokenRequest;
import com.blog.model.dto.RevokeTokenRequest;

public interface AuthService {
	LoginResponse login(LoginRequest request);
	LoginResponse refreshToken(RefreshTokenRequest request);
	boolean revokeToken(RevokeTokenRequest request);
	boolean createUserEntityIfNotExists(Jwt user);
}
