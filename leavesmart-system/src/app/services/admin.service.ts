import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IAdmin } from '../interface/admin';
import { ICompany } from '../interface/company';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private viewProfileUrl  = environment.url + '/view-profile';
  private editProfileUrl  = environment.url + '/update-profile';
  private postRegisterAdminAndCompany = environment.url + '/register-admin-company';
  private postRegisterAdmin = environment.url + '/register-admin';
  private photoAdmin = environment.url;



  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchProfile(): Observable<IAdmin[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<IAdmin[]>(this.viewProfileUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching admin data:', error);
          return throwError(error);
        })
      );
  }

  getAttachmentUrl(filename: string): string {
    return `${this.photoAdmin}/${filename}`;
  }

  editProfile(profileData: any): Observable<any> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP PUT request with headers and request body
    return this.http.put<any>(this.editProfileUrl, profileData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error editing profile:', error);
          return throwError(error);
        })
      );
  }

  postNewAdminAndCompany(data: FormData): Observable<any> {
    return this.http.post<any>(this.postRegisterAdminAndCompany, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating new admin and company:', error);
          return throwError(error);
        })
      );
  }
  
  postNewAdmin(admin: FormData ): Observable<any> {
    return this.http.post<any>(this.postRegisterAdmin, admin )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating new admin:', error);
          return throwError(error);
        })
      );
  }
}
