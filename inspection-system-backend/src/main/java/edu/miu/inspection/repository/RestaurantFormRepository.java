package edu.miu.inspection.repository;

import edu.miu.inspection.model.RestaurantForm;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantFormRepository extends PagingAndSortingRepository<RestaurantForm, Long> {

}
