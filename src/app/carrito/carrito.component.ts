import { Component, OnInit } from '@angular/core';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Menuservicios } from '../menu/service/MenuService';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { carritoService } from './carritoService/carritoService';
import{Menu} from '../menu/models/menu'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

orden:OrdenDetalle[]=[];
totalF=0;
menu:Menu[]=[];
  constructor(private ordenServicio:Carritoservicios,
    private menuServicios:Menuservicios,
    private carritoServicio:carritoService) { }

  ngOnInit(): void {
this.listaDetalle();
this.prueba();
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

sumarTotal(cantidad:number){
let total=0;
  for(let i=0;i<cantidad;i++){
    total= this.orden[i].total;
    this.totalF+=total;
    console.log(this.orden[i].total);
    }

    console.log(this.totalF);
}


prueba(){



}
eliminar(id:number){
  this.carritoServicio.eliminar(id).subscribe(
  data => {
    alert(" producto eliminado");
    this.listaDetalle();
    window.location.reload();
  },
  error => {
  alert("error"+error)
  }
)}


  //suscripcion 

  suscripcion(){
    const sus=document.getElementById('su');
     alert("gracias por tu suscripción");
     sus!.innerHTML = "";
  }
}