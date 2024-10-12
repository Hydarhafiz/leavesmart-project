import { Component } from '@angular/core';
import { ILogin } from '../interface/login';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  credentials: ILogin = { username: '', password: '', role: 'admin' }; // Initialize with default role
  error: string = '';

  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submitted: any;
  form!: FormGroup;

  submit() {
    if (this.credentials.role === 'admin') {
      this.loginService.authenticateAdminLogin(this.credentials).subscribe({
        next: (response: any) => {
          console.log(response);
          const token = response.token;
          this.localStorage.set('token', token);
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['/main-page']);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Invalid email or password', 'Login Failed');
        }
      });
    } else {
      this.loginService.authenticateEmployeeLogin(this.credentials).subscribe({
        next: (response: any) => {
          console.log(response);
          const token = response.token;
          this.localStorage.set('token', token);
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['/main-page-employee']);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Invalid email or password', 'Login Failed');
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['register-admin']);
  }
}

