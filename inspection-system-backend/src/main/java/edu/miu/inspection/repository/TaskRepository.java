package edu.miu.inspection.repository;

import edu.miu.inspection.model.Task;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {

    Task save(Task task);

}
