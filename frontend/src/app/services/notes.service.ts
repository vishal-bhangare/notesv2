import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  apiUrl: string = 'http://localhost:4000/api/notes';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  createNote(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/create-note`;
    return this.http
      .post(API_URL, data)
      .pipe(catchError(this.error));
  }
  getAllNotes() {
    return this.http.get(`${this.apiUrl}/`);
  }
  getNote(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/signin/?id=${id}`;
    return this.http
      .post(API_URL, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
