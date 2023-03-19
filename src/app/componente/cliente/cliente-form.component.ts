import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente';
import { ClienteService } from './../../service/cliente.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from 'src/app/modelo/region';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  titulo =""
  error:any =""
  cliente:Cliente = new Cliente();
  errores:string =String([]);
  regiones:Region[]=[];
  constructor(private service:ClienteService,private route:Router,private ruta:ActivatedRoute){

  }
  ngOnInit(): void {
    this.ruta.paramMap.subscribe(parametro=>{
      const id:number= Number(parametro.get('id'));
      if (id){
        this.service.buscarCliente(id).subscribe(data=>{
          this.cliente= data;
          this.titulo ="Editar Cliente"
        })
      }else{
        this.titulo="Crear cliente"
      }

    })
    this.service.regiones().subscribe(r=>{
      this.regiones=r;
    })

  }
crear(){
  this.service.crear(this.cliente).subscribe(data=>{
    console.log(data);

    Swal.fire(data.mensaje,`cliente ${this.cliente.nombre} se creo con exito`,'success')
this.route.navigate(['/cliente']);


  },e=>{



    if(e.status==404 || e.status==500){
      this.error=e.error
      //this.errores=e
    //console.log(this.errores);




    }

  })


}
compararRegion(o1:Region,o2:Region){
  //if(o1===undefined && o2=== undefined){
  //  return true;
  //}
  return o1===null || o2===null ||o2===undefined || o1===undefined? true: o1.id===o2.id;

}
editar(cliente:Cliente){
this.cliente.facturas=null;

this.service.editar(this.cliente).subscribe(data=>{
  console.log(data);
  Swal.fire('Cliente Actualizado',`cliente ${data.cliente.nombre} se actualizo con exito`,'success')
  this.route.navigate(['/cliente']);
},e=>{
  if(e.status==404 || e.status==500){
    this.error=e.error
  }
})
}
}
