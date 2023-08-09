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

    @Query(value = "SELECT * FROM user i " +
            "WHERE i.deleted = false " +
            "AND i.id NOT IN (SELECT hi.inspector_id FROM hired_inspectors hi WHERE manager_id = :managerId)" +
            "AND i.id <> :managerId " +
            "AND i.authorities like '%ROLE_INSPECTOR%'",
            nativeQuery = true)
    Page<User> findAvailableInspectorsNotHiredByManager(Long managerId, Pageable pageable);

}
