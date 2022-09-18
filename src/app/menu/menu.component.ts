import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Menu } from './models/menu';
import { OrdenDetalle } from './ordenDetalle/odenDetalle';
import { Menuservicios } from './service/MenuService';
import { Carritoservicios } from './serviceCarrito/carritoServicio';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id:number;
  title:string;
  company:string;
  image:string;
  price:number;
  menu:Menu[]=[];
  m:Menu[]=[];
  men:Menu;
  roles: string[];
  isAdmin = false;
  correo:string;
  constructor(private menuServicio:Menuservicios,
    private router: Router,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private elementRef:ElementRef, private renderer:Renderer2,
    private carritoServicio:Carritoservicios
    ) {
     }
  ngOnInit(): void {
    this.cargarMenu();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }); 
  }

  cargarMenu():void {
    this.menuServicio.lista().subscribe(
      data => {
        this.menu = data;
        this.mostrarProductos(this.menu);
      },
      err => {
        console.log(err);
      }
    );
  }


mostrarProductos(menu:Menu[]) {
   this.m = this.menu.filter(item => item.company =='comidas');
}
mostrarProductosF(menu:Menu[]) {
  this.m = this.menu.filter(item => item.company =='favoritos');
}
mostrarProductosC(menu:Menu[]) {
  this.m = this.menu.filter(item => item.company =='comidas');
}
mostrarProductosP(menu:Menu[]) {
  this.m = this.menu.filter(item => item.company =='postres');
}
mostrarProductosB(menu:Menu[]) {
  this.m = this.menu.filter(item => item.company =='bebidas');
}


//cargarModal
 mostrar(id:number){
  const modalId=document.getElementById('modal');
  modalId!.classList.add('es-visible');
  this.mostrarArticulo(id);
}
 cerrar(){
  const modalId=document.getElementById('modal');
  if (modalId!.matches('.es-visible')) {
      modalId!.classList.remove('es-visible');
  }
}

// ngAfterViewInit() {
//   this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => { this.AgregarAlCarrito(this.id);});
// }
orden:  OrdenDetalle;
can:number;
 AgregarAlCarrito(id:number) {
  let ingresado:boolean;
 let p=this.menu.find(x=>x.id==id);
let menu:Menu;
this.menuServicio.detail(id).subscribe(data => {
  menu=data;
})
this.carritoServicio.addCart(id,this.can).subscribe(
  data => {
    for(let i=0;i<data.length;i++){
    ingresado=true;
    if(data[i].menu.id==id){
      ingresado=false;
    }
   }

   if(!ingresado){
    this.orden=data;
    alert("agregado al carrito")
    window.location.reload()
   }
   if(ingresado){
    alert("el producto ya esta en la lista");
   }

   
  },
  error=>{
    if(this.can==null || this.can==undefined){
      alert("Debe ingresar una cantidad para agregar al carrito")
    }

    alert("ocurrio un problema y no se agrego al carrito")
  }
)

 }
 
menuProducto:Menu;
producto:Menu;
mostrarArticulo(id:number){
  this.menuServicio.detail(id).subscribe(
    data => {
      this.producto = data;
    },err => {
      console.log("error",err);
    }
  )
}
// mostrarArticulo(id:number){
//   let total = 0;
//   const agregarElemento=document.getElementById('agregarElemento');
//   agregarElemento!.innerHTML='';
//   // let producto =   products.find(x => x.id == id)
//   this.menu.forEach((valor)=>{
//     if(valor.id==id){
//       agregarElemento!.innerHTML=`
//       <div class="d-flex">
//       <img src="${valor.image}" class="pe-3" height="400px" width="60%" alt="" />
//       <div>
//         <nav class="nav ps-5">
//           <ul
//             class="text-white p-2 list-unstyled d-flex justify-content-end align-item-end"
//           >
//             <li class="nav-item">
//               <a
//                 class="nav-link text-dark"
//                 aria-current="page"
//                 href="index.html"
//                 >Home</a
//               >
//             </li>
//             <li class="nav-item">
//               <a class="nav-link text-dark" href="#">Contacto</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link text-dark" href="#">Locales</a>
//             </li>
//           </ul>
//         </nav>
//         <div>
//           <div>
//             <h2 class="titulo ps-4">${valor.title}</h2>
//           </div>
//           <form
//             class="d-flex justify-content-center align-item-center mt-4"
//             action=""
//           >
//           <input title="ingresa la cantidad que quieres llevar" type="number" onkeyup="teclado()" name="cantidad" id="cantidad" min="1" placeholder="cantidad" value="1" max="10" />

//             <div class="ps-2" >
//             <label id="agregar"> 
//             ${valor.price}
//             </label>
//             $
//             <input type="hidden" id="precio" value="${valor.price}" />
//             </div>
//           </form>
//           <div class="mt-5 contenido-final">
//             <button (click)="AgregarAlCarrito(${valor.id})" class="btn btn-dark">
//                 agregar al carrito
//             </button> 
     
//             <a  href="./carrito.html?IdProducto=${valor.id}">
//             Ir al carrito
//             </a>
//           </div>
//         </div>
//       </div>
//       </div>
//       `;
//   }
//   })
// }

  onKey(ev:any):void {
    this.m= this.menu.filter(x => x.title.toLowerCase().includes(ev.currentTarget.value.toLowerCase())).map((
      proc => proc
    ));
   }


 

  mostrarFormulario(){
   const modalFormulario2=document.getElementById('modalFormulario2');
   modalFormulario2!.classList.add('es-visibleF');
  }

  cerrarModal() {
    
    const modalFormulario2=document.getElementById('modalFormulario2');
    if(modalFormulario2!.matches('.es-visibleF')){
      modalFormulario2!.classList.remove('es-visibleF');

    }
  }


//crear articulo
  onCreate(){
    let menu= new Menu(this.id!,this.title,this.company,this.image,this.price)
   this.menuServicio.save(menu).subscribe(
    data => {
      alert('producto agregado al menu OK',); 
      this.cerrarModal();
      this.router.navigate(['/menu']);
    },
    err => {
      this.toastr.error(err.error.mensaje, 'Fail', {
      });
    }
   );
  }

  //eliminar articulo
  eliminarMenu(id:number){
    this.menuServicio.delete(id).subscribe(
      data => {
       alert("producto eliminado del menu")
        this.cargarMenu();
      },error => {
      console.log("error"+error);
      }
      )
  }


//actualizar articulo
  actualizarMenu(id:number):number{
    this.menuServicio.detail(id).subscribe(
      data => {
        this.men=data;
        
        console.log(this.men);
        
      },err => {
        console.log("error",err);
      }
    )


   return this.id=id;
  }



  onUpdate(){  
    this.menuServicio.update(this.id,this.men).subscribe(
      data => {
        alert("Menu  Actualizado");
        this.router.navigate(['/menu']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
        });
      }
    ); 
  }


//suscripcion 

suscripcion(){
  const sus=document.getElementById('su');
   alert("gracias por tu suscripción");
   sus!.innerHTML = "";
}

}

