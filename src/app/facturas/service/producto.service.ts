import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { UsuarioService } from './../../seguridadad/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string = "http://localhost:8080/api/producto"
  constructor(private http:HttpClient,private service:UsuarioService) { }

  private header  = new HttpHeaders({'Content-Type':'application/json'});
  private agregarAutorization(){
    let token = this.service.token;
    if(token!= null){
      return this.header.append('Authorization', "Bearer" + token)
    }
    return this.header;
      }
  public buscarProductoPorNombre(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/buscar/${term}`,{headers:this.agregarAutorization()});
  }
}
