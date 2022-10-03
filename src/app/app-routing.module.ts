import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import { IndexComponent } from './index/index.component';
import { CarritoComponent } from './carrito/carrito.component';
import { MenuComponent } from './menu/menu.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EstadoOrdenComponent } from './estado-orden/estado-orden.component';
import { LocalesComponent } from './locales/locales.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginRegistroComponent },
  { path: 'registro', component: RegistroLoginComponent },
  {
    path: 'carrito',
    component: CarritoComponent,
    data: { expectedRol: ['admin', 'user'] },
  },
  { path: 'estado', component: EstadoOrdenComponent },
  {
    path: 'menu',
    component: MenuComponent,
    data: { expectedRol: ['admin', 'user'] },
  },
  { path: 'contacto', component: ContactoComponent },
  { path: 'locales', component: LocalesComponent },
  {path:'detalle/:id',component:DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
