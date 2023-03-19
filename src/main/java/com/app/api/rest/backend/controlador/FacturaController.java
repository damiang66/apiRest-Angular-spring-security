package com.app.api.rest.backend.controlador;

import com.app.api.rest.backend.entidad.Factura;
import com.app.api.rest.backend.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api")
public class FacturaController {
    @Autowired
    private FacturaService service;
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping("/factura/{id}")
    public ResponseEntity<?> unaFactura(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));

    }
    @Secured({ "ROLE_ADMIN"})
    @DeleteMapping("/factura/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @Secured({ "ROLE_ADMIN"})
    @PostMapping("/factura")
    public ResponseEntity<?>crear(@RequestBody Factura factura){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(factura));
    }
}
