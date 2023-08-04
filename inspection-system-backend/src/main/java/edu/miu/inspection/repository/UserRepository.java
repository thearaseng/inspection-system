package edu.miu.inspection.repository;

import edu.miu.inspection.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndDeletedFalse(String email);
    User save(User user);

}
