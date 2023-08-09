package edu.miu.inspection.repository;

import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

    Task save(Task task);
    Page<Task> findAllByManagerAndDeletedFalse(User manager, Pageable pageable);
    Page<Task> findAllByInspectorAndDeletedFalse(User manager, Pageable pageable);

}
