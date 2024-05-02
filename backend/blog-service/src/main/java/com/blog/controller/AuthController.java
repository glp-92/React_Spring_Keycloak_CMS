package com.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.model.dto.LoginRequest;
import com.blog.model.dto.LoginResponse;
import com.blog.model.dto.RefreshTokenRequest;
import com.blog.model.dto.RevokeTokenRequest;
import com.blog.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	
	@GetMapping("/valid")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> validateToken() {
		Jwt user = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		boolean userEntityExists = authService.createUserEntityIfNotExists(user);
		if (!userEntityExists) {
			System.out.println("Creada nueva entidad de usuario");
		}
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(
			@RequestBody LoginRequest request) {
		try {
			LoginResponse response = authService.login(request);
			if (response != null) {
				return ResponseEntity.status(HttpStatus.OK).body(response);
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<LoginResponse> tokenRefresh(
			@RequestBody RefreshTokenRequest request) {
		try {
			LoginResponse response = authService.refreshToken(request);
			if (response != null) {
				return ResponseEntity.status(HttpStatus.OK).body(response);
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@PostMapping("/revoke")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> tokenRevoke(
			@RequestBody RevokeTokenRequest request) {
	    try {
	        boolean success = authService.revokeToken(request);
	        if (success) {
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	        } else {
	            return ResponseEntity.badRequest().build();
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

			

}
