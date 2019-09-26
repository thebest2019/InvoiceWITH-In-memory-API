
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { of, from, throwError, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN = "Test_Token:2019";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  Token: any;

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.isAuthenticated();
    });
  }


  getCurrentUser() {
    this.Token = localStorage.getItem('currentUser');
    if (this.Token != null) {
      return true;
    }
    return false;
  }

  // POST
  register(user) {
    //console.log(JSON.stringify(user));
    return this.http.post<any>(`${environment.Endpiont_API}/auth/Users/SignUp`, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }


  login(username, password) {
    return this.http.post<any>(`${environment.Endpiont_API}/auth/Users/SignIn`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  ResetPWD(data:any){
    return this.http.post<any>(`${environment.Endpiont_API}/auth/Users/ResetPWD`, JSON.stringify(data), this.httpOptions)
      .pipe(map(dt => {
        return dt;
      }));
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.Token = null;
  }

  isAuthenticated() {
    return this.isLoggedIn &&
      this.storage.get('token');
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
