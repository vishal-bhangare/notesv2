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
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  apiUrl: string = 'http://localhost:4000/api/notes';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient  ) {}

  createNote(data: any): Observable<any> {
    console.log(data);
    
    let API_URL = `${this.apiUrl}/create`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }
  getAllNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  getUserNotes(id: any): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/?user=${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  getNote(id: any): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/?id=${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  updateNote(data: any, id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  deleteNote(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/delete/${id}`;
    return this.http
      .delete(API_URL, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  getArchivedNotes(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/archive/?user=${id}`);
  }
  getArchivedNote(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/archive/?id=${id}`);
  }

  addToArchive(id: any): any {
    let API_URL = `${this.apiUrl}/archive/add`;
    let pass = false;
    this.getNote(id).subscribe({
      next: (data: any) => {
        this.http
          .post(API_URL, data)
          .pipe(catchError(this.error))
          .subscribe({
            next: () => {
              this.deleteNote(id).subscribe({
                next: (data: any) => {
                  console.log(data);
                  pass = true;
                  return data;
                },
                error: (e: any) => {
                  console.log(e);
                  return false;
                },
              });
            },
            error: () => {
              return false;
            },
          });
          
        return true;
      },
      error: (err: any) => {
        console.log(err);
        return false;
      },
    });
 return true;
  }
noteData:any;
  removeFromArchive(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/archive/remove/${id}`;

    
    console.log(this.getArchivedNote(id).subscribe({
      next:(data)=>{
        this.createNote(data).subscribe({
          next:(data)=>{
            console.log(data);
          }
        });
      }
    }));
    
    
    return this.http
      .delete(API_URL, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  getDeletedNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trash`);
  }
  getDeletedNote(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/trash/${id}`);
  }
  addToTrash(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/trash/add`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  removeFromTrash(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/trash/remove/${id}`;
    return this.http
      .delete(API_URL, { headers: this.headers })
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
