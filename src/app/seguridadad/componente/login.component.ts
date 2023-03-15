import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import  Swal  from 'sweetalert2';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Login'
  usuario:Usuario = new Usuario()
  constructor(private service:UsuarioService, private ruta:Router){}
  ngOnInit(): void {
if (this.service.isAuthenticated()){
  Swal.fire('Login','ya se encentra registrado','info');
  this.ruta.navigate(['/cliente']);
}
  }
login(){
console.log(this.usuario)
if(this.usuario.password== null || this.usuario.username===null || this.usuario.username.length==0  || this.usuario.password.length==0){
Swal.fire('Error Login', 'usuario o password vacio','error');
return
}
this.service.login(this.usuario).subscribe(data=>{

  this.service.guardarUsuario(data.access_token);
  this.service.guardarToken(data.access_token);
  let usuario = this.service.usuario;

this.ruta.navigate(['/cliente']);
Swal.fire('Login', `Hola  ${this.usuario.username} Bienvenido`,'success');
},error=>{
  if (error.status==400){
    Swal.fire('Error :', "usuario o contraseña incorrecto", 'error')
  }
})
}
}
