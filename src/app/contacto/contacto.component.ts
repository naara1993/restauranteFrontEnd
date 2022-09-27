import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  nombre: String = '';
  email: String = '';
  message: String = '';
  constructor() {}

  ngOnInit(): void {}

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

  //suscripcion

  suscripcion() {
    const sus = document.getElementById('su');
    alert('gracias por tu suscripción');
    sus!.innerHTML = '';
  }
}
