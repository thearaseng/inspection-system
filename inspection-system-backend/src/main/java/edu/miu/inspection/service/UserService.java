package edu.miu.inspection.service;

import edu.miu.inspection.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findByEmail(String email);
    User findById(Long id);
    User save(User user);

    Page<User> getUsersWithPagination(Pageable pageable);
}
