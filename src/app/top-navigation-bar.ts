// top-navigation-bar.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  output,
  inject,
} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation-bar',
  template: `
    <nav class="top-nav">
      <div class="logo">MyApp</div>
      <div class="nav-links">
        <a routerLink="/books" class="nav-link">Books</a>
        @if(isLoggedIn()){

        <button class="logout-btn" (click)="logOut()">Logout</button>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .top-nav,
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background: #222;
        color: #fff;
        font-family: sans-serif;
      }
      .logo {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .nav-links {
        display: flex;
        gap: 1.5rem;
        align-items: center;
      }
      .nav-link {
        color: #fff;
        text-decoration: none;
      }
      .login-btn {
        background: #3498db;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      .logout-btn {
        background: #e74c3c;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
    `,
  ],
})
export class TopNavigationBarComponent {
  authService = inject(AuthService);

  router = inject(Router);

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
