import { Component, OnInit } from '@angular/core';
import { Orden } from '../carrito/carritoModels/orden';
import { carritoService } from '../carrito/carritoService/carritoService';
import { Menu } from '../menu/models/menu';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { TokenService } from '../service/token.service';
import { ordenRealizadasUser } from './estadoOrdenService/estado';

@Component({
  selector: 'app-estado-orden',
  templateUrl: './estado-orden.component.html',
  styleUrls: ['./estado-orden.component.css'],
})
export class EstadoOrdenComponent implements OnInit {
  constructor(
    private listaOrdenesUsuarios: ordenRealizadasUser,
    private usuarioServicio: AuthService,
    private tokenService: TokenService,
    private ordenServicio: Carritoservicios,
    private ordServicio:carritoService
  ) {}
  usuario: NuevoUsuario;
  orden: Orden[] = [];
  o: Orden[] = [];
  ord: Orden[] = [];
  roles: string[];
  isAdmin = false;

  ngOnInit(): void {
    let User = JSON.parse(localStorage.getItem('User')!);
    this.usuarioServicio.detailName(String(User)).subscribe((data) => {
      this.usuario = data;
      this.listaOrdenesUsuarios.detail(this.usuario.id).subscribe((data) => {
        this.orden = data;
        for (let i = 0; i < this.orden.length; i++) {
          if (this.orden[i].usuario.id == this.usuario.id) {
            this.o.push(this.orden[i]);
          }
        }
      });
    });
    this.listaOrdenesUsuarios.listOrdenes().subscribe((lista) => {
      this.orden = lista;
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  menu: any[] = [];
  total: any;
  mostrar(id: number) {
    let modal = document.getElementById('modal');
    this.ordenServicio.lista().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].orden.id == id) {
          this.menu = data.filter((i) => i.orden.id == id);
          this.total = data[i].orden.total;
        }
      }
    });
    modal.classList.add('es-visible');
  }

  cerrar() {
    let modal = document.getElementById('modal');
    if (modal.matches('.es-visible')) {
      modal.classList.remove('es-visible');
    }
  }

  cancelar(id:number){
    this.ordServicio.delete(id).subscribe(data =>{
     alert("orden eliminada");
     window.location.reload();
    });
}
}
