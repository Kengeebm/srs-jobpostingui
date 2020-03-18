import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private loginModalService: LoginModalService, private router: Router, private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (this.loginService.isAuthenticated()) {
                this.loginService.logoutDirectly();
                // this.loginModalService.open();
              } else {
                this.loginService.logout();
                this.router.navigate(['/']);
              }
            }
          }
        }
      )
    );
  }
}
