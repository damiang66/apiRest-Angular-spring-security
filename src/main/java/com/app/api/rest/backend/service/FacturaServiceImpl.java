package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Factura;
import com.app.api.rest.backend.repositorio.FacturaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class FacturaServiceImpl implements  FacturaService{
    @Autowired
    private FacturaRepositorio repositorio;

    @Override
    @Transactional(readOnly = true)
    public Factura findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Factura save(Factura factura) {
        return repositorio.save(factura);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repositorio.deleteById(id);
    }
}
