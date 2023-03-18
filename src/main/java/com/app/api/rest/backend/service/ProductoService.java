package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Producto;

import java.util.List;

public interface ProductoService {
    public List<Producto> findByNombre(String term);
}
