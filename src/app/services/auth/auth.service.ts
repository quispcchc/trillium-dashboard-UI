import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/login';  // Backend login endpoint
  private reportUrl = 'http://localhost:3000/report';  // Backend report endpoint
  private resetPasswordUrl = 'http://localhost:3000/reset-password';  // Backend password reset endpoint

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password })
      .pipe(
        map(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.token);
          }
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  getPowerBIReport(): Observable<{ embedUrl: string, embedToken: string }> {
    return this.http.get<{ embedUrl: string, embedToken: string }>(this.reportUrl, {
      headers: {
        Authorization: `Bearer ${isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') : ''}`
      }
    });
  }

  // Method for requesting password reset
  requestPasswordReset(email: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.resetPasswordUrl, { email })
      .pipe(
        catchError(() => of({ success: false }))
      );
  }
}