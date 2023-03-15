package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Cliente;
import com.app.api.rest.backend.entidad.Region;
import com.app.api.rest.backend.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {
    @Autowired
    private ClienteRepositorio repositorio;

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        return repositorio.findAll();
    }

    @Override
    public Page<Cliente> listar(Pageable pageable) {
        return repositorio.findAll(pageable);
    }

    @Override
    @Transactional
    public Cliente save(Cliente cliente) {
        return repositorio.save(cliente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
     repositorio.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findById(Long id) {
        return repositorio.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Region> findAllRegiones() {
        return repositorio.findAllRegiones();
    }
}
