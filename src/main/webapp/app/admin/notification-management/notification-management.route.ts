import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN } from 'app/app.constants';
import { NotificationManagementComponent } from './notification-management.component';

export const NOTIFICATIONMNG_ROUTE: Route = {
  path: 'admin/notification-management',
  component: NotificationManagementComponent,
  data: {
    authorities: [ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
    pageTitle: 'notification-management'
  },
  canActivate: [UserRouteAccessService]
};
