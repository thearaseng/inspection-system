package edu.miu.inspection.repository;

import edu.miu.inspection.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    public User user() {
        return new User("111", "John", "Doe");
    }

}
