import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { FormControl } from '@angular/forms';
import { flatMap, map, mergeMap, Observable, startWith } from 'rxjs';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../service/producto.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Itemfactura } from './../../models/itemfactura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit{
  titulo:string = "Nueva Factura";
  factura:Factura = new Factura();
  autoCompletarControl = new FormControl();
  productos: Producto[]=[];
  filtrarOpciones: Observable<Producto[]>;
  constructor(private serviceFactura:ServiceService,private router: ActivatedRoute, private serviceCliente:ClienteService,private servicioProducto:ProductoService){}
  ngOnInit(): void {
    this.router.paramMap.subscribe(parametro=>{
      let clienteId:number= +parametro.get('clienteId');
      if (clienteId){
        this.serviceCliente.buscarCliente(clienteId).subscribe(cliente=>{
          this.factura.cliente=cliente;
        })
      }

    })
    this.filtrarOpciones = this.autoCompletarControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value: value.nombre),
      mergeMap(value => value ? this._filter(String(value)): [])
    );
  }





  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

   return this.servicioProducto.buscarProductoPorNombre(filterValue);
   //return this.productos;


}
mostrarNombre(producto?:Producto):string |undefined{
  return producto? producto.nombre: undefined;
}
seleccionarProducto(event:MatAutocompleteSelectedEvent){
let producto = event.option.value as Producto;
if(this.existeItem(producto.id)){
  this.incrementarCantidad(producto.id)
}else{
let nuevoItem = new Itemfactura();
nuevoItem.producto=producto;
this.factura.items.push(nuevoItem);
this.autoCompletarControl.setValue("");
event.option.focus();
event.option.deselect();
}
}
actualizarCantidad(id:number,event:any):void{
let cantidad:number =event.target.value as number;
if(cantidad==0){

return this.eliminarItem(id);
}


this.factura.items= this.factura.items.map((i:Itemfactura)=>{
  if(id===i.producto.id){
    i.cantidad=cantidad;

  }
  return i;
})


}
existeItem(id:number):boolean{
let existe = false
  this.factura.items.forEach((item:Itemfactura)=>{
    if(id===item.producto.id){
      existe=true;
    }

  });
  return existe;

}
incrementarCantidad(id:number):void{
  this.factura.items= this.factura.items.map((i:Itemfactura)=>{
    if(id===i.producto.id){
      i.cantidad++;

    }
    return i;
  })
}
eliminarItem(id:number){
  this.factura.items =  this.factura.items.filter((item:Itemfactura)=>id !== item.producto.id)


}
}
