import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Route, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'app/core';
import { HistoryMgmtComponent } from 'app/admin/history-management/history-management.component';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements CanActivate {
  constructor(private accountService: AccountService) {}

  canActivate() {
    return this.accountService
      .identity()
      .then(account => this.accountService.hasAnyAuthority(['ROLE_RECRUITERMANAGER', 'ROLE_SUPER_ADMIN']));
  }
}

@Injectable({ providedIn: 'root' })
export class UserMgmtResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['login'] ? route.params['login'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new User();
  }
}

export const historyMgmtRoute: Route = {
  path: 'history-management',
  component: HistoryMgmtComponent,
  data: {
    pageTitle: 'History',
    defaultSort: 'id,asc'
  },
  resolve: {
    user: UserMgmtResolve
  }
};
