import { Route } from '@angular/router';
import { LeaveComponent } from 'app/leavemanagement/leave/leave.component';
import { UserRouteAccessService } from 'app/core';
import {
  ROLE_ENGINEER,
  ROLE_RECRUITER,
  ROLE_RECRUITERMANAGER,
  ROLE_HR_MANAGER,
  ROLE_SUPER_ADMIN,

  ROLE_HR_MANAGER_ADMIN

} from 'app/app.constants';

export const LEAVE_ROUTE: Route = {
  path: 'leave',
  component: LeaveComponent,
  data: {
    authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'Leave'
  },
  canActivate: [UserRouteAccessService]
};
