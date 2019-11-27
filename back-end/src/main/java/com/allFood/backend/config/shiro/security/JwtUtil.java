package com.allFood.backend.config.shiro.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtil.class);

    //verifying the token
    public static boolean verify(String token, String secretKey) {
        LOGGER.info("verifying the token...");
        String temp = token.substring(4);
        try {
            String secret = getClaim(token, SecurityConst.ACCOUNT) + secretKey;
            LOGGER.info("verifying: " + getClaim(token, SecurityConst.ACCOUNT));
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            verifier.verify(temp);
            return true;
        } catch (Exception e) {
            LOGGER.info("bad token received");
            return false;
        }
    }

    //get the claim body in the token
    public static String getClaim(String token, String claim) {
        if (token == null || token.length() < 4 || !token.substring(0,4).equals("JWT ")){
            LOGGER.warn("invalid token!!");
            return null;
        }
        String temp = token.substring(4);
        try {
            DecodedJWT jwt = JWT.decode(temp);
            return jwt.getClaim(claim).asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    //creating a new account
    public static String sign(String account, String secretKey) {
        LOGGER.info("signing a new token...");
        String secret = account + secretKey;
        //expired time: one day long(unit: millisec)
        Date expiredTime = new Date(System.currentTimeMillis() + 24*60*60*1000L);
        Algorithm algorithm = Algorithm.HMAC256(secret);

        String token =  JWT.create()
                .withClaim(SecurityConst.ACCOUNT, account)
                .withClaim(SecurityConst.CURRENT_TIME_MILLIS, System.currentTimeMillis())
                .withExpiresAt(expiredTime)
                .sign(algorithm);

        return token;
    }
}
