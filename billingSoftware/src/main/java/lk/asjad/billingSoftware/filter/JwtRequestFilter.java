package lk.asjad.billingSoftware.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.asjad.billingSoftware.service.impl.AppUserDetailsService;
import lk.asjad.billingSoftware.utills.JwtUtills;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor

public class JwtRequestFilter extends OncePerRequestFilter {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtills jwtUtills;
    private final UserDetailsService userDetailsService;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
       final String authorizationHeader = request.getHeader("Authorization");

       String email = null;
       String jwt = null;

       if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
           jwt = authorizationHeader.substring(7);
           email = jwtUtills.extractUsername(jwt);

       }

       if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
           UserDetails userDetails = userDetailsService.loadUserByUsername(email);
           if(jwtUtills.validateToken(jwt, userDetails)) {
               UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
               authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(authenticationToken);
           }
       }

       filterChain.doFilter(request, response);

    }
}
