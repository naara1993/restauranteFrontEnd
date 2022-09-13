

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';


@Injectable({
    providedIn: 'root'
  })
export class Menuservicios{ 


    menuURL = 'http://localhost:8080/menu/';

    constructor(private httpClient: HttpClient) { }


    public lista(): Observable<Menu[]> {
        return this.httpClient.get<Menu[]>(this.menuURL + 'lista');
      }

      public detail(id: number): Observable<Menu> {
        return this.httpClient.get<Menu>(this.menuURL + `detail/${id}`);
      }

      public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.menuURL + `delete/${id}`);
      }

      public save(menu: Menu): Observable<any> {
        return this.httpClient.post<any>(this.menuURL + 'crear', menu);
      }
    
      public update(id: number, menu: Menu): Observable<any> {
        return this.httpClient.put<any>(this.menuURL + `update/${id}`, menu);
      }

    }