import { Route } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
import { UserRouteAccessService } from 'app/core';
import {
  ROLE_RECRUITER,
  ROLE_ENGINEER,
  ROLE_RECRUITERMANAGER,
  ROLE_HR_MANAGER,
  TIMESHEET_TITLE,
  ROLE_SUPER_ADMIN,

  ROLE_HR_MANAGER_ADMIN

} from 'app/app.constants';

export const TIMESHEET_ROUTE: Route = {
  path: 'timesheet',
  component: TimesheetComponent,
  data: {

    authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],

    pageTitle: TIMESHEET_TITLE
  },
  canActivate: [UserRouteAccessService]
};
