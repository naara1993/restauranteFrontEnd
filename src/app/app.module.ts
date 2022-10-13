import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import { IndexComponent } from './index/index.component';
import { SeccionNavComponent } from './seccion-nav/seccion-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NgxStripeModule } from 'ngx-stripe';

import {MatProgressBarModule} from '@angular/material/progress-bar';


import {  ReactiveFormsModule } from '@angular/forms';
import { EstadoOrdenComponent } from './estado-orden/estado-orden.component';
import { LocalesComponent } from './locales/locales.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegistroComponent,
    RegistroLoginComponent,
    IndexComponent,
    SeccionNavComponent,
    MenuComponent,
    CarritoComponent,
    ContactoComponent,
    EstadoOrdenComponent,
    LocalesComponent,
    DetalleComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51LlahjGoaMNf4DNtRI1F4jecrcGGnQfaNoJMNTynMkxvm4I1zPgiTsRWnH0dkGDexKXKQV3PFZeichuTyS0kyLlM00XpWrDcsx'),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
