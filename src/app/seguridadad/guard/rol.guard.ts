import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';
import Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private service:UsuarioService, private ruta:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   if(!this.service.isAuthenticated()){
    this.ruta.navigate(['/login'])
    return false;
   }

   let rol = route.data['role'] as string;
   if(this.service.rol(rol)){
    return true;
   }
    Swal.fire('Acceso denegado', 'no tiene permiso a esta ruta', 'warning');
    this.ruta.navigate(['/cliente'])
       return false;


  }

}
