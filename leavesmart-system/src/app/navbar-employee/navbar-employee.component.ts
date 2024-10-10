import { Component, EventEmitter, Output } from '@angular/core';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-navbar-employee',
  templateUrl: './navbar-employee.component.html',
  styleUrl: './navbar-employee.component.css'
})
export class NavbarEmployeeComponent {

  constructor(
    private logoutService: LogoutService,

  ){

  }
  
  @Output() navigateTo = new EventEmitter<string>();

  navigate(section: string) {
    this.navigateTo.emit(section);
  }

  logout(): void {
    this.logoutService.logout();
  }
}
