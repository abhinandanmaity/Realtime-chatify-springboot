package com.RealtimeChatify.App.config;

import com.RealtimeChatify.App.exceptions.ApiException;
import com.RealtimeChatify.App.services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

//        String requestPath = request.getRequestURI();
//        if (requestPath.startsWith("/api/friend-requests/")) {
//            filterChain.doFilter(request, response); // Skip JWT validation
//            return;
//        }
        System.out.println("authHeader ");
        System.out.println(authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            System.out.println("Jwt token does not begin with Bearer");
//            throw new ApiException("Jwt token does not begin with Bearer");
            return;
        }

        final String jwt = authHeader.substring(7);

//        try {

            final String userName = jwtService.extractUserName(jwt);

            System.out.println("token : " + jwt);
            System.out.println("userName : " + userName);
            Authentication authentication
                    = SecurityContextHolder.getContext().getAuthentication();

            if (userName != null && authentication == null) {

                //Authenticate
                UserDetails userDetails
                        = userDetailsService.loadUserByUsername(userName);

//                System.out.println("auth : " + jwtService.isTokenValid(jwt, userDetails));

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken
                            = new UsernamePasswordAuthenticationToken(userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );
                    SecurityContextHolder.getContext()
                            .setAuthentication(authenticationToken);

                    System.out.println("Authorization Header: " + authHeader);
                    System.out.println("Authentication: " + SecurityContextHolder.getContext().getAuthentication());


                    System.out.println("JWT Token is valid.");
//                    System.out.println("Authentication: " + SecurityContextHolder.getContext().getAuthentication());

                } else {

                    // Invalid jwt token
                    System.out.println("Invalid Jwt token");
//                    throw new ApiException("Invalid Jwt token");
                }
            }

//        }catch (IllegalArgumentException e) {
//
//            System.out.println("Unable to get Jwt token");
//            throw new ApiException("Failed to extract username from JWT token");
//        } catch (ExpiredJwtException e) {
//
//            System.out.println("Jwt token has expired");
//            throw new ApiException("Jwt token has expired");
//        } catch (MalformedJwtException e) {
//
//            System.out.println("invalid jwt token");
//            throw new ApiException("invalid jwt token");
//        }

        filterChain.doFilter(request,response);
    }
}
