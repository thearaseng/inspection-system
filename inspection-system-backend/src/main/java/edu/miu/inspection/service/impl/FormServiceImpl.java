package edu.miu.inspection.service.impl;

import edu.miu.inspection.model.Form;
import edu.miu.inspection.repository.FormRepository;
import edu.miu.inspection.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    private FormRepository formRepository;

    @Override
    public Form findById(Long id) {
        return this.formRepository.getById(id);
    }
}
