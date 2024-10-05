import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IJobPosition } from '../interface/job-position';

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  private viewJobPositionUrl  = environment.url + '/view-job-positions-setting';
  private createJobPositionUrl  = environment.url + '/create-job-positions';
  private editJobPositionUrl  = environment.url + '/edit-job-positions-setting';
  private deleteJobPositionUrl  = environment.url + '/delete-job-position';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchJobPosition(): Observable<IJobPosition[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<IJobPosition[]>(this.viewJobPositionUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }

  postNewJobPosition(jobPosition: IJobPosition): Observable<any> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post<any>(this.createJobPositionUrl, jobPosition, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating new job position:', error);
          return throwError(error);
        })
      );
  }

  editJobPosition(id: any, updatedStaff: IJobPosition): Observable<IJobPosition> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.editJobPositionUrl}/${id}`;
    return this.http.put<IJobPosition>(url, updatedStaff, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing job position with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }


  deleteJobPosition(id: any): Observable<IJobPosition> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.deleteJobPositionUrl}/${id}`;

    // Make HTTP DELETE request with headers
    return this.http.delete<IJobPosition>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error deleting job position for ${id}:`, error);
          return throwError(error);
        })
      );
  }

  
}
