

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
export class carritoService{ 


    menuURL = 'http://localhost:8080/gestionPedidos';

    constructor(private httpClient: HttpClient) { }


      public eliminar(id: number): Observable<any> {
      return this.httpClient.get<any>(this.menuURL + `/delete/cart/${id}`);
      }


    }