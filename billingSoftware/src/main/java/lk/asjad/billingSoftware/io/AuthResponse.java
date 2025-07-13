package lk.asjad.billingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class AuthResponse {
    private String token;
    private String email;
    private String role;
}
