import { Route } from '@angular/router';
import { TimesheetAdminComponent } from './timesheet-admin.component';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const TIMESHEET_ADMIN_ROUTE: Route = {
  path: 'timesheetadmin',
  component: TimesheetAdminComponent,
  data: {
    authorities: [ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'timesheetadmin'
  },
  canActivate: [UserRouteAccessService]
};
