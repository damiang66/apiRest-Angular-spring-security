package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Usuario;

public interface IUsuarioService {
    public Usuario buscarPorNombre(String nombre);
}
