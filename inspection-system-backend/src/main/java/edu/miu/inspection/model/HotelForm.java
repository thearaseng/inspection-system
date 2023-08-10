package edu.miu.inspection.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class HotelForm extends Form {

    @NotNull
    private String hotelName;
    @NotNull
    private Integer numberOfRooms;
    @NotNull
    private Integer numberOfEmployees;
    @NotNull
    private Integer cleanlinessScore;
    @NotNull
    private Integer fireSafetyCompliance;
    @NotNull
    private Integer roomServiceQuality;

}
