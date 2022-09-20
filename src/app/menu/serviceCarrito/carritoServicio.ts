

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenDetalle } from '../ordenDetalle/odenDetalle';
import { Menu } from '../models/menu';



@Injectable({
    providedIn: 'root'
  })
export class Carritoservicios{ 


    carritoURL = 'http://localhost:8080/gestionPedidos';


    constructor(private httpClient: HttpClient) {    }



    public addCart(id: number, cantidad:number): Observable<any> {
      return this.httpClient.post<any>(this.carritoURL +`/cart/${id}/${cantidad}`,{ title: 'Angular POST Request Example' });
    }

    
    public lista(): Observable<OrdenDetalle[]> {
      return this.httpClient.get<OrdenDetalle[]>(this.carritoURL + '/lista');
    }

    public detalle(): Observable<OrdenDetalle[]> {
      return this.httpClient.get<OrdenDetalle[]>(this.carritoURL + '/lis');
    }


    public deleteList(): Observable<OrdenDetalle> {
      return this.httpClient.get<OrdenDetalle>(this.carritoURL + '/deleteList');
    }


}
  
