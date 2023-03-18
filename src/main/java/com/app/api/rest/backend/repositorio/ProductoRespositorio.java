package com.app.api.rest.backend.repositorio;

import com.app.api.rest.backend.entidad.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRespositorio extends JpaRepository<Producto,Long> {
    @Query("select p from Producto p where p.nombre like %?1%")
    public List<Producto>findByNombre(String term);
    // otra manera
    public List<Producto>findByNombreContainingIgnoreCase(String term);
}
