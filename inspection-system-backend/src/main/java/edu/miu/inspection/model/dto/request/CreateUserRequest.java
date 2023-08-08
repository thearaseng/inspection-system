package edu.miu.inspection.model.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateUserRequest {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String phone;
    private String location;
    private List<String> authorities;

    public CreateUserRequest() {
    }

}
