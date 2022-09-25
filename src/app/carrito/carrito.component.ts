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
import { PaymentIntentDto } from '../models/payment-intent-dto';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';



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
 
//stripe
error: any;
elements: Elements;
card: StripeElement;
elementsOptions: ElementsOptions = {
  locale: 'es'
};
stripeForm:FormGroup;

 id:any;
 nombre:any;
 descripcion="menu"
 precio:number;
// public stripeForm = new FormGroup({
//   name: new FormControl('', Validators.required)
// });


createForm(){
  this.stripeForm=this.fb.group({
name:['',[Validators.required]]
//amount:['',[Validators.required]]
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
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    ) { }

 
    isLogged = false;
    roles: string[];
    isAdmin = false;
  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }); 
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      alert("Para ver el carrito debe primero ingresar con su cuenta")
      this.router.navigate(['/login']);
    }
  
this.listaDetalle();
let  User = JSON.parse(localStorage.getItem("User")!);
this.usuarioServicio.detailName(String(User)).subscribe(data => {
  this.usuario=data;  
})
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
    }
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
      this.router.navigateByUrl('/estado');
    //  this.cerrarModal(); 
    }
  }
  }
  buy() {
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount:this.totalF,
            currency: 'eur',
            description: this.descripcion
          };
          this.paymentService.pagar(paymentIntentDto).subscribe(
            data => {  
              let n=<HTMLInputElement>  document.getElementById('nombre');        
               this.id=data['id'];
               this.nombre=n.value;
               this.descripcion=data[`description`];
               this.precio=data['amount'];
            }
          );
          this.error = undefined;
        } else if (result.error) {
          this.error = result.error.message;
        }
      });
  }
  ModalPago(){

  }cerrarT(){
    let m=document.getElementById('pago');
    if(m.matches('.v')){
      m.classList.remove('v')
    }
  }

  Confirmar(){
    let modal=document.getElementById('modal');
    if(modal?.matches('.es-visible')){
    modal?.classList.remove('es-visible');
    }
    let m=document.getElementById('pago')
    m.classList.add('v');
  }

  confirmar(id:string): void {    
    this.paymentService.confirmar(id).subscribe(
      data => {
        console.log(this.usuario.id);
        
        this.carritoServicio.saveOrder(this.usuario.id,'tarjeta').subscribe(lista=>{
        })
        alert("pago confirmado");
        this.router.navigateByUrl('/estado');
      //  window.location.reload();
        
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelar(id:string): void {
    this.paymentService.cancelar(id).subscribe(
      data => {
        alert("pago cancelado");
           this.cerrarT();
      },
      err => {
        console.log(err);
      }
    );
  }
}


        