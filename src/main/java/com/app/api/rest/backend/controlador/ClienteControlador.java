package com.app.api.rest.backend.controlador;

import com.app.api.rest.backend.entidad.Cliente;
import com.app.api.rest.backend.service.ClienteService;
import com.app.api.rest.backend.service.FotoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;

import java.io.IOException;
import java.net.MalformedURLException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteControlador {
    @Autowired
    private ClienteService service;
    private final Logger log = LoggerFactory.getLogger(ClienteControlador.class);
    @Autowired
    private FotoService fotoService;
    @GetMapping("/cliente/paginar/{page}")
    public ResponseEntity<?> paginar(@PathVariable Integer page){
        Pageable pageable = PageRequest.of(page,4);
        return ResponseEntity.ok(service.listar(pageable));
    }
    @GetMapping("/cliente")
    public ResponseEntity<?>listar(){
        return ResponseEntity.ok().body(service.findAll());
    }
    @Secured({"ROLE_ADMIN"})
    @GetMapping("/cliente/regiones")
    public ResponseEntity<?>listarRegion(){
        return ResponseEntity.ok().body(service.findAllRegiones());
    }
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping("cliente/{id}")
    public ResponseEntity<?> mostrarPorId(@PathVariable Long id){
        Map<String, Object> respuesta = new HashMap<>();
        Optional<Cliente> r = service.findById(id);
        try {
            if (r.isPresent()) {
                return ResponseEntity.ok().body(r.get());
            }


        } catch (DataAccessException e) {
            respuesta.put("mensaje","Error en la base de datos");
            respuesta.put("error",e.getMessage()+ " "+ e.getMostSpecificCause());
            return new ResponseEntity<>(respuesta, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        respuesta.put("mensaje","el cliente con id: "+id.toString() + " "+ "no exite en la base de datos");
        return new ResponseEntity<>(respuesta, HttpStatus.NOT_FOUND);



        //return ResponseEntity.notFound().build();

    }
    @Secured({"ROLE_ADMIN"})
    @PostMapping("/cliente")
    public ResponseEntity<?>guardar(@Valid @RequestBody Cliente cliente,BindingResult result ){
        Map<String,Object>respuesta = new HashMap<>();
        Cliente clienteDb = null;
        if (result.hasErrors()){
            return this.validar(result);
        }
        try {
           clienteDb= service.save(cliente);
           respuesta.put("mensaje","El cliente ha sido creado con exito");
           respuesta.put("cliente",clienteDb);

            return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
        }catch (DataAccessException e){
            respuesta.put("mensaje","Error al guardar en la base de datos");
            respuesta.put("error",e.getMessage()+ " "+ e.getMostSpecificCause());
            return new ResponseEntity<>(respuesta, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @Secured({"ROLE_ADMIN"})
    @PutMapping("/cliente/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody  Cliente cliente,BindingResult result,@PathVariable Long id) {
        Map<String, Object> respuesta = new HashMap<>();
        Cliente clienteDb = null;

        Optional<Cliente> r = service.findById(id);


        try {



            if (r.isPresent()) {
                if (result.hasErrors()) {
                    return this.validar(result);
                }
                clienteDb = r.get();
                clienteDb.setNombre(cliente.getNombre());
                clienteDb.setApellido(cliente.getApellido());
                clienteDb.setEmail(cliente.getEmail());
                clienteDb.setRegion(cliente.getRegion());
                respuesta.put("mensaje", "El cliente fue actualizado");

                service.save(clienteDb);
                respuesta.put("cliente", clienteDb);
                return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
            }

        } catch (DataAccessException e) {
            respuesta.put("mensaje", "error al actualizar a la base de datos");
            respuesta.put("error",e.getMessage()+ " "+ e.getMostSpecificCause());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
        }
        respuesta.put("mensaje","el cliente con id: "+id.toString() + " "+ "no exite en la base de datos");
        return new ResponseEntity<>(respuesta, HttpStatus.NOT_FOUND);
    }
    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("cliente/{id}")
    public ResponseEntity<?>delelte(@PathVariable Long id){
        Map<String,Object>respuesta=new HashMap<>();

        try {
            Optional<Cliente > r = service.findById(id);
            Cliente cliente= r.get();
            String nombreFotoAnterior = cliente.getFoto();
           fotoService.eliminar(nombreFotoAnterior);
            service.delete(id);
            respuesta.put("mensaje", "el cliente fue eliminado con exito");
            return ResponseEntity.status(HttpStatus.OK).body(respuesta);

        }catch (DataAccessException e){
            respuesta.put("error",e.getMessage()+ " "+ e.getMostSpecificCause());
            respuesta.put("mensaje", "el cliente no fue eliminado");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta);

        }


    }
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @PostMapping("cliente/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo")MultipartFile archivo , @RequestParam("id") Long id){
       Map<String,Object> respuesta = new HashMap<>();

       Optional<Cliente> r = service.findById(id);
       Cliente cliente=null;
       if (r.isPresent()){
           cliente= r.get();
           if (!archivo.isEmpty()){
            String nombreArchivo = null;
               try {
                   nombreArchivo=fotoService.copiar(archivo);
               } catch (IOException e) {
                   respuesta.put("error",e.getMessage()+ " ");
                   respuesta.put("mensaje", "error al cargar la foto");
                   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta);
               }
               String nombreFotoAnterior = cliente.getFoto();
               fotoService.eliminar(nombreFotoAnterior);

               cliente.setFoto(nombreArchivo);
               service.save(cliente);
               respuesta.put("cliente", cliente);
               respuesta.put("mensaje", "Ha subido correctamente la imagen"+ nombreArchivo );

           }

       }

        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }
    @GetMapping("/upload/img/{nombreFoto:.+}")
public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){
     Resource recurso = null;
        try {
          recurso=  fotoService.cargar(nombreFoto);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\""+ recurso.getFilename()+"\"");
        return new ResponseEntity<Resource>(recurso,cabecera,HttpStatus.OK);

}
    private ResponseEntity<?>validar(BindingResult result){
        Map<String,Object>respuesta = new HashMap<>();
        result.getFieldErrors().forEach(e->{
            respuesta.put("mensaje","error al realizar la accion");
            respuesta.put(e.getField(), "El campo: " + e.getField() + " " + e.getDefaultMessage());

        });
        return new ResponseEntity<>(respuesta,HttpStatus.NOT_FOUND);
    }


}
