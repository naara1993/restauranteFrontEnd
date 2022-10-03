import { HttpClient } from '@angular/common/http';
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
  or: Orden[] = [];
  o: Orden[] = [];
  to:number;
  isAdmin=false;
  roles: string[];
  constructor(private tokenService: TokenService
    ,private router: Router
    ,private carritoService:Carritoservicios
    ,private listaOrdenesUsuarios: ordenRealizadasUser,
    private usuarioServicio: AuthService,
    private http: HttpClient
    ) { }
 
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.carritoService.detalle().subscribe(
      data => {
        this.orden = data;
        this.ver(this.orden.length);
      },
      err => {
        console.log(err);
      }
    );
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }); 
    let User = JSON.parse(localStorage.getItem('User')!);
    this.usuarioServicio.detailName(String(User)).subscribe((data) => {
      this.usuario = data;
      this.listaOrdenesUsuarios.detail(this.usuario.id).subscribe((data) => {
        this.ord = data;
        if(this.ord.length>=0){
          console.log(this.ord.length);
          let not =document.getElementById('not');
          let estado=document.getElementById('estado');
          estado.style.visibility="visible";
          not.style.visibility="visible";
        }
        else{
          let estado=document.getElementById('estado');
          let not =document.getElementById('not');
          estado.style.visibility="hidden";
          not.style.visibility="hidden";
        }
      });
    });
    if(this.isAdmin){
      this.listaOrdenesUsuarios.listOrdenes().subscribe(lista => {
        if(lista.length>0){
          let not =document.getElementById('not');
          let estado=document.getElementById('estado');
          estado.style.visibility="visible";
          not.style.visibility="visible";
        }
        else{
          let estado=document.getElementById('estado');
          let not =document.getElementById('not');
          estado.style.visibility="hidden";
          not.style.visibility="hidden";
        }
      })
    }

  }


  
//mostrar cantidad
 ver(cantidad:number){
    let notificacion=document.getElementById('mostrarNotificacion');
    if(cantidad>0){
      notificacion?.classList.add('es-visible');
      notificacion!.append(
        `${cantidad}`
      )
    }else{
      if(notificacion.matches('.es-visible')){
        notificacion.classList.remove('es-visible');
      }
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


