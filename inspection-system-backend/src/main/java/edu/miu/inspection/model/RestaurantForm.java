package edu.miu.inspection.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class RestaurantForm extends Form {

    @NotNull
    private String restaurantName;
    @NotNull
    private Integer seatingCapacity;
    @NotNull
    private Integer kitchenHygiene;
    @NotNull
    private Integer foodSafetyCompliance;
    @NotNull
    private Integer serviceQuality;
    @NotNull
    private Integer customerSatisfaction;
    @NotNull
    private Integer healthInspectionScore;

}
