import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { HttpHeaders, HttpClient } from '@angular/common/https';
import { Observable } from 'rxjs';
import { PaymentIntentDto } from '../models/payment-intent-dto';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripeURL = 'http://localhost:8080/stripe/';

  constructor(private httpClient: HttpClient) {}

  public pagar(paymentIntentDto: PaymentIntentDto): Observable<String> {
    return this.httpClient.post<String>(this.stripeURL + 'paymentintent', paymentIntentDto, cabecera);
  }

  public confirmar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `confirm/${id}`, {}, cabecera);
  }

  public cancelar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `cancel/${id}`, {}, cabecera);
  }

}
