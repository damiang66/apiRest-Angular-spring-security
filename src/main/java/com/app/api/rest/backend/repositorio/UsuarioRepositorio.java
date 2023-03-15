package com.app.api.rest.backend.repositorio;

import com.app.api.rest.backend.entidad.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepositorio extends JpaRepository<Usuario,Long> {
    public Usuario findByUsername(String username);
   // public Usuario findByUsernameAndEmail(String username, String email);
    @Query("select u from Usuario u where u.username=?1")
    public Usuario buscarPorNombre(String username);
}
