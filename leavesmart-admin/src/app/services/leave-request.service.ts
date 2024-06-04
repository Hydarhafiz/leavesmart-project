import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { ILeaveRequest } from '../interface/leave-request';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  private viewLeaveRequests  = environment.url + '/view-leave-request-manager';

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
    return this.http.get<ILeaveRequest[]>(this.viewLeaveRequests, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }

  fetchLeaveRequestsCalendar(): Observable<ILeaveRequest[]> {
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{ data: ILeaveRequest[] }>(this.viewLeaveRequests, {headers})
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching leave requests:', error);
          throw error;
        })
      );
  }
}
