import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArkivService {

  // Digital arkivet API 
  public corsApiUrl = 'https://cors-anywhere.herokuapp.com/'; // proxy to enable cross-origin requests
  public dataInfoUrl = 'https://media.digitalarkivet.no/api/v1/db/browse?tags%5B%5D=373'; // Digital arkiv API

  private dataOptions = {
    headers: new HttpHeaders({ // API header information + auth-token
      'Content-Type': 'application/json',
      'auth-token' : '9189f9c0-e5cd-4fcf-b8fd-ae864c284ec1',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET data result from endpoint */
  public getArkivSites(): Observable<any> {
    return this.http.get(this.corsApiUrl + this.dataInfoUrl, this.dataOptions)
      .pipe(
        catchError(this.handleError<any>('getArkivSites', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
