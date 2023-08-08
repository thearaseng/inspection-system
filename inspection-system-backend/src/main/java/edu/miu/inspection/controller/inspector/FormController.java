package edu.miu.inspection.controller.inspector;

import edu.miu.inspection.model.Form;
import edu.miu.inspection.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class FormController {

    @Autowired
    private FormService formService;

    @PostMapping("/api/inspector/forms")
    public ResponseEntity<Form> createForm(@RequestBody HashMap<String, Object> request) {
        Form form = this.formService.createForm(request);
        return ResponseEntity.ok(form);
    }

}
