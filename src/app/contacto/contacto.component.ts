import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  nombre: String = '';
  email: String = '';
  message: String = '';
  usuario: NuevoUsuario;
  constructor(private usuarioServicio: AuthService) {}

  ngOnInit(): void {
    // window.addEventListener('scroll', function () {
    //   let header= document.getElementById('head');
    //   let scroll = document.documentElement.scrollTop;
    //   header.classList.toggle('transparent',scroll>10);
    // });
    let txtNombre=<HTMLInputElement>document.getElementById('txtNombre');
    let txtEmail=<HTMLInputElement>document.getElementById('txtEmail');
    let User = JSON.parse(localStorage.getItem('User')!);
    this.usuarioServicio.detailName(String(User)).subscribe((data) => {
      this.usuario = data;
      txtNombre.value=this.usuario.nombre;
      txtEmail.value=this.usuario.email;
    });
  }

  //enviar mensaje
  onContacto(): void {
    let form = document.getElementById('form');
    const modal = document.getElementById('exampleModal');
    let txtNombre = document.getElementById('txtNombre');
    let txtEmail = document.getElementById('txtEmail');
    let txtMensaje = document.getElementById('txtMensaje');
    modal!.classList.add('es-visible');
    modal!.style.display = 'flex';
    setTimeout(() => {
      modal!.classList.remove('es-visible');
    }, 10000);

    fetch('https://formsubmit.co/ajax/45bd78d5881f981685b9bfe21feece38', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: this.nombre,
        email: this.email,
        message: this.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    this.nombre = '';
    this.email = '';
    this.message = '';
  }

}
