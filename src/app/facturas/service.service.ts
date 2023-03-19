import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from './models/factura';
import { UsuarioService } from '../seguridadad/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
url:string = "http://localhost:8080/api/factura"
  constructor(private http:HttpClient,private service:UsuarioService) { }
  private header  = new HttpHeaders({'Content-Type':'application/json'});
  private agregarAutorization(){
    let token = this.service.token;
    if(token!= null){
      return this.header.append('Authorization', "Bearer" + token)
    }
    return this.header;
      }
public verFactura(id:number):Observable<Factura>{
  return this.http.get<Factura>(`${this.url}/${id}`,{headers:this.agregarAutorization()});
}
public delete(id:number):Observable<void>{
 return this.http.delete<void>(`${this.url}/${id}`,{headers:this.agregarAutorization()});
}
public crear(factura:Factura):Observable<Factura>{
  return this.http.post<Factura>(this.url,factura,{headers:this.agregarAutorization()});
}

}
