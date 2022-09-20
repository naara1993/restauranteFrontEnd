import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css']
})
export class RegistroLoginComponent implements OnInit {

  usuario:NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  isLogged = false;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }


  onRegister(){
    console.log("sdsd");
    
    this.usuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.usuario).subscribe(
      _data => {
        alert('cuenta creada')
        this.router.navigate(['/login']);
      },
      err => {
        alert(err+"error");
      }
    );
  }


  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

//suscripcion 
suscripcion(){
  const sus=document.getElementById('su');
   alert("gracias por tu suscripción");
   sus!.innerHTML = "";
}
}
