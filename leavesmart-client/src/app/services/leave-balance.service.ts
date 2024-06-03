import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ILeaveBalance } from '../interface/leave-balance';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {

  private viewLeaveBalanceUrl  = environment.url + '/view-leave-balances';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }


  fetchLeaveBalances(): Observable<ILeaveBalance[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<ILeaveBalance[]>(this.viewLeaveBalanceUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching staff data:', error);
          return throwError(error);
        })
      );
  }
}
