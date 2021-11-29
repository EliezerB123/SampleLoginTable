import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pocangular';
  constructor(private router: Router,public authService:AuthenticationService){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
