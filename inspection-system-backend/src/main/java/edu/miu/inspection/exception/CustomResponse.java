package edu.miu.inspection.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomResponse<T> {
    private int statusCode;
    private String message;
    private T data;
}

