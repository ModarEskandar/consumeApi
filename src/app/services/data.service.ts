import { catchError, mergeMap } from 'rxjs/operators';
import { tap, Observable, from, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';

export interface ResponseData {
  rs: {};
  sc: number;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    @Inject(String) private url: string,
    private httpClient: HttpClient
  ) {}
  getAll<T>(queryParams?: HttpParams): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url, { params: queryParams });
  }
  get<T>(args?: {} | undefined): Observable<T> {
    // args = userId ? '?userId=' + userId : '';
    return this.httpClient
      .get<T>(this.url + args)
      .pipe(tap((data) => console.log('Get: ' + JSON.stringify(data))));
  }
  getById<T>(id: number) {
    return this.httpClient
      .get<T>(this.url + '/' + id)
      .pipe(tap((data) => console.log('Get: ' + JSON.stringify(data))));
  }
  create<T>(resource: T, endpoint?: string) {
    endpoint = endpoint ? endpoint : '';

    // return  error manually for test
    return this.httpClient.post(this.url + endpoint, resource).pipe(
      catchError((error: Response) => {
        if (error.status === 400) {
          return throwError(() => new BadInputError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }
  async createAsync<T>(resource: T) {
    // return  error manually for test
    // return await throwError(() => new AppError());
    return await this.httpClient.post(this.url, resource).pipe(
      catchError((error: Response) => {
        if (error.status === 400) {
          return throwError(() => new BadInputError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }

  update<T extends Record<string, any>>(resource: T, endpoint?: string) {
    // return  throwError(() => new AppError());
    endpoint = endpoint ? endpoint : '';
    console.log(this.url + endpoint, JSON.stringify(resource));
    return this.httpClient
      .put(this.url + endpoint, JSON.stringify(resource))
      .pipe(
        tap((data) => console.log(data))
        // catchError((error: Response) => {
        //   console.log(error);
        //   // if (error.status === 404) {
        //   //   return throwError(() => new NotFoundError(error.json()));
        //   // }
        //   // return throwError(() => new AppError(error.json()));
        // })
      );
  }
  async updateAsync<T extends Record<string, any>>(resource: T) {
    // return await throwError(() => new AppError());

    return await this.httpClient
      .patch(this.url + '/' + resource['id'], JSON.stringify({ isRead: true }))
      .pipe(
        catchError((error: Response) => {
          if (error.status === 404) {
            return throwError(() => new NotFoundError(error));
          }
          return throwError(() => new AppError(error));
        })
      );
  }
  remove(resourceId: string, endpoint?: string) {
    //return  throwError(() => new AppError());
    endpoint = endpoint ? endpoint : '';

    return this.httpClient.delete(this.url + endpoint + '/' + resourceId).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }
  async removeAsync(resourceId: string) {
    //return await throwError(() => new AppError());

    return await this.httpClient.delete(this.url + '/' + resourceId).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError(error));
        }
        return throwError(() => new AppError(error));
      })
    );
  }
}
