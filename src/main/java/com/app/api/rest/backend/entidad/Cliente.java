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
    @JsonIgnoreProperties(value={"cliente","hibernateLazyInitializer","handler"},allowSetters = true)
    private List<Factura> facturas;
    //@PrePersist
    public void PrePersit(){
        this.createAt=new Date();
    }
    public Cliente(){
        this.facturas= new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public List<Factura> getFacturas() {
        return facturas;
    }

    public void setFacturas(List<Factura> facturas) {
        this.facturas = facturas;
    }
}
