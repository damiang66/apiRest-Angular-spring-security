package com.app.api.rest.backend.auth;

import com.app.api.rest.backend.entidad.Usuario;
import com.app.api.rest.backend.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
@Component
public class InfoAdicionalToken implements TokenEnhancer {
    @Autowired
    private IUsuarioService usuarioService;
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
Usuario usuario = usuarioService.buscarPorNombre(oAuth2Authentication.getName());
        Map<String,Object> info = new HashMap<>();
        info.put("Nombre_usuario", usuario.getUsername());
info.put("info adicional", "hola que tal".concat(oAuth2Authentication.getName()));
        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(info);
        return oAuth2AccessToken;
    }
}
