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
  private viewJobPositionLeaveTypes  = environment.url + '/view-job-position-by-leave-types';

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
}
