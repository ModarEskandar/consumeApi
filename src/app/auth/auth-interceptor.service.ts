import { User } from './user.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  user = JSON.parse(localStorage.getItem('userInfo') as string);
  private userToken: string | undefined = this.user.token;

  // user = this.authService.user.pipe(take(1)).subscribe((user) => {
  //   console.log(user?.token);
  //   this.userToken = user?.token;
  // });

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('user token', this.userToken);
    if (this.userToken) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          Authorization: `${this.userToken}`,
        },
      });
      // console.log(JSON.stringify(request));
    }
    return (
      next
        .handle(request)
        // manipulate the response too
        .pipe(
          tap((event) => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
              // console.log('response here, the body:', event.body);
            }
          })
        )
    );
  }
}
