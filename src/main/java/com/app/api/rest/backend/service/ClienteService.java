package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Cliente;
import com.app.api.rest.backend.entidad.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ClienteService {
    public List<Cliente>findAll();
    public Page<Cliente> listar (Pageable pageable);
    public Cliente save(Cliente cliente);
    void delete (Long id);
    Optional<Cliente> findById(Long id);
    List<Region>findAllRegiones();
}
