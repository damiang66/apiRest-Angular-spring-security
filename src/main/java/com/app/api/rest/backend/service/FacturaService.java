package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Factura;

public interface FacturaService {
    public Factura findById(Long id);
    public Factura save(Factura factura);
    public void delete(Long id);

}
