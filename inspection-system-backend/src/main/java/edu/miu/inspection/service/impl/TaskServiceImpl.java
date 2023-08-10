package edu.miu.inspection.service.impl;

import edu.miu.inspection.exception.NotFoundException;
import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.User;
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
    public Page<Task> findAllByManager(User manager, Pageable pageable) {
        return taskRepository.findAllByManagerAndDeletedFalse(manager, pageable);
    }

    @Override
    public Page<Task> findAllByInspector(User inspector, Pageable pageable) {
        return taskRepository.findAllByInspectorAndDeletedFalse(inspector, pageable);
    }

    @Override
    public Task findById(Long id) {
        Task task = this.taskRepository.findByIdAndDeletedFalse(id);

        if (task == null) {
            throw new NotFoundException(String.format("No task found with id '%s'", id));
        }

        return task;
    }

}
