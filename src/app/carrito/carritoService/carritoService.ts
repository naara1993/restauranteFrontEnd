

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../carritoModels/orden';



@Injectable({
    providedIn: 'root'
  })
export class carritoService{ 


    menuURL = 'http://localhost:8080/gestionPedidos';

    constructor(private httpClient: HttpClient) { }


      public eliminar(id: number): Observable<any> {
      return this.httpClient.get<any>(this.menuURL + `/delete/cart/${id}`);
      }


      public saveOrder(id: number): Observable<Orden> {
        return this.httpClient.get<Orden>(this.menuURL + `/save/${id}`);
        }



    }