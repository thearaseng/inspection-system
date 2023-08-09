package edu.miu.inspection.service.impl;

import edu.miu.inspection.model.User;
import edu.miu.inspection.repository.UserRepository;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByEmail(username);

        if (user == null)
            throw new UsernameNotFoundException(String.format("No user found with username '%s'", username));
        return user;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.findByEmail(
                String.valueOf(authentication.getPrincipal())
        );
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmailAndDeletedFalse(email);
    }

    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

    @Override
    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public Page<User> getUsersWithPagination(Pageable pageable) {
        return userRepository.findAllNotDeleted(pageable);
    }

    @Override
    public Page<User> getAvailableInspectorsNotHiredByManager(Long managerId, List<Long> inspectorIds, Pageable pageable) {
        return userRepository.findAvailableInspectorsNotHiredByManager(managerId, inspectorIds, pageable);
    }

}
