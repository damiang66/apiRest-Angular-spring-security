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
import { Itemfactura } from '../../models/itemfactura';

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
let nuevoItem = new Itemfactura();
nuevoItem.producto=producto;
this.factura.items.push(nuevoItem);
this.autoCompletarControl.setValue("");
event.option.focus();
event.option.deselect();
}
}
