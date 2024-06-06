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

  private viewLeaveRequests = environment.url + '/view-leave-request-manager';
  private editLeaveRequests = environment.url + '/edit-leave-request-manager'

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
    return this.http.get<{ data: ILeaveRequest[] }>(this.viewLeaveRequests, { headers })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching leave requests:', error);
          throw error;
        })
      );
  }

  fetchLeaveRequestById(id: number): Observable<ILeaveRequest> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.viewLeaveRequests}/${id}`;

    // Make HTTP GET request with headers
    return this.http.get<ILeaveRequest>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error fetching leave request with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }

  editLeaveRequestById(id: number, updatedLeaveRequest: ILeaveRequest): Observable<ILeaveRequest> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.editLeaveRequests}/${id}`;
    return this.http.put<ILeaveRequest>(url, updatedLeaveRequest, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing leave request with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
