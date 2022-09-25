import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  user:NuevoUsuario;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();   
    }
  }
  onLogin(): void {
    this.authService.detailName(this.nombreUsuario).subscribe(data=>{
      this.user=data;
      localStorage.setItem("User", JSON.stringify(this.user.nombreUsuario));
    })
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        alert('bievenido' + ' ' + data.nombreUsuario);
        this.router.navigate(['']);
      },
      (err) => {
        this.isLogged = false;
        alert('Ocurrio un problema');
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  //suscripcion

  suscripcion() {
    const sus = document.getElementById('su');
    alert('gracias por tu suscripción');
    sus!.innerHTML = '';
  }
}
