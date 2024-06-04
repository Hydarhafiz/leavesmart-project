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
  private viewJobPosition  = environment.url + '/view-job-positions-setting';

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
    return this.http.get<IJobPosition[]>(this.viewJobPosition, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }
}
