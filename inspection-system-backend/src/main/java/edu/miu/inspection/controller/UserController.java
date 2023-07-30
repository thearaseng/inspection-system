package edu.miu.inspection.controller;

import edu.miu.inspection.model.User;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/users")
    public User users() {
        return this.userService.users();
    }

}
