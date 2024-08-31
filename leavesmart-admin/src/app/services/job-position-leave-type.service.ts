import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IJobPositionLeaveType } from '../interface/job-position-leave-type';

@Injectable({
  providedIn: 'root'
})
export class JobPositionLeaveTypeService {
  private viewJobPositionLeaveTypes  = environment.url + '/view-leave-types-by-job-position';
  private createJobPositionLeaveTypes  = environment.url + '/create-job-position-by-leave-type';
  private editJobPositionLeaveTypes  = environment.url + '/edit-leave-types-by-job-position';
  private deleteJobPositionLeaveTypes  = environment.url + '/delete-leave-types-by-job-position';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchJobPositionByLeaveTypes(jobPositionId: number): Observable<IJobPositionLeaveType[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    const url = `${this.viewJobPositionLeaveTypes}/${jobPositionId}`; // Modify URL as needed
    return this.http.get<IJobPositionLeaveType[]>(url, { headers })
    .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }

  postNewjobPositionByLeaveType(jobPositionByLeaveType: IJobPositionLeaveType): Observable<any> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post<any>(this.createJobPositionLeaveTypes, jobPositionByLeaveType, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating new job position by selected leave type:', error);
          return throwError(error);
        })
      );
  }

  editJobPositionLeaveType(id: any, updatedStaff: IJobPositionLeaveType): Observable<IJobPositionLeaveType> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.editJobPositionLeaveTypes}/${id}`;
    return this.http.put<IJobPositionLeaveType>(url, updatedStaff, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing staff with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteJobPositionLeaveType(id: any): Observable<IJobPositionLeaveType> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.deleteJobPositionLeaveTypes}/${id}`;

    // Make HTTP DELETE request with headers
    return this.http.delete<IJobPositionLeaveType>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error deleting leave type with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }
  
}
