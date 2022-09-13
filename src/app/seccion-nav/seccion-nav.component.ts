import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-seccion-nav',
  templateUrl: './seccion-nav.component.html',
  styleUrls: ['./seccion-nav.component.css']
})
export class SeccionNavComponent implements OnInit {


  isLogged = false;
 


  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  
  onLogOut(): void {
    this.tokenService.logOut();
   
    // window.location.reload();
    this.router.navigate(['/login']);
    
  }
}
