import { ROLE_HR_MANAGER_ADMIN } from './../../app.constants';
import { Route } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { UserRouteAccessService } from 'app/core';
import { WELCOME, ROLE_RECRUITER, ROLE_ENGINEER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const WELCOME_ROUTE: Route = {
  path: WELCOME,
  component: WelcomeComponent,
  data: {
    authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: WELCOME
  },
  canActivate: [UserRouteAccessService]
};
