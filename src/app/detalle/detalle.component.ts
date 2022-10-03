import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor( private ordenServicio: Carritoservicios,
    private route: ActivatedRoute
    ) { }
    menu: any[] = [];
    totalFinal: any;
    total=0;
    costoEnvio:any;
    tipoPago:any;
    direccion:any;
  ngOnInit(): void {
let id=+this.route.snapshot.paramMap.get('id')
    this.ordenServicio.lista().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].orden.id == id) {
          this.menu = data.filter((i) => i.orden.id == id);
          this.totalFinal = data[i].orden.total;
          this.costoEnvio=data[i].orden.costoEnvio;
          console.log(this.menu);
          this.total =this.total+Number(data[i].total);
          this.tipoPago= data[i].orden.tipoPago;
          if(data[i].orden.direccion==='null'){
            this.direccion='retiro en el local'
          }else{
          this.direccion=data[i].orden.direccion;
          }
        }
      }
    });
  }

}
