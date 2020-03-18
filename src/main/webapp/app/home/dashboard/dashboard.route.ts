import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from 'app/core';
import { DASHBOARD, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const DASHBOARD_ROUTE: Route = {
  path: DASHBOARD,
  component: DashboardComponent,
  data: {
    authorities: [ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_SUPER_ADMIN],
    pageTitle: DASHBOARD
  },
  canActivate: [UserRouteAccessService]
};
