import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ILeaveRequest } from '../employee-interface/leave-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveRequestService {

  private viewLeaveRequestUrl  = environment.url + '/get-leave-requests';
  private postLeaveRequestUrl = environment.url + '/create-leave-request';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }


  fetchLeaveRequests(): Observable<ILeaveRequest[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<ILeaveRequest[]>(this.viewLeaveRequestUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching staff data:', error);
          return throwError(error);
        })
      );
  }



  postLeaveRequest(leaveRequest: FormData): Observable<any> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post<any>(this.postLeaveRequestUrl, leaveRequest, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating leave request:', error);
          return throwError(error);
        })
      );
  }
}
