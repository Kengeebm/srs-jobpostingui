import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PasswordComponent } from './password.component';
import {
  ROLE_ENGINEER,
  ROLE_RECRUITERMANAGER,
  ROLE_RECRUITER,
  ROLE_HR_MANAGER,
  ROLE_HR_MANAGER_ADMIN,
  ROLE_SUPER_ADMIN
} from 'app/app.constants';

export const passwordRoute: Route = {
  path: 'password',
  component: PasswordComponent,
  data: {
    authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'Password'
  },
  canActivate: [UserRouteAccessService]
};
