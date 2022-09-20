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




@NgModule({
  declarations: [
    AppComponent,
    LoginRegistroComponent,
    RegistroLoginComponent,
    IndexComponent,
    SeccionNavComponent,
    MenuComponent,
    CarritoComponent,
    ContactoComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
