package com.app.api.rest.backend.repositorio;

import com.app.api.rest.backend.entidad.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepositorio extends JpaRepository<Factura,Long> {
}
