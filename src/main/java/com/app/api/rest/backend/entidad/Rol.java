package com.app.api.rest.backend.entidad;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name = "roles")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,length = 20)
    private String nombre;
  //  @ManyToMany(mappedBy = "roles")
  //  private List<Usuario> usuarios;
}
