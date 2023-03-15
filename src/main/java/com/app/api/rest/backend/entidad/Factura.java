package com.app.api.rest.backend.entidad;

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
    private Cliente cliente;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
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
}
