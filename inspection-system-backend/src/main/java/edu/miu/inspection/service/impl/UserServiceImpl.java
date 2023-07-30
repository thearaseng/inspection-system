package edu.miu.inspection.service.impl;

import edu.miu.inspection.model.User;
import edu.miu.inspection.repository.UserRepository;
import edu.miu.inspection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User users() {
        return this.userRepository.user();
    }

}
