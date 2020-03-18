import { LeaveReportingManagerComponent } from './leave-reportingmanager.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const LEAVE_REPORTINGMANAGER_ROUTE: Route = {
  path: 'leavereportingmanager',
  component: LeaveReportingManagerComponent,
  data: {
    authorities: [ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'Leave Admin'
  },
  canActivate: [UserRouteAccessService]
};
