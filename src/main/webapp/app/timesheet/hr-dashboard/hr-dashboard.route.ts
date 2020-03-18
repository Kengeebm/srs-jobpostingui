import { Route } from '@angular/router';
import { HrDashboardComponent } from './hr-dashboard.component';
import { UserRouteAccessService } from 'app/core';
import { DASHBOARD, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const DASHBOARD_ROUTE: Route = {
  path: 'hrdashboard',
  component: HrDashboardComponent,
  data: {
    authorities: [ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: DASHBOARD
  },
  canActivate: [UserRouteAccessService]
};
