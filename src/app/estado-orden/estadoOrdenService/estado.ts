import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ordenRealizadasUser {
 
  OrdenListaUsuariosURL = ' http://localhost:8080/gestionPedidos/';

  constructor(private httpClient: HttpClient) { }
  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.OrdenListaUsuariosURL + `listaOrdenesUsuario/${id}`);
  }
}
