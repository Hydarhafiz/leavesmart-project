import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ILeaveType } from '../interface/leave-type';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  private viewLeaveTypesUrl  = environment.url + '/view-leave-types-manager';
  private postLeaveTypesUrl  = environment.url + '/create-leave-types';
  private editLeaveTypesUrl  = environment.url + '/edit-leave-types-manager';
  private deleteLeaveTypesUrl  = environment.url + '/delete-leave-type';


  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchLeaveTypes(): Observable<ILeaveType[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<ILeaveType[]>(this.viewLeaveTypesUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }


  postNewLeaveType(leaveType: ILeaveType): Observable<any> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post<any>(this.postLeaveTypesUrl, leaveType, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating new leaveType:', error);
          return throwError(error);
        })
      );
  }

  editLeaveType(id: any, updatedStaff: ILeaveType): Observable<ILeaveType> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.editLeaveTypesUrl}/${id}`;
    return this.http.put<ILeaveType>(url, updatedStaff, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing staff with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteLeaveTypeById(id: number): Observable<ILeaveType> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.deleteLeaveTypesUrl}/${id}`;

    // Make HTTP DELETE request with headers
    return this.http.delete<ILeaveType>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error deleting leave type with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }
}
