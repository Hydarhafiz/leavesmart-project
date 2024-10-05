import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IStaff } from '../interface/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private viewStaffsUrl  = environment.url + '/view-staff-manager';
  private postStaffUrl  = environment.url + '/staff/register';
  private editStaffUrl  = environment.url + '/edit-staff-manager';
  private photoStaff = environment.url;
  private deleteStaffUrl  = environment.url + '/delete-staff';



  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  fetchStaffs(): Observable<IStaff[]> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request with headers
    return this.http.get<IStaff[]>(this.viewStaffsUrl, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching staff data:', error);
          return throwError(error);
        })
      );
  }

  fetchStaffById(id: number): Observable<IStaff> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.viewStaffsUrl}/${id}`;

    // Make HTTP GET request with headers
    return this.http.get<IStaff>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error fetching staff with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }

  getAttachmentUrl(filename: any): string {
    return `${this.photoStaff}/${filename}`;
  }

  editStaffProfile(id: number, updatedStaff: IStaff): Observable<IStaff> {
    const token = this.localStorage.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.editStaffUrl}/${id}`;
    return this.http.put<IStaff>(url, updatedStaff, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing staff with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  postNewStaff(staff: FormData): Observable<any> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post<any>(this.postStaffUrl, staff, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating new staff:', error);
          return throwError(error);
        })
      );
  }

  deleteStaffById(id: number): Observable<IStaff> {
    // Retrieve token from local storage
    const token = this.localStorage.get('token');

    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construct the URL with the ID
    const url = `${this.deleteStaffUrl}/${id}`;

    // Make HTTP DELETE request with headers
    return this.http.delete<IStaff>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Error deleting staff with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }
}
