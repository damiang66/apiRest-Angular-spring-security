import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente';
import { ClienteService } from './../../service/cliente.service';
import  Swal  from 'sweetalert2';
import { ModalService } from 'src/app/service/modal.service';
import { UsuarioService } from 'src/app/seguridadad/service/usuario.service';
import { ServiceService } from 'src/app/facturas/service.service';
import { Factura } from './../../facturas/models/factura';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
 @Input()cliente:Cliente = new Cliente();


titulo = 'Detalle del cliente';
 fotoSeleccionada!: File;
 constructor(private serviceFactura:ServiceService,private service:ClienteService, private ruta: ActivatedRoute, public modal:ModalService, public seguridad:UsuarioService){}
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
eliminarFactura(factura:Factura){
  Swal.fire({
    title: 'Eliminar?',
    text: "Esta seguro que desea eliminar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.serviceFactura.delete(factura.id).subscribe(data=>{
        this.cliente.facturas = this.cliente.facturas.filter(f=>f !==factura);
        Swal.fire(
          'Elimiar',
          'La Factura se elimino con exito.',
          'success'
        )
     //   this.todos();
      })




    }
  })


}
}
