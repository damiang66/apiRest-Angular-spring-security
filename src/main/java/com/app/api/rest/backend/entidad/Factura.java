package com.app.api.rest.backend.entidad;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "facturas")
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private String observacion;
    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAT;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value={"facturas","hibernateLazyInitializer","handler"},allowSetters = true)
    private Cliente cliente;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @JoinColumn(name="factura_id")
    private List<ItemFactura> items;
    @PrePersist
    public void fecha(){
        this.createAT= new Date();
    }
    public Factura(){
        this.items= new ArrayList<>();
    }
    public Double getTotal(){
        Double total = 0.00;
        for(ItemFactura item: items){
            total += item.getImporte();
        }
        return total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Date getCreateAT() {
        return createAT;
    }

    public void setCreateAT(Date createAT) {
        this.createAT = createAT;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<ItemFactura> getItems() {
        return items;
    }

    public void setItems(List<ItemFactura> items) {
        this.items = items;
    }
}
