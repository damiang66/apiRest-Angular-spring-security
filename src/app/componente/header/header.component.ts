import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../seguridadad/service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public service:UsuarioService, private ruta:Router){

  }
  ngOnInit(): void {
    /*if(this.service.isAuthenticated(){

    })*/
  }
  titulo: string = 'App Angular'
  logout(){
    let usuername = this.service.usuario.username;
    Swal.fire("Info: ", `sesion cerrada de usuario: ${usuername} ` ,'info')
    this.service.logout();

    this.ruta.navigate(['/login'])


  }
}
