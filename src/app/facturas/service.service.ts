import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from './models/factura';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
url:string = "http://localhost:8080/api/factura"
  constructor(private http:HttpClient) { }
public verFactura(id:number):Observable<Factura>{
  return this.http.get<Factura>(`${this.url}/${id}`);
}
public delete(id:number):Observable<void>{
 return this.http.delete<void>(`${this.url}/${id}`);
}

}
