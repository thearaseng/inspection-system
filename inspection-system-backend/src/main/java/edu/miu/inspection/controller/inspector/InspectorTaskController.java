package edu.miu.inspection.controller.inspector;

import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.dto.response.PageableResponse;
import edu.miu.inspection.service.TaskService;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InspectorTaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @GetMapping("/api/inspector/tasks")
    public ResponseEntity<PageableResponse<Task>> getTasksWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Task> taskPage = taskService.findAllByInspector(this.userService.getCurrentUser(), pageRequest);

        PageableResponse<Task> response = new PageableResponse<>();
        response.setContent(taskPage.getContent());
        response.setTotalElements(taskPage.getTotalElements());
        response.setTotalPages(taskPage.getTotalPages());
        response.setNumber(page);
        response.setSize(size);
        response.setNumberOfElements(taskPage.getNumberOfElements());

        return ResponseEntity.ok(response);

    }

}
