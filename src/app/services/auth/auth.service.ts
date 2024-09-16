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
  private resetPasswordUrl = 'http://localhost:3000/reset-password';  // Backend password reset request endpoint
  private resetPasswordWithTokenUrl = 'http://localhost:3000/reset-password';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

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

  // Request password reset link
  requestPasswordReset(email: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.resetPasswordUrl, { email })
      .pipe(
        catchError(() => of({ success: false }))
      );
  }

  // Reset password with the provided token
  resetPasswordWithToken(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.resetPasswordWithTokenUrl}/${token}`, { password: newPassword })
      .pipe(
        catchError(() => of({ message: 'Failed to reset password' }))
      );
  }
}