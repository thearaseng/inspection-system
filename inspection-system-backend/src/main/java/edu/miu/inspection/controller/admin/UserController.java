package edu.miu.inspection.controller.admin;

import edu.miu.inspection.model.User;
import edu.miu.inspection.model.dto.response.UserResponse;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/admin/users/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {

        User user = this.userService.findByEmail(email);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        }

        return ResponseEntity.ok(new UserResponse(user));
    }

}
