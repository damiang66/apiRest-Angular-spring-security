package com.app.api.rest.backend.controlador;

import com.app.api.rest.backend.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api")
public class FacturaController {
    @Autowired
    private FacturaService service;
    @GetMapping("/factura/{id}")
    public ResponseEntity<?> unaFactura(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));

    }
    @DeleteMapping("/factura/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
