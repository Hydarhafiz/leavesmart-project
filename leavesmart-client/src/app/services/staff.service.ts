import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IStaff } from '../interface/staff';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private viewStaffUrl  = environment.url + '/view-staff-profile';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchProfile(): Observable<IStaff[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<IStaff[]>(this.viewStaffUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching staff data:', error);
          return throwError(error);
        })
      );
  }
}
