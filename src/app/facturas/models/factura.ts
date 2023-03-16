import { Cliente } from "src/app/modelo/cliente";
import { Itemfactura } from "./itemfactura";

export class Factura {
  id:number;
  descripcion:string;
  observacion:string;
  items:Itemfactura[]=[];
  cliente:Cliente;
  total:number;
  createAt:string;

}
