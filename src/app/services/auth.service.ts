import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT');
    if (token) {
      const isExpired = this.isTokenExpired(token);
      if (!isExpired) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        localStorage.removeItem('JWT');
        localStorage.removeItem('userId');
        localStorage.removeItem('userDetails');
        this.router.navigate(['']);
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('JWT');
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTimestamp = Date.now();

    return expirationTime < currentTimestamp;
  }
}
