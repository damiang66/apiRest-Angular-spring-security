import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  logout() {
    this._token=null;
    this._usuario=null;
    //sessionStorage.clear()
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
  }

private _usuario:Usuario;
private _token:string;


  constructor(private http:HttpClient) { }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if (this._token ==null && sessionStorage.getItem("token")!=null){
     this._token= sessionStorage.getItem('token');
     console.log(this._token);
      return this._token;
    }
  return null;
      }



  public get usuario():Usuario{
if(this._usuario!=null){
  return this._usuario;
}else if (this._usuario ==null && sessionStorage.getItem("usuario")!=null){
 return this._usuario= JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
 console.log(this._usuario);

}
return new Usuario()
  }
  login(usuario:Usuario):Observable<any>{
    const url = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp'+ ':' + '123456');
    const htttpHeader= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
  'Authorization':'Basic ' + credenciales});
  let params = new URLSearchParams();
  params.set('grant_type' ,'password');
  params.set('username',String(usuario.username));
  params.set('password',String(usuario.password));
return this.http.post<any>(url,params.toString(),{headers:htttpHeader})
  }
  guardarToken(acessToken: string) {
this._token= acessToken;
sessionStorage.setItem("token", this._token);
  }
  guardarUsuario(accessToken: string) {
    let payload= this.obtenerDatosToken(accessToken);
this._usuario = new Usuario();
this._usuario.username= payload.user_name;


this._usuario.roles = payload.authorities;
sessionStorage.setItem("usuario",JSON.stringify(this._usuario));
  }
  obtenerDatosToken(accessToken: string):any{
    if(accessToken!= null){
      let token=   JSON.parse(atob(accessToken.split(".")[1]));
    console.log("token"+token);
    return token;


    }
    return null;

  }
  isAuthenticated():boolean{
    let payload = JSON.stringify(this.obtenerDatosToken(this.token));
    console.log("payload : " +payload );

    if (sessionStorage.getItem('token')){
      return true;
    }
    return false;
  }
  rol(rol:string):boolean{
    if(this.usuario.roles.includes(rol)){
      return true;
    }
    return false;

  }
}
