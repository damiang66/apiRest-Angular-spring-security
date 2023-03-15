import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { UsuarioService } from 'src/app/seguridadad/service/usuario.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes:Cliente[]=[]
  paginador:any;
  clienteSeleccionado:Cliente = new Cliente();
  constructor(private service:ClienteService, private ruta:ActivatedRoute,private modal:ModalService,public serviceSeguridad:UsuarioService){

  }
  ngOnInit(): void {
 this.todos();
 this.clienteSeleccionado=new Cliente();
  }
eliminar(cliente:Cliente){
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
      this.service.delete(cliente.id).subscribe(data=>{
        Swal.fire(
          'Elimiar',
          'El cliente se elimino con exito.',
          'success'
        )
        this.todos();
      })

      console.log(cliente.id);


    }
  })
}
todos(){
// this.service.listar().subscribe(data=>{
 //   this.clientes=data;
  // })

  this.ruta.paramMap.subscribe(parametro=>{
    let page:number =Number(parametro.get('page'));
    if(!page){
      page=0;
    }
    this.service.listarPagina(page).subscribe(response=>{
      this.clientes = response.content as Cliente[]
       this.paginador= response
      console.log(this.paginador);

    })


})
this.modal.notificar.subscribe(cliente=>{
  this.clientes.map(clienteOriginal=>{
    if(cliente.id==clienteOriginal.id){
clienteOriginal.foto= cliente.foto;
    }
    return clienteOriginal;
  })
})
  }

  abrirModel(cliente:Cliente){
this.clienteSeleccionado=cliente;
this.modal.abrirModal();
  }











}
