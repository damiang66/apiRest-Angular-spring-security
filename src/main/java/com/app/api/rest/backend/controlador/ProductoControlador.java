package com.app.api.rest.backend.controlador;

import com.app.api.rest.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api")
public class ProductoControlador {
    @Autowired
    ProductoService service;
    @GetMapping("producto/buscar/{term}")
    public ResponseEntity<?>buscarPorNombre(@PathVariable String term){
        return ResponseEntity.ok().body(service.findByNombre(term));
    }
}
