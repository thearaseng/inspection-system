package edu.miu.inspection.model.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageableResponse<T> {

    private Long totalElements;
    private Integer totalPages;
    private Integer number;
    private Integer size;
    private Integer numberOfElements;
    private List<T> content;

}
