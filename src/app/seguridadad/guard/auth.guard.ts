import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:UsuarioService, private ruta: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.isAuthenticated()){
      if(this.isTokenExpirado()){
        this.service.logout();
        this.ruta.navigate(['/login'])
      }
      return true;
    }
    this.ruta.navigate(['/login'])
     return false;
  }
isTokenExpirado():boolean{
  let token = this.service.token;
  let payload = this.service.obtenerDatosToken(token);
  let now = new Date().getTime()/1000;
  if(payload.exp<now){
    return true;
  }
  return false;
}
}
