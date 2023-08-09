package edu.miu.inspection.controller.manager;

import edu.miu.inspection.model.User;
import edu.miu.inspection.model.dto.response.PageableResponse;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InspectorController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/manager/available-inspectors")
    public ResponseEntity<PageableResponse<User>> getAvailableInspectorsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        User manager = this.userService.getCurrentUser();
        Page<User> userPage = this.userService.getAvailableInspectorsNotHiredByManager(manager.getId(), pageRequest);

        PageableResponse<User> response = new PageableResponse<>();
        response.setContent(userPage.getContent());
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalPages(userPage.getTotalPages());
        response.setNumber(page);
        response.setSize(size);
        response.setNumberOfElements(userPage.getNumberOfElements());

        return ResponseEntity.ok(response);

    }

}
