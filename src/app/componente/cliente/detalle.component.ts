import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente';
import { ClienteService } from './../../service/cliente.service';
import  Swal  from 'sweetalert2';
import { ModalService } from 'src/app/service/modal.service';
import { UsuarioService } from 'src/app/seguridadad/service/usuario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
 @Input()cliente:Cliente= new Cliente();
titulo = 'Detalle del cliente';
 fotoSeleccionada!: File;
 constructor(private service:ClienteService, private ruta: ActivatedRoute, public modal:ModalService, public seguridad:UsuarioService){}
  ngOnInit(): void {

    /*
   this.ruta.paramMap.subscribe(parametro=>{
    let id:number = Number(parametro.get('id'));
    if(id){
      this.service.buscarCliente(id).subscribe(cliente=>{
        this.cliente= cliente;
      })
    }
   })
   */
  }
  seleccionarFoto(event:any){
    this.fotoSeleccionada= event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      Swal.fire('Error al seleccionar imagen: ', 'El archivo debe ser de tipo imagen','error');
      this.fotoSeleccionada;
    }

  }
  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error: ', 'Debe seleccionar una foto','error');
    }else{
      if(this.fotoSeleccionada.type.indexOf('image')<0){
        Swal.fire('Error al seleccionar imagen: ', 'El archivo debe ser de tipo imagen','error');
        this.fotoSeleccionada;
      }else{
    this.service.subirfoto(this.fotoSeleccionada,this.cliente.id).subscribe(data=>{
      this.cliente= data;
      this.modal.notificar.emit(this.cliente);
      Swal.fire('la foto se cargo correctamente! ',`la  foto se ha subido con exito ${data.foto}`,'info');
    })
  }
}
}
cerrarModal(){
  this.modal.cerrarModal()
}
}
