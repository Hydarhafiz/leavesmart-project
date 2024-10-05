import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private adminLoginUrl = environment.url + '/admin/login';
  private employeeLoginUrl = environment.url + '/staff/login';

  constructor(private http: HttpClient) {}

  authenticateAdminLogin(credentials: ILogin): Observable<any> {
    return this.http.post<any>(this.adminLoginUrl, credentials);
  }

  authenticateEmployeeLogin(credentials: ILogin): Observable<any> {
    return this.http.post<any>(this.employeeLoginUrl, credentials);
  }
}
