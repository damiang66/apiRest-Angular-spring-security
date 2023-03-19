import { Cliente } from "src/app/modelo/cliente";
import { Itemfactura } from "./itemfactura";

export class Factura {
  id:number;
  descripcion:string;
  observacion:string;
  items:Itemfactura[]=[];
  cliente:Cliente;
  total:number;
  createAT:string;

  calcularTotal():number{
    this.total=0
    this.items.forEach((item: Itemfactura)=>{
      this.total= this.total + item.calcularImporte();
    })
    return this.total;

  }

}
