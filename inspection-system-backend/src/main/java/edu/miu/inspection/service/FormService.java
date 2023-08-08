package edu.miu.inspection.service;

import edu.miu.inspection.model.Form;

import java.util.HashMap;

public interface FormService {

    Form findById(Long id);

    Form createForm(HashMap<String, Object> record);
}
