package edu.miu.inspection.repository;

import edu.miu.inspection.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    User findByEmailAndDeletedFalse(String email);
    User save(User user);

    @Query("SELECT e FROM User e WHERE e.deleted = false")
    Page<User> findAllNotDeleted(Pageable pageable);

    @Query(value = "SELECT i FROM User i " +
            "WHERE i.deleted = false " +
            "AND i.id NOT IN (:inspectorIds) " +
            "AND i.id <> :managerId " +
            "AND i.authorities like '%ROLE_INSPECTOR%'",
            nativeQuery = false)
    Page<User> findAvailableInspectorsNotHiredByManager(@Param("managerId") Long managerId, @Param("inspectorIds") List<Long> inspectorIds, Pageable pageable);

    @Query(value = "SELECT i FROM User i " +
            "WHERE i.deleted = false " +
            "AND i.id IN (:inspectorIds) " +
            "AND i.id <> :managerId " +
            "AND i.authorities like '%ROLE_INSPECTOR%'",
            nativeQuery = false)
    Page<User> findInspectorsHiredByManager(@Param("managerId") Long managerId, @Param("inspectorIds") List<Long> inspectorIds, Pageable pageable);

}
