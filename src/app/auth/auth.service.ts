import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => (typeof window !== 'undefined' ? window : ({} as Window)),
});

const API_URL = 'http://localhost:4730';
const USER_KEY = 'auth-user';

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    password: string;
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  window = inject(WINDOW);

  isLoggedIn() {
    return !!this.window?.sessionStorage?.getItem(USER_KEY);
  }

  getUser(): AuthResponse | null {
    const user = this.window?.sessionStorage?.getItem(USER_KEY);
    return !!user ? JSON.parse(user) : null;
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/login`, credentials).pipe(
      tap({
        next: (data) => {
          this.window?.sessionStorage?.removeItem(USER_KEY);
          this.window?.sessionStorage?.setItem(USER_KEY, JSON.stringify(data));
        },
      })
    );
  }

  register(data: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/register`, data).pipe();
  }

  logOut() {
    this.window?.sessionStorage?.removeItem(USER_KEY);
  }
}
