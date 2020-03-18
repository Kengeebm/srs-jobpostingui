import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { JOBPOST_TITLE, LEAVE_TITLE, TIMESHEET_MANAGEMENT, VERSION } from 'app/app.constants';
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Title } from '@angular/platform-browser';
import { GlobalVariableService } from 'app/global-variable.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  roleRecruiter: boolean;
  private title: string;
  routerPath: any;
  navTitle: any;

  @HostListener('document:click', ['$event']) clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.isNavbarCollapsed = true;
    }
  }

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private titleService: Title,
    private globalVariableService: GlobalVariableService,
    private eRef: ElementRef
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.navTitle = '';
    this.globalVariableService.titleNav.subscribe(res => setTimeout(() => (this.navTitle = res), 0));

    this.roleRecruiter = false;
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }
  toggleNavbar(event: Event) {
    if (!this.isNavbarCollapsed) {
      event.stopPropagation();
      this.isNavbarCollapsed = true;
    } else {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
  }
  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  homeClick() {
    if (this.navTitle === JOBPOST_TITLE) {
      this.router.navigate(['/welcome']);
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
    this.globalVariableService.setTitle('');
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  getNavTitle() {
    if (this.navTitle === JOBPOST_TITLE) {
      this.router.navigate(['/dashboard']);
    } else if (this.navTitle === LEAVE_TITLE) {
      this.router.navigate(['/leave']);
    } else if (this.navTitle === TIMESHEET_MANAGEMENT) {
      this.router.navigate(['/timesheet']);
    }
  }
}
