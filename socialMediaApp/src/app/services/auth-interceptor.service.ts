import { Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const securedEndpoints = ['http://localhost:5000/api/v1/posts'];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      const accessToken = localStorage.getItem('jwtToken');

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });

    }
    return await lastValueFrom(next.handle(request));
  }

}
