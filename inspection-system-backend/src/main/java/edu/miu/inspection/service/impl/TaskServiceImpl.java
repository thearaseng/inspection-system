package edu.miu.inspection.service.impl;

import edu.miu.inspection.model.Task;
import edu.miu.inspection.repository.TaskRepository;
import edu.miu.inspection.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task save(Task task) {
        return this.taskRepository.save(task);
    }

    @Override
    public Page<Task> getTasksWithPagination(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    @Override
    public Task findById(Long id) {
        return this.taskRepository.findById(id).orElse(null);
    }

}
