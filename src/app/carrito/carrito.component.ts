import { Component, Input, OnInit } from '@angular/core';
import { OrdenDetalle } from '../menu/ordenDetalle/odenDetalle';
import { Menuservicios } from '../menu/service/MenuService';
import { Carritoservicios } from '../menu/serviceCarrito/carritoServicio';
import { carritoService } from './carritoService/carritoService';
import{Menu} from '../menu/models/menu'
import { AuthService } from '../service/auth-service';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';



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
 

error: any;
elements: Elements;
card: StripeElement;
elementsOptions: ElementsOptions = {
  locale: 'es'
};
stripeForm:FormGroup;

// public stripeForm = new FormGroup({
//   name: new FormControl('', Validators.required)
// });


createForm(){
  this.stripeForm=this.fb.group({
name:['',[Validators.required]],
amount:['',[Validators.required]]

  });
}





  constructor(
  
    private ordenServicio:Carritoservicios,
    private menuServicios:Menuservicios,
    private carritoServicio:carritoService,
    private usuarioServicio:AuthService,
    private router: Router,
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private fb: FormBuilder
    ) { }

 


  ngOnInit(): void {
this.listaDetalle();
let  User = JSON.parse(localStorage.getItem("User")!);
this.usuarioServicio.detailName(String(User)).subscribe(data => {
  this.usuario=data;
})
// console.log(User);
this.loading=true;
this.createForm();
this.stripeService.elements(this.elementsOptions)
.subscribe((elements: any) => {
  this.elements = elements;
  // Only mount the element the first time
  if (!this.card) {
    this.card = this.elements.create('card', {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    });
    this.card.mount('#card-element');
  }
});
  }
verificar():void{
 const efectivo=<HTMLInputElement>document.getElementById('efectivo');
 let botonComprar=<HTMLInputElement>document.getElementById('botonComprar');

 if(efectivo.checked){
  botonComprar.disabled=true;
 }else{
  botonComprar.disabled=false;
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
    if(this.orden.length<=0){
      console.log(this.orden.length);    
      alert("la lista esta vacia, para terminar la compra debe seleccionar un producto")
    }else{
      console.log(this.orden.length);
    const efectivo=<HTMLInputElement>document.getElementById('efectivo');
    if(efectivo.checked){
      this.carritoServicio.saveOrder(this.usuario.id!,efectivo.value).subscribe(lista=>{
      })
      alert("orden creada,muchas gracias");
      this.cerrarModal(); 
    }
  }
  }





stripeData:any;
loading:any;
submitted:any;
paymenStatus:any;
  buy() {
    this.loading=true;
    this.submitted=true;
    const name = this.stripeForm.get('name').value;
    this.stripeService.createToken(this.card,{name}).subscribe(resul=>{
      if(resul.token){
this.stripeData['token']=resul.token;
this.paymentService.pagar(this.stripeData).subscribe((res)=>{
  if(res['success']){
    this.loading=false;
    this.submitted=false;
    this.paymenStatus=res['status'];
  }else{
    this.loading=false;
    this.submitted=false;
    this.paymenStatus=res['status'];
  }
})

      }else if(resul.error){
        this.paymenStatus=resul.error.message;
      }
    })
     
  }
}


        