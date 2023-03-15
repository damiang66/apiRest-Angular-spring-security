package com.app.api.rest.backend.entidad;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank

    @Size(min = 4, max = 12)
    private String nombre;
    @NotBlank(message = "no puede estar vacio")
    private String apellido;
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;
    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    @NotNull
    private Date createAt;
    private String foto;
    @NotNull(message = "no puede estar vacio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private Region region;
    @OneToMany(fetch =FetchType.LAZY, mappedBy = "cliente",cascade = CascadeType.ALL)
    private List<Factura> facturas;
    //@PrePersist
    public void PrePersit(){
        this.createAt=new Date();
    }
    public Cliente(){
        this.facturas= new ArrayList<>();
    }

}
