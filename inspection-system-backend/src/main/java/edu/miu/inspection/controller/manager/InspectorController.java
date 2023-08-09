package edu.miu.inspection.controller.manager;

import edu.miu.inspection.model.User;
import edu.miu.inspection.model.dto.request.FireInspectorRequest;
import edu.miu.inspection.model.dto.request.HireInspectorRequest;
import edu.miu.inspection.model.dto.response.PageableResponse;
import edu.miu.inspection.model.dto.response.UserResponse;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class InspectorController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/manager/inspectors")
    public ResponseEntity<PageableResponse<User>> getInspectorsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        User manager = this.userService.getCurrentUser();
        List<Long> inspectorIds = manager.getInspectors().stream().map(User::getId).toList();
        Page<User> userPage = this.userService.getAvailableInspectorsNotHiredByManager(manager.getId(), inspectorIds, pageRequest);

        PageableResponse<User> response = new PageableResponse<>();
        response.setContent(userPage.getContent());
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalPages(userPage.getTotalPages());
        response.setNumber(page);
        response.setSize(size);
        response.setNumberOfElements(userPage.getNumberOfElements());

        return ResponseEntity.ok(response);

    }

    @GetMapping("/api/manager/available-inspectors")
    public ResponseEntity<PageableResponse<User>> getAvailableInspectorsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        User manager = this.userService.getCurrentUser();
        List<Long> inspectorIds = manager.getInspectors().stream().map(User::getId).toList();
        Page<User> userPage = this.userService.getAvailableInspectorsNotHiredByManager(manager.getId(), inspectorIds, pageRequest);

        PageableResponse<User> response = new PageableResponse<>();
        response.setContent(userPage.getContent());
        response.setTotalElements(userPage.getTotalElements());
        response.setTotalPages(userPage.getTotalPages());
        response.setNumber(page);
        response.setSize(size);
        response.setNumberOfElements(userPage.getNumberOfElements());

        return ResponseEntity.ok(response);

    }

    @PostMapping("/api/manager/inspectors")
    public ResponseEntity<UserResponse> hireInspector(@RequestBody HireInspectorRequest request) {

        User inspector = this.userService.findById(request.getInspectorId());
        User manager = this.userService.getCurrentUser();
        manager.getInspectors().add(inspector);
        this.userService.save(manager);

        return ResponseEntity.ok(new UserResponse(inspector));
    }

    @DeleteMapping("/api/manager/inspectors")
    public ResponseEntity<UserResponse> fireInspector(@RequestBody FireInspectorRequest request) {

        User inspector = this.userService.findById(request.getInspectorId());
        User manager = this.userService.getCurrentUser();
        manager.getInspectors().remove(inspector);
        this.userService.save(manager);

        return ResponseEntity.ok(new UserResponse(inspector));
    }

}
