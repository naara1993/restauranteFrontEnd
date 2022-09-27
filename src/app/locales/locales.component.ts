import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  constructor() { }
local:any;
  ngOnInit(): void {
    this.local=Array(
      {local:'avenida 9 de julio 2700',telefono:'11111111',email:'example@a.com'},
      {local:'felipe vallese 229',telefono:'11111111',email:'example@a.com'},
      {local:'paysandu 5000',telefono:'11111111',email:'example@a.com'}
    );    
  }


}
