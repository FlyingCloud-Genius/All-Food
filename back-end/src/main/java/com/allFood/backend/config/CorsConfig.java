package com.allFood.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //path cross section
                registry.addMapping("/**")
                        //region set
                        .allowedOrigins("*")
                        //allow cookie
                        .allowCredentials(true)
                        //request methods
                        .allowedMethods("GET","POST", "PUT", "DELETE")
                        //head information
                        .allowedHeaders("*")
                        //exposed header
                        .exposedHeaders("Header1", "Header2");
            }
        };
    }
}