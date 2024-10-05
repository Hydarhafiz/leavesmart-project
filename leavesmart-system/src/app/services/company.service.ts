import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../interface/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private viewCompanyData = environment.url + '/get-companies';


  constructor(
    private http: HttpClient,

  ) { }

  fetchCompanies(): Observable<ICompany[]> {

    return this.http.get<any[]>(this.viewCompanyData)
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }
}
