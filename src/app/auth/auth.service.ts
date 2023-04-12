import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  rs: {
    token: string;
  };
  sc: number;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private httpClient: HttpClient) {}
  signIn() {
    return this.httpClient
      .post<AuthResponseData>(
        'http://eblaepm.no-ip.org:9092/cdi/api/v1/auth/internal/login',
        {
          lang: 'AR',
          userName: 'cdiadmin',
          userPassword: 'P@ssw0rd',
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const user = new User('cdiadmin', resData.rs.token);
          console.log(user);
          this.user.next(user);
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ username: user.username, token: user.token })
          );
        })
      );
  }
  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred!';
    if (!errorRes.error || !errorRes.error.console.error)
      return throwError(errorMessage);
    switch (errorRes.error.error.message) {
      case 'Error':
        errorMessage = 'error occurred!';
    }
    return throwError(errorMessage);
  }
}
