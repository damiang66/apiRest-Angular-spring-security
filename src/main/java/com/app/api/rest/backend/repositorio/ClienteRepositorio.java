package com.app.api.rest.backend.repositorio;

import com.app.api.rest.backend.entidad.Cliente;
import com.app.api.rest.backend.entidad.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente,Long> {
    @Query("from Region")
    List<Region> findAllRegiones();
}
