import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = 'http://localhost:4000/api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Signup
  isAccountCreated = false;
  responseHeaders:any;
  currentUserData:any;
  signup(data: any): Observable<any> {
    this.isAccountCreated = false;
    let API_URL = `${this.apiUrl}/signup`;
    return this.http.post(API_URL, data,{observe: 'response'}).pipe( map( response => {
      if(response["status"] == 201){
        this.isAccountCreated = true;
      }
      this.currentUserData = response.body;
      return response.body
      // kind of useless
  }),catchError(this.error));
  }
  // Get all users
  getAll() {
    return this.http.get(`${this.apiUrl}/`);
  }
  // SignIn
  signin(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/signin`;
    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  tokenSignin(id:any):Observable<any>{
    let API_URL = `${this.apiUrl}/signin/?id=${id}`;
    return this.http
      .post(API_URL,{ headers: this.headers })
      .pipe(catchError(this.error));
  }
  // Update User
  updateUser(id : any,data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update-user/${id}`;
    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }
  // Delete User
  deleteUser(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}//delete-user/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }
  // Verify User
  verifyUser(token: any): Observable<any> {
    var API_URL = `${this.apiUrl}//verify-user/${token}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }
  // Handle Errors
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
