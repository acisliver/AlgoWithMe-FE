package com.nakaligoba.backend.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.nakaligoba.backend.domain.JwtYmlValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

    @Autowired
    private JwtYmlValue jwtYmlValue;
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER = "Bearer ";

    public String getEmailFromJwt(String jwt) {
        return JWT.require(Algorithm.HMAC512(jwtYmlValue.getSecretKey())).build().verify(jwt).getSubject();
    }

    public String getTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER)) {
            return bearerToken.substring(7);
        }

        return "";
    }
}