package edu.miu.inspection.model;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User inspector;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    @NotNull
    private String status;

    @NotNull
    private Date dueDate;

    @NotNull
    private String formType;

}
