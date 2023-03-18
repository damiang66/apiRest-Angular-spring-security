package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Producto;
import com.app.api.rest.backend.repositorio.ProductoRespositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class ProductoServiceImpl implements ProductoService{
    @Autowired
    private ProductoRespositorio respositorio;
    @Override
    @Transactional(readOnly = true)
    public List<Producto> findByNombre(String term) {
        return respositorio.findByNombre(term);
    }
}
