import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILogin } from '../interface/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.url + '/staff/login'

  constructor(private http:HttpClient) { }

  authenticateLogin(credentials: ILogin): Observable<ILogin[]>{
    const url = `${this.baseUrl}`;
    return this.http.post<ILogin[]>(url, credentials)
   }
}
