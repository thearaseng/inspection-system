package edu.miu.inspection.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import edu.miu.inspection.serialization.CustomDateSerializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
public class Task {

    private static final long serialVersionUID = -2338626292552177485L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User inspector;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    @NotNull
    private String location;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @NotNull
    private String status;

    @NotNull
    @JsonSerialize(using = CustomDateSerializer.class)

    private Date dueDate;

    @NotNull
    private String formType;

    private boolean deleted;

}
