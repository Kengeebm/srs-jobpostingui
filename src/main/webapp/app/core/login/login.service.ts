import { Injectable } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { IUserDetailHistoryModel } from 'app/home/user-detail-history.model';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private userDetailHistoryModel: IUserDetailHistoryModel;

  constructor(
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider,
    private userdetailhistoryService: UserdetailhistoryService
  ) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          console.log('nagendra_sajwan' + 'authServerProvider.login:' + data.toString());
          this.accountService.identity(true).then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logoutDirectly() {
    this.accountService.authenticate(null);
  }

  logout() {
    if (this.accountService.isAuthenticated()) {
      this.authServerProvider.logout().subscribe(() => this.accountService.authenticate(null));
    } else {
      this.accountService.authenticate(null);
    }
  }
}
