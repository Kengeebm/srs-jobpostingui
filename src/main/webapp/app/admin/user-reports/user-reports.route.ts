import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER_ADMIN, USERREPORTS, ROLE_SUPER_ADMIN } from 'app/app.constants';
import { UserReportsComponent } from './user-reports.component';

export const USERREPORTS_ROUTE: Route = {
  path: 'user-reports',
  component: UserReportsComponent,
  data: {
    authorities: [ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: USERREPORTS
  },
  canActivate: [UserRouteAccessService]
};
