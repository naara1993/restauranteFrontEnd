import { Component, Input, OnInit } from '@angular/core';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Menuservicios } from '../menu/service/MenuService';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { carritoService } from './carritoService/carritoService';
import{Menu} from '../menu/models/menu'
import { AuthService } from '../service/auth-service';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
orden:OrdenDetalle[]=[];
totalF=0;
menu:Menu[]=[];
usuario:NuevoUsuario;
  constructor(
    private ordenServicio:Carritoservicios,
    private menuServicios:Menuservicios,
    private carritoServicio:carritoService,
    private usuarioServicio:AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
this.listaDetalle();
let  User = JSON.parse(localStorage.getItem("User")!);
this.usuarioServicio.detailName(String(User)).subscribe(data => {
  this.usuario=data;
})
// console.log(User);

  }
verificar():void{
  let numeroTarjeta1=<HTMLInputElement>document.getElementById('numeroTarjeta1');
  let numeroTarjeta2=<HTMLInputElement>document.getElementById('numeroTarjeta2');
  let numeroTarjeta3=<HTMLInputElement>document.getElementById('numeroTarjeta3');
  let numeroTarjeta4=<HTMLInputElement>document.getElementById('numeroTarjeta4');
  let purchase=<HTMLInputElement>document.getElementById('purchase');
  let month=<HTMLInputElement>document.getElementById('month');
  let cardholder=<HTMLInputElement>document.getElementById('cardholder');
  let year=<HTMLInputElement>document.getElementById('year');
  const efectivo=<HTMLInputElement>document.getElementById('efectivo');
  let cvc=<HTMLInputElement>document.getElementById('cvc');
  if(efectivo.checked){
    numeroTarjeta1.disabled=true;
    numeroTarjeta2.disabled=true;
    numeroTarjeta3.disabled=true;
    numeroTarjeta4.disabled=true;
    cardholder.disabled=true;
    month.disabled=true;
    year.disabled=true;
    cvc.disabled=true;
    purchase.disabled=true;
  }else{
    numeroTarjeta1.disabled=false;
    numeroTarjeta2.disabled=false;
    numeroTarjeta3.disabled=false;
    numeroTarjeta4.disabled=false;
    cardholder.disabled=false;
    month.disabled=false;
    year.disabled=false;
    cvc.disabled=false;
    purchase.disabled=false;
  }
}

listaDetalle(){
  let n=0;
  this.menuServicios.lista().subscribe(lista => {
    this.menu=lista;
  })
  this.ordenServicio.detalle().subscribe(detalle => {
    this.orden=detalle;
    this.sumarTotal(this.orden.length)
  });
}
//mostrar total
sumarTotal(cantidad:number){
let total=0;
  for(let i=0;i<cantidad;i++){
    total= this.orden[i].total;
    this.totalF+=total;
    console.log(this.orden[i].total);
    }

    console.log(this.totalF);
}

//eliminar de la lista
eliminar(id:number){
  this.carritoServicio.eliminar(id).subscribe(
  data => {
    alert("eliminado de la lista");
    this.listaDetalle();
    window.location.reload();
  },
  error => {
  alert("error"+error)
  }
)}

//modal
mostrarModal(){
  let modal=document.getElementById('modal');
  modal?.classList.add('es-visible');
}
cerrarModal(){
  let modal=document.getElementById('modal');
  if(modal?.matches('.es-visible')){
  modal?.classList.remove('es-visible');
  }
  window.location.reload();
}

  //suscripcion 

  suscripcion(){
    const sus=document.getElementById('su');
     alert("gracias por tu suscripción");
     sus!.innerHTML = "";
  }


  enMantenimiento(){
    alert("por el momento esta funcionalidad no esta disponible, estamos trabajando para ponerla en marcha")
  }
  pagar(){
    this.carritoServicio.saveOrder(this.usuario.id!).subscribe(lista=>{
    })
    alert("orden creada,muchas gracias");
    this.cerrarModal(); 
  }



}