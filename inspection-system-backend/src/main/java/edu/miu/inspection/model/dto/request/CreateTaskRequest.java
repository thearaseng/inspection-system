package edu.miu.inspection.model.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class CreateTaskRequest {

    private String title;
    private Long inspectorId;
    private String formType;
    private String location;
    private Date dueDate;

}
