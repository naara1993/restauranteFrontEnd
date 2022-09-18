import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
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


  constructor(private tokenService: TokenService,private router: Router,private carritoService:Carritoservicios) { }

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



  }


  

 ver(cantidad:number){
    let notificacion=document.getElementById('mostrarNotificacion');
    notificacion!.append(
      `${cantidad}`
    )
  }
  
  onLogOut(): void {
    this.tokenService.logOut();
   
    // window.location.reload();
    this.router.navigate(['/login']);
    
  }
}


