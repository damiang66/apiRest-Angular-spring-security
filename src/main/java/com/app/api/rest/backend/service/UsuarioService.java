package com.app.api.rest.backend.service;

import com.app.api.rest.backend.entidad.Usuario;
import com.app.api.rest.backend.repositorio.UsuarioRepositorio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService  implements IUsuarioService, UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(UsuarioService.class);
    @Autowired
    private UsuarioRepositorio repositorio;
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = repositorio.findByUsername(username);
        if(usuario== null){
            logger.error("Usuario no exiteste");
            throw new UsernameNotFoundException("El usuario no exiteste");
        }
        List<GrantedAuthority> authorities = usuario.getRoles()
                .stream()
                .map(role->new SimpleGrantedAuthority(role.getNombre()))
                .peek(authority->logger.info("Role: "+ authority.getAuthority()))
                .collect(Collectors.toList());

        return new User(usuario.getUsername(), usuario.getPassword(),usuario.isEnabled(),true,true,true,authorities);
    }

    @Override
    public Usuario buscarPorNombre(String nombre) {
        return repositorio.buscarPorNombre(nombre);
    }
}
