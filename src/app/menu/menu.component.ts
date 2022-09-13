import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Menu } from './models/menu';
import { Menuservicios } from './service/MenuService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu:Menu[]=[];
  roles: string[];
  isAdmin = false;
  constructor(private menuServicio:Menuservicios,
    private router: Router,
    private tokenService: TokenService,
    private toastr: ToastrService
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
    this.mostrarProductos(event);


  }
  mostrarCategoria(menu: Menu[]) {
    const misCompania = document.getElementById('misCategorias');
    let ListaEmp = [ 'favoritos',...new Set(this.menu.map((prod) => prod.company))];
    misCompania?.innerHTML;


    misCompania!.innerHTML = ListaEmp.map((emp) => { 
        return `<button
    style="
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem;
    text-transform: capitalize;
    background: transparent;
    border-color: transparent;
    letter-spacing: var(--letterSpacing);
    color: var(--grey-500);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.85rem;
    margin-right:43%;
    " 
        id="nav-boton" class="empresa-btn validar" data-id="${emp}"  (click)="mostrarProductos(event)">${emp}</button>`;
    }).join('');
}



  cargarMenu():void {
    this.menuServicio.lista().subscribe(
      data => {
        this.menu = data;
        this.mostrarCategoria(this.menu);

      },
      err => {
        console.log(err);
      }
    );
  }



  /*cargar articulos*/
 mostrarProductos(ev:any){  
  const misProductos = document.querySelector('#misProductos');

 misProductos?.innerHTML;
  if(ev != undefined) {
      if (ev.currentTarget.dataset.id != "favoritos")
      {
          misProductos!.innerHTML = this.menu.filter(x => x.company == ev.currentTarget.dataset.id).map((proc) => {
              return `<article id="articulo" class="product" data-id="${proc.id}" >
              <img src="${proc.image}" class="product-img img" alt="">
              <footer>
              <h5 class="product-name">${proc.title}</h5>
              <span class="product-price d-flex justify-content-center mt-2 ">${proc.price}$
              <button id="${proc.id}" onclick="mostrar(${proc.id})" class="button-modal"  data-open="modal">
               <i  class="fa-solid fa-cart-shopping text-dark ms-3 "></i>
              </button>
              </span>
              </footer>
          </article> `
          }).join('');
          
          return;
      }
  } 



  
  misProductos!.innerHTML = this.menu.map((proc):any => {
    console.log(this.menu);
    
    if(proc.company==''){
        return `<article id="articulo" class="product" data-id="${proc.id}" >
        <img src="${proc.image}" class="product-img img" alt="">
        <footer>
        <h5 class="product-name">${proc.title}</h5>
        <span class="product-price d-flex justify-content-center mt-2 ">${proc.price}$
        <button id="${proc.id}" onclick="mostrar(${proc.id})" class="button-modal"  data-open="modal">
         <i  class="fa-solid fa-cart-shopping text-dark ms-3 "></i>
        </button>
        </span>
        </footer>
    </article> `
}}).join('');
return;
}

}




