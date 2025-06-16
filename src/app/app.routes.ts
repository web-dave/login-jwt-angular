import { Routes } from '@angular/router';
import { LoginForm } from './login-fom/login-form';
import { BookListComponent } from './books/book-list';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginForm,
  },
];
