import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IPackageType } from '../interface/package-type';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private viewPackageTypes = environment.url + '/get-package-types';


  constructor(
    private http: HttpClient,

  ) { }

  fetchPackageTypes(): Observable<IPackageType[]> {

    return this.http.get<any[]>(this.viewPackageTypes)
      .pipe(
        catchError(error => {
          console.error('Error fetching job position data:', error);
          return throwError(error);
        })
      );
  }
}
