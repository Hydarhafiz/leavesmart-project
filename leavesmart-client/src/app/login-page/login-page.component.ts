import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { ILogin } from '../interface/login';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  credentials: ILogin = { email: '', password: '' };
  error: string = ''; 
  
  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  

  submitted: any;
  form!: FormGroup
  submit() {
    this.loginService.authenticateLogin(this.credentials).subscribe({
      next: (response: any) => { 
        console.log(response);
        const token = response.token; 
        this.localStorage.set('token', token); 
        this.router.navigate(['/main-page']);
        this.toastr.success('Login successful', 'Success');
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Invalid email or password', 'Error');
      }
    });
  }
  

}
