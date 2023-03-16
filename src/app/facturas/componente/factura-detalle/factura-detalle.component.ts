import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent implements OnInit{
  titulo:string = 'Detalle factura'
  factura:Factura= new Factura();
  constructor(private service:ServiceService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.router.paramMap.subscribe(parametro=>{
      let id:number = +parametro.get('id');
      if(id){
        this.service.verFactura(id).subscribe(data=>{
          this.factura=data;
        })
      }
    })

  }

}
