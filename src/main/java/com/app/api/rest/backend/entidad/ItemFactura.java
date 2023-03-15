package com.app.api.rest.backend.entidad;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity

@Table(name = "factura_item")
public class ItemFactura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer cantidad;
    @ManyToMany(fetch = FetchType.LAZY)
    private Producto producto;
    public Double getImporte(){
        return cantidad.doubleValue()*producto.getPrecio();
    }
}
