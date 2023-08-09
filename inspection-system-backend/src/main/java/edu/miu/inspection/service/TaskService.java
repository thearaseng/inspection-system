package edu.miu.inspection.service;

import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    Task save(Task task);
    Page<Task> getTasksWithPagination(Pageable pageable);

    Page<Task> findAllByManager(User manager, Pageable pageable);

    Page<Task> findAllByInspector(User inspector, Pageable pageable);

    Task findById(Long id);
}
