import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import {IndexComponent} from './index/index.component';
import{CarritoComponent } from './carrito/carrito.component';
import { MenuComponent } from './menu/menu.component';
import { ContactoComponent } from './contacto/contacto.component';
const routes: Routes = [
{path: '', component:IndexComponent },
{path:'index',component : IndexComponent},
 {path: 'login', component:LoginRegistroComponent},
 {path: 'registro', component:RegistroLoginComponent},
 {path:'carrito',component:CarritoComponent},
 {path:'menu',component:MenuComponent,data: { expectedRol: ['admin', 'user'] } },
 {path:'contacto',component:ContactoComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
