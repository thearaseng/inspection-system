package edu.miu.inspection.service;

import edu.miu.inspection.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    Task save(Task task);
    Page<Task> getTasksWithPagination(Pageable pageable);

    Task findById(Long id);
}
