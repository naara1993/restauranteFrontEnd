import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  isLogged: boolean;
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    window.addEventListener('scroll', function () {
      const seccionNosotros = document.getElementById('contenedor-div');
      const wow= document.getElementById('wow');
      const tarjetas= document.getElementById('tarjetas');
      let scroll = document.documentElement.scrollTop;
      wow.classList.toggle('slideInDown',scroll>200);
      wow.style.visibility="visible";
      tarjetas.classList.toggle('fadeInPut',scroll>200);
      seccionNosotros.classList.toggle('mostrar-contenedor-div', scroll > 1200);
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();

    // window.location.reload();
    this.router.navigate(['/login']);
  }

  abrirModal(): void {
    const abrirModal = document.getElementById('modal1');
    const esVisible = 'es-visible';
    abrirModal?.classList.add(esVisible);
  }
  cerrarModal(): void {
    const abrirModal = document.getElementById('modal1');
    if (abrirModal?.matches('.es-visible')) {
      abrirModal?.classList.remove('es-visible');
    }
  }
}
