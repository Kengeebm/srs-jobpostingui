import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { AccountService } from 'app/core';
import { User } from '../../core/user/user.model';
import { UserService } from '../../core/user/user.service';
import { DataConfigMgmtComponent } from 'app/admin/data-config-management/data-config-management.component';

@Injectable({ providedIn: 'root' })
export class UserResolve implements CanActivate {
  constructor(private accountService: AccountService) {}

  canActivate() {
    return this.accountService.identity().then(account => this.accountService.hasAnyAuthority(['ROLE_RECRUITERMANAGER']));
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

export const dataConfigMgmtRoute: Routes = [
  {
    path: 'data-config-management',
    component: DataConfigMgmtComponent,
    data: {
      pageTitle: 'Data-Config',
      defaultSort: 'id,asc'
    },
    resolve: {
      user: UserMgmtResolve
    }
  }
];
