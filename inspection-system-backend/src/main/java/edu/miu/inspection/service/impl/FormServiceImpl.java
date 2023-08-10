package edu.miu.inspection.service.impl;

import edu.miu.inspection.exception.GenericException;
import edu.miu.inspection.exception.NotFoundException;
import edu.miu.inspection.model.Form;
import edu.miu.inspection.model.HotelForm;
import edu.miu.inspection.model.RestaurantForm;
import edu.miu.inspection.model.Task;
import edu.miu.inspection.model.enums.FormType;
import edu.miu.inspection.model.enums.TaskStatus;
import edu.miu.inspection.repository.HotelFormRepository;
import edu.miu.inspection.repository.RestaurantFormRepository;
import edu.miu.inspection.service.FormService;
import edu.miu.inspection.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    private HotelFormRepository hotelFormRepository;
    @Autowired
    private RestaurantFormRepository restaurantFormRepository;
    @Autowired
    private TaskService taskService;

    @Override
    public Form findById(Long id) {
        return this.hotelFormRepository.getById(id);
    }

    @Override
    public Form createForm(HashMap<String, Object> record) {

        String formType = (String) record.get("formType");
        Long taskId = Long.valueOf(record.get("taskId").toString());
        boolean isSubmitted = record.get("summited") != null && (Boolean) record.get("summited");
        Task task = this.taskService.findById(taskId);

        if (TaskStatus.DONE.getValue().equals(task.getStatus())) {
            throw new GenericException(String.format("Task with id '%s' was already '%s'", task.getId(), task.getStatus()));
        }

        Form form;

        if (FormType.HOTEL.getValue().equals(formType)) {
            form = this.saveHotelForm(task.getForm(), record);
        } else if (FormType.RESTAURANT.getValue().equals(formType)) {
            form = this.saveRestaurantForm(task.getForm(), record);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }

        task.setForm(form);
        task.setStatus(isSubmitted ? TaskStatus.DONE.getValue() : TaskStatus.IN_PROGRESS.getValue());
        taskService.save(task);
        return form;

    }

    private Form saveHotelForm(Form existingForm, HashMap<String, Object> record) {

        HotelForm form;

        if (existingForm != null) {
            form = this.hotelFormRepository.getById(existingForm.getId());
        } else {
            form = new HotelForm();
        }

        form.setHotelName            ((String)  record.get("hotelName"              ));
        form.setNumberOfRooms        ((Integer) record.get("numberOfEmployees"      ));
        form.setNumberOfEmployees    ((Integer) record.get("numberOfEmployees"      ));
        form.setCleanlinessScore     ((Integer) record.get("cleanlinessScore"       ));
        form.setFireSafetyCompliance ((Integer) record.get("fireSafetyCompliance"   ));
        form.setRoomServiceQuality   ((Integer) record.get("roomServiceQuality"     ));
        form = this.hotelFormRepository.save(form);
        return form;
    }

    private Form saveRestaurantForm(Form existingForm, HashMap<String, Object> record) {

        RestaurantForm form;

        if (existingForm != null) {
            form = this.restaurantFormRepository.getById(existingForm.getId());
        } else {
            form = new RestaurantForm();
        }

        form.setRestaurantName         ((String)  record.get("restaurantName"          ));
        form.setSeatingCapacity        ((Integer) record.get("seatingCapacity"         ));
        form.setKitchenHygiene         ((Integer) record.get("kitchenHygiene"          ));
        form.setFoodSafetyCompliance   ((Integer) record.get("foodSafetyCompliance"    ));
        form.setServiceQuality         ((Integer) record.get("serviceQuality"          ));
        form.setCustomerSatisfaction   ((Integer) record.get("customerSatisfaction"    ));
        form.setHealthInspectionScore  ((Integer) record.get("healthInspectionScore"   ));
        form = this.restaurantFormRepository.save(form);
        return form;
    }

}
