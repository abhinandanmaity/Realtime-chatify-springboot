package com.RealtimeChatify.App.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
public class WebConfig implements WebMvcConfigurer{
//

    @Value("${frontend.url}")
    private String frontend;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins(frontend) // Allow React app origin
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedMethods("*")
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow cookies if needed
    }
}
