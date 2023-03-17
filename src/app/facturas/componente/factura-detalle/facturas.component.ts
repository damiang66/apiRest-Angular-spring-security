import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit{
  titulo:string = "Nueva Factura";
  factura:Factura = new Factura();
  constructor(private serviceFactura:ServiceService,private router: ActivatedRoute, private serviceCliente:ClienteService){}
  ngOnInit(): void {
    this.router.paramMap.subscribe(parametro=>{
      let clienteId:number= +parametro.get('clienteId');
      if (clienteId){
        this.serviceCliente.buscarCliente(clienteId).subscribe(cliente=>{
          this.factura.cliente=cliente;
        })
      }

    })

  }

}
