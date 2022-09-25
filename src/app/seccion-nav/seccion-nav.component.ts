import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orden } from '../carrito/carritoModels/orden';
import { ordenRealizadasUser } from '../estado-orden/estadoOrdenService/estado';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-seccion-nav',
  templateUrl: './seccion-nav.component.html',
  styleUrls: ['./seccion-nav.component.css']
})
export class SeccionNavComponent implements OnInit {

  show:boolean;
  isLogged = false;
  orden:OrdenDetalle[];
  usuario: NuevoUsuario;
  ord: Orden[] = [];
to:number;
  constructor(private tokenService: TokenService
    ,private router: Router
    ,private carritoService:Carritoservicios
    ,private listaOrdenesUsuarios: ordenRealizadasUser,
    private usuarioServicio: AuthService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.carritoService.detalle().subscribe(
      data => {
        this.orden = data;
        console.log(this.orden);
        
        this.ver(this.orden.length);
      },
      err => {
        console.log(err);
      }
    );

    let User = JSON.parse(localStorage.getItem('User')!);
    this.usuarioServicio.detailName(String(User)).subscribe((data) => {
      this.usuario = data;
      this.listaOrdenesUsuarios.detail(this.usuario.id).subscribe((data) => {
        this.orden = data;
        if(this.orden.length>=0){
          let estado=document.getElementById('estado');
          estado.style.visibility="visible";
        }
        else{
          let estado=document.getElementById('estado');
          estado.style.visibility="hidden";
        }
      });
    });
  }


  
//mostrar cantidad
 ver(cantidad:number){
    let notificacion=document.getElementById('mostrarNotificacion');
    if(cantidad>0){
      notificacion?.classList.add('es-visible');
      notificacion!.append(
        `${cantidad}`
      )
    }
  }
  //salir login
  onLogOut(): void {
this.carritoService.deleteList().subscribe(lista=>{
 });
    this.tokenService.logOut();  
    // window.location.reload();
    this.router.navigate(['/login']);
  }
}


