import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER_ADMIN, DASHBOARDCURRENTMONTH, ROLE_SUPER_ADMIN } from 'app/app.constants';
import { HrDashboardCurrentMonthComponent } from './hr-dashboardcurrentmonth.component';

export const DASHBOARDCURRENTMONTH_ROUTE: Route = {
  path: 'hrdashboard-currentmonth',
  component: HrDashboardCurrentMonthComponent,
  data: {
    authorities: [ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: DASHBOARDCURRENTMONTH
  },
  canActivate: [UserRouteAccessService]
};
