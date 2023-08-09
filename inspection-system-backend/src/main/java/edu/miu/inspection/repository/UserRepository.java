package edu.miu.inspection.repository;

import edu.miu.inspection.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    User findByEmailAndDeletedFalse(String email);
    User save(User user);

    @Query("SELECT e FROM User e WHERE e.deleted = false")
    Page<User> findAllNotDeleted(Pageable pageable);

}
