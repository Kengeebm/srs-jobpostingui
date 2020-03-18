import { Route, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import {
  ROLE_ENGINEER,
  ROLE_HR_MANAGER,
  ROLE_RECRUITER,
  ROLE_RECRUITERMANAGER,
  ROLE_SUPER_ADMIN,
  ROLE_HR_MANAGER_ADMIN
} from 'app/app.constants';
import { RequestComponent } from 'app/requestmanagement/request/request.component';
import { RequestHistoryComponent } from 'app/requestmanagement/request/requesthistory.component';

export const REQUEST_ROUTE: Routes = [
  {
    path: 'request',
    component: RequestComponent,
    data: {
      authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
      pageTitle: 'request'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'requesthistory',
    component: RequestHistoryComponent,
    data: {
      authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],
      pageTitle: 'requesthistory'
    },
    canActivate: [UserRouteAccessService]
  }
];
