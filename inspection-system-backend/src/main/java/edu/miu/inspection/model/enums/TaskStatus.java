package edu.miu.inspection.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TaskStatus {

    CREATED("CREATED"),
    IN_PROGRESS("IN_PROGRESS"),
    DONE("DONE");

    private final String value;

}
