package edu.miu.inspection.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum FormType {

    RESTAURANT("RESTAURANT"),
    HOTEL("HOTEL");

    private final String value;

}
