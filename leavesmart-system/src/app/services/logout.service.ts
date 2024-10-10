import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
