import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
   router = inject(Router);
   loginService = inject(LoginService);

  goToApp1() {
      this.router.navigate(['/shellapp']);
  }

  goToApp2() {
    this.router.navigate(['/shellapp2']);
}

logout(){
this.router.navigate(['']);  
this.loginService.logout()
}
}
