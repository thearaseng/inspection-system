package edu.miu.inspection.controller.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    @GetMapping("/api/admin/tasks")
    public String tasks() {
        return "{}";
    }

}
