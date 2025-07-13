package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.UserRequest;
import lk.asjad.billingSoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);



}
