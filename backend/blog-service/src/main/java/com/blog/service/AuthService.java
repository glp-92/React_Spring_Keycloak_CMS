package com.blog.service;

import org.springframework.security.oauth2.jwt.Jwt;

import com.blog.model.dto.auth.LoginRequest;
import com.blog.model.dto.auth.LoginResponse;
import com.blog.model.dto.auth.RefreshTokenRequest;
import com.blog.model.dto.auth.RevokeTokenRequest;

public interface AuthService {
	LoginResponse login(LoginRequest request);
	LoginResponse refreshToken(RefreshTokenRequest request);
	boolean revokeToken(RevokeTokenRequest request);
	boolean createUserEntityIfNotExists(Jwt user);
}
