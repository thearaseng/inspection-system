package edu.miu.inspection.controller.admin;

import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.User;
import edu.miu.inspection.model.dto.request.CreateUserRequest;
import edu.miu.inspection.model.dto.response.PageableResponse;
import edu.miu.inspection.model.dto.response.UserResponse;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/api/admin/users/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {

        User user = this.userService.findByEmail(email);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found");
        }

        return ResponseEntity.ok(new UserResponse(user));
    }

    @PostMapping("/api/admin/users")
    public ResponseEntity<UserResponse> save(@RequestBody CreateUserRequest userRequest) {

        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setPhone(userRequest.getPhone());
        user.setLocation(userRequest.getLocation());
        user.setAuthorities(String.join(",", userRequest.getAuthorities()));
        user.setEnabled(true);
        user.setDeleted(false);

        this.userService.save(user);

        return ResponseEntity.ok(new UserResponse(user));
    }

    @GetMapping("/api/admin/users")
    public ResponseEntity<PageableResponse<User>> getUsersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<User> taskPage = this.userService.getUsersWithPagination(pageRequest);

        PageableResponse<User> response = new PageableResponse<>();
        response.setContent(taskPage.getContent());
        response.setTotalElements(taskPage.getTotalElements());
        response.setTotalPages(taskPage.getTotalPages());
        response.setNumber(page);
        response.setSize(size);
        response.setNumberOfElements(taskPage.getNumberOfElements());

        return ResponseEntity.ok(response);

    }

}
