import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string = "http://localhost:8080/api/producto"
  constructor(private http:HttpClient) { }
  public buscarProductoPorNombre(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/buscar/${term}`);
  }
}
