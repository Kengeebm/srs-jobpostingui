import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'app/core/';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private stateStorageService: StateStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const authorities = route.data['authorities'];
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Promise<boolean> {
    return this.accountService.identity().then(account => {
      if (!authorities || authorities.length === 0) {
        return true;
      }

      if (account) {
        const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
        if (hasAnyAuthority) {
          return true;
        }
        if (isDevMode()) {
          console.error('USER_HAS_NOT_ANY_OF_REQUIRED_AUTHORITIES', authorities);
        }
        return false;
      }

      this.stateStorageService.storeUrl(url);
      this.router.navigate(['accessdenied']).then(() => {
        if (!account) {
          this.router.navigate(['/']);
        }
      });
      return false;
    });
  }
}
