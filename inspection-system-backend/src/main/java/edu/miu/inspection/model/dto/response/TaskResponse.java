package edu.miu.inspection.model.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import edu.miu.inspection.model.Task;
import edu.miu.inspection.serialization.CustomDateSerializer;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskResponse {

    private Long id;
    private Long inspectorId;
    private Long formId;

    @JsonSerialize(using = CustomDateSerializer.class)
    private Date dueDate;
    private String status;

    public TaskResponse(Task task) {
        this.id = task.getId();
        this.inspectorId = task.getInspector().getId();
        this.formId = task.getForm().getId();
        this.dueDate = task.getDueDate();
        this.status = task.getStatus();
    }

}
