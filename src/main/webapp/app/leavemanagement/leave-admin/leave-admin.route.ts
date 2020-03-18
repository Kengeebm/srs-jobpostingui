import { Route } from '@angular/router';
import { LeaveAdminComponent } from './leave-admin.component';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const LEAVE_ADMIN_ROUTE: Route = {
  path: 'leaveadmin',
  component: LeaveAdminComponent,
  data: {
    authorities: [ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'Leave Admin'
  },
  canActivate: [UserRouteAccessService]
};
