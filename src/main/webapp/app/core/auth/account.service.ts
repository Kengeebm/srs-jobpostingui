import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Account } from 'app/core/user/account.model';
import { EipForm } from 'app/shared/model/jobPost/eipform.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private _userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private eip: EipForm;

  constructor(private http: HttpClient) {}

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(SERVER_API_URL + 'services/paraamarshauth/api/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + 'services/paraamarshauth/api/account', account, { observe: 'response' });
  }

  authenticate(identity) {
    this._userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this._userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this._userIdentity || !this._userIdentity.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this._userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      id => {
        return Promise.resolve(id.authorities && id.authorities.includes(authority));
      },
      () => {
        return Promise.resolve(false);
      }
    );
  }

  identity(force?: boolean): Promise<Account> {
    if (force) {
      this._userIdentity = undefined;
    }
    if (this._userIdentity) {
      return Promise.resolve(this._userIdentity);
    }
    return this.fetch()
      .toPromise()
      .then(response => {
        const account: Account = response.body;
        if (account) {
          this._userIdentity = account;
          this.authenticated = true;
        } else {
          this._userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this._userIdentity);
        return this._userIdentity;
      })
      .catch(err => {
        this._userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this._userIdentity);
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this._userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this._userIdentity.imageUrl : null;
  }

  public setEmployeeDetails(eip: EipForm) {
    this.eip = eip;
  }

  public getEmployeeDetails() {
    return this.eip;
  }
}
