import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css'],
})
export class RegistroLoginComponent implements OnInit {
  usuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  isLogged = false;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  listUser: NuevoUsuario[] = [];
  ListUser() {
    this.authService.ListUser().subscribe((user) => {
      this.listUser = user;
    });
  }
  validar: boolean = false;
  onRegister() {
    this.usuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password
    );
    for (let i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].nombreUsuario == this.nombreUsuario) {
        this.validar = true;
      }
      if (this.listUser[i].email == this.email) {
        this.validar = true;
      }
    }

    this.authService.nuevo(this.usuario).subscribe(
      (_data) => {
        alert('cuenta creada');
        this.router.navigate(['/login']);
      },
      (err) => {
        if (this.validar) {
          alert(
            'error ingreso un nombre de usuario repetido o el email ya se encuentra registrado'
          );
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.ListUser();
  }

  //suscripcion
  suscripcion() {
    const sus = document.getElementById('su');
    alert('gracias por tu suscripción');
    sus!.innerHTML = '';
  }
}
