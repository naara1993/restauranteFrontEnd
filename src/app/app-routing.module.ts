import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import {IndexComponent} from './index/index.component';
import{CarritoComponent } from './carrito/carrito.component';
const routes: Routes = [
{path: '', component:IndexComponent },
{path:'index',component : IndexComponent},
 {path: 'login', component:LoginRegistroComponent},
 {path: 'registro', component:RegistroLoginComponent},
 {path:'carrito',component:CarritoComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
