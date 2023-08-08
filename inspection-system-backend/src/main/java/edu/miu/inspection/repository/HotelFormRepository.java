package edu.miu.inspection.repository;

import edu.miu.inspection.model.HotelForm;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelFormRepository extends PagingAndSortingRepository<HotelForm, Long> {
    HotelForm getById(Long id);
}
