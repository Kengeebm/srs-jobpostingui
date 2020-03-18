import { Route } from '@angular/router';
import { LeavehistoryComponent } from 'app/leavemanagement/leavehistory/leavehistory.component';
import { UserRouteAccessService } from 'app/core';
import { ROLE_RECRUITER, ROLE_ENGINEER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER } from 'app/app.constants';

export const LEAVE_HISTORY_ROUTE: Route = {
  path: 'leave-history',
  component: LeavehistoryComponent,
  data: {
    authorities: [ROLE_RECRUITER, ROLE_ENGINEER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER],
    pageTitle: 'Leave-History'
  },
  canActivate: [UserRouteAccessService]
};
