import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { Cliente } from '../modelo/cliente';
import { Region } from '../modelo/region';
import { UsuarioService } from '../seguridadad/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url="http://localhost:8080/api/cliente";
  private header  = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,private route:Router,private service:UsuarioService ) { }
  private agregarAutorization(){
let token = this.service.token;
if(token!= null){
  return this.header.append('Authorization', "Bearer" + token)
}
return this.header;
  }
  private isNoAutorizado(e:any):boolean{
    if(e.status==401 ){
      if(this.service.isAuthenticated()){
        this.service.logout();
      }
      this.route.navigate(['/login'])
      return true;

    }
    if( e.status==403){
      Swal.fire('Acceso denegado',`hola ${this.service.usuario.username} no tiene acceso a esta seccion`, 'warning');
      this.route.navigate(['/cliente'])
      return true;

    }
    return false;
  }
  regiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.url}/regiones`, {headers:this.agregarAutorization()}).pipe(catchError(e=>{
      this.isNoAutorizado(e);
      return throwError(e);
    }));
  }
  listarPagina(page: number): Observable<any> {
    return this.http.get(this.url + '/paginar/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

  public listar():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}`).pipe(map(map=>{
      let cliente = map as Cliente[];
      return cliente.map(cliente=>{
        cliente.nombre= cliente.nombre.toLocaleUpperCase()
       // cliente.createAt= formatDate(cliente.createAt,"EEEE dd/MMMM/yyyy","en-ES")
        return cliente;
      })
    }),catchError(e=>{
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      return throwError(e);
    }));
  }
  public crear(cliente:Cliente):Observable<any>{
    return this.http.post<any>(this.url,cliente,{headers:this.agregarAutorization()}).pipe(catchError(e=>{
    // if(e.status==404){
      //console.log(e.error);

      //  throwError(e);
     //}
     if(this.isNoAutorizado(e)){
      return throwError(e);
    }
      Swal.fire(e.error.mensaje,e.error.error,"error");

      console.log(e.error.nombre);
      return throwError(e);
    }));
  }
  public buscarCliente(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`,{headers:this.agregarAutorization()}).pipe(catchError(e=>{
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      Swal.fire('Error',e.error.mensaje,"error");
      this.route.navigate(['/cliente'])
      console.log(e.error.mensaje);
      return throwError(e);


    }));
  }
  public editar(cliente:Cliente):Observable<any>{
    return this.http.put<any>(`${this.url}/${cliente.id}`,cliente,{headers:this.agregarAutorization()}).pipe(catchError(e=>{
      Swal.fire(e.error.mensaje,e.error.error,"error");
if(this.isNoAutorizado(e)){
  return throwError(e);
}

      console.log(e.error.mensaje);
      return throwError(e);
    }));
  }
  public delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`,{headers:this.agregarAutorization()}).pipe(catchError(e=>{
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      Swal.fire('Error al Eliminar: ',e.error.mensaje,"error");

      console.log(e.error.mensaje);
      return throwError(e);
    }));
  }
  subirfoto(archivo:File, id:any):Observable<Cliente>{
let formdata = new FormData()
    formdata.append("archivo",archivo);
    formdata.append("id",id);
    let header = new HttpHeaders();
    let token = this.service.token;
    if(token!=null){
      header=header.append('Authorization', "Bearer" + token)
    }
    return this.http.post(`${this.url}/upload`,formdata,{headers:header}).pipe(
      map((respuesta:any)=>respuesta.cliente as Cliente),
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }
}
