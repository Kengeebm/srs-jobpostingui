import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { Account, AccountService, LoginModalService } from 'app/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { GlobalVariableService } from 'app/global-variable.service';

import {
  AUTHENTICATION_SUCCESS,
  BLANK,
  LOG_IN,
  REGISTER_URL,
  REQUEST_URL,
  REST,
  SEND_AUTH_SUCCESS,
  WELCOME,
  ERROR
} from 'app/app.constants';
import { UserdetailhistoryService } from 'app/home/userdetailhistory.service';
import { IUserDetailHistoryModel, UserDetailHistoryModel } from 'app/home/user-detail-history.model';
import moment = require('moment');
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ScrollingVisibility } from '@angular/cdk/overlay';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  authenticationError: boolean;
  username: String;
  password: String;
  account: Account;
  private userDetailHistoryModel: IUserDetailHistoryModel;
  returnUrl: String;
  route: any;
  captchaCondition: boolean;

  constructor(
    private accountService: AccountService,
    private loginModalServRice: LoginModalService,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router,
    private globalVariableService: GlobalVariableService,
    private userdetailhistoryService: UserdetailhistoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.accountService.identity().then((account: Account) => {
    //   this.account = account;
    // });
    this.registerAuthenticationSuccess();

    // reset login status
    this.loginService.logout();
    this.captchaCondition = false;
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // If Registeration is success
  registerAuthenticationSuccess() {
    this.eventManager.subscribe(AUTHENTICATION_SUCCESS, message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  cancel() {
    this.authenticationError = false;
    this.username = '';
    this.password = '';
  }

  // login
  login() {
    if (this.captchaCondition) {
      this.loginService
        .login(this.getCrendiential())
        .then(() => {
          this.authenticationError = false;
          this.navigationBasedOnCreditial();
          this.eventManager.broadcast(this.getEvent());
          // previousState was set in the authExpiredInterceptor before being redirected to login modal.
          // since login is successful, go to stored previousState and clear previousState
          const redirect = this.stateStorageService.getUrl();
          this.redirectToLogin(redirect);
        })
        .catch(() => {
          this.setDataBasedOnError();
          this.globalVariableService.setTitle('');
        });
    } else {
      Swal.fire({ type: ERROR, title: 'Verify captcha', showConfirmButton: true, background: '#e6f2ff' });
    }
  }

  private saveUserDetailHistory() {
    this.userDetailHistoryModel = new UserDetailHistoryModel();
    this.userDetailHistoryModel.email = this.account.email;
    this.userDetailHistoryModel.firstName = this.account.firstName;
    this.userDetailHistoryModel.lastName = this.account.lastName;
    this.userDetailHistoryModel.login = this.account.login;
    this.userDetailHistoryModel.loginTime = moment();
    this.userDetailHistoryModel.status = LOG_IN;
    this.userdetailhistoryService
      .save(this.userDetailHistoryModel)
      .toPromise()
      .then(value => {
        console.log('user history saved');
      })
      .catch(reason => {
        console.log('user history not saved reason :' + reason);
      });
  }

  // Error based on credential
  private setDataBasedOnError() {
    this.authenticationError = true;
    this.username = BLANK;
    this.password = BLANK;
    this.openSnackBar('Invalid Credential', 'Error');
  }

  private redirectToLogin(redirect) {
    console.log('redirect  .. ', redirect);
    if (redirect) {
      this.stateStorageService.storeUrl(null);
      this.router.navigateByUrl(redirect);
    }
  }

  private getEvent() {
    return {
      name: AUTHENTICATION_SUCCESS,
      content: SEND_AUTH_SUCCESS
    };
  }

  // Navigate to dashboard after login
  private navigationBasedOnCreditial() {
    this.router.navigate([WELCOME]);
    if (this.router.url === REGISTER_URL || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
      this.router.navigate(['']);
    }
  }

  // Getting credential for login
  private getCrendiential() {
    return {
      username: this.username,
      password: this.password,
      rememberMe: true
    };
  }

  // Navigate to register page
  register() {
    this.router.navigate([REGISTER_URL]);
  }

  // Request Reset Password
  requestResetPassword() {
    this.router.navigate([REST, REQUEST_URL]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  public resolved(captchaResponse: string) {
    this.captchaCondition = true;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
