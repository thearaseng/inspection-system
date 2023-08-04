package edu.miu.inspection.model.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String location;

    public CreateUserRequest() {
    }

}
