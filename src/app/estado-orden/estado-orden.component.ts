import { Component, OnInit } from '@angular/core';
import { Orden } from '../carrito/carritoModels/orden';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { ordenRealizadasUser } from './estadoOrdenService/estado';

@Component({
  selector: 'app-estado-orden',
  templateUrl: './estado-orden.component.html',
  styleUrls: ['./estado-orden.component.css'],
})
export class EstadoOrdenComponent implements OnInit {
  constructor(
    private listaOrdenesUsuarios: ordenRealizadasUser,
    private usuarioServicio: AuthService
  ) {}
  usuario: NuevoUsuario;
  orden: Orden[] = [];
  o: Orden[] = [];
  ngOnInit(): void {
    let User = JSON.parse(localStorage.getItem('User')!);
    this.usuarioServicio.detailName(String(User)).subscribe((data) => {
      this.usuario = data;
      this.listaOrdenesUsuarios.detail(this.usuario.id).subscribe((data) => {
        this.orden = data;
        for (let i = 0; i < this.orden.length; i++) {
          if ((this.orden[i].usuario.id == this.usuario.id)) {    
            this.o.push(this.orden[i]);
          }
        }
      });
    });
  }
}
