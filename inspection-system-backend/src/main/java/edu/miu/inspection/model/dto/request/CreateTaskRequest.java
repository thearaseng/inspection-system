package edu.miu.inspection.model.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class CreateTaskRequest {

    private Long inspectorId;
    private Long formId;
    private Date dueDate;

}
