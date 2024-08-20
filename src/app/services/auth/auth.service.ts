import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/login';  // Backend login endpoint
  private reportUrl = 'http://localhost:3000/report';  // Backend report endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password })
      .pipe(
        map(response => {
          localStorage.setItem('authToken', response.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getPowerBIReport(): Observable<{ embedUrl: string, embedToken: string }> {
    return this.http.get<{ embedUrl: string, embedToken: string }>(this.reportUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}