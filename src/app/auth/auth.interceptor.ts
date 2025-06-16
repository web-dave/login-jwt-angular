import { inject } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  console.log(req.url);
  const router = inject(Router);
  const credential = inject(AuthService).getUser();
  if (!!credential) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${credential.accessToken}`,
      },
      withCredentials: true,
    });

    return next(cloned);
  } else {
    router.navigate(['login']);
    const cloned = req.clone();

    return next(cloned);
    // return EMPTY;
  }
};
