import { Route } from '@angular/router';
import { EipformComponent } from './eipform.component';
import { UserRouteAccessService } from 'app/core';
import {
  EIP,
  ROLE_ENGINEER,
  ROLE_RECRUITER,
  ROLE_RECRUITERMANAGER,
  ROLE_HR_MANAGER,
  ROLE_SUPER_ADMIN,

  ROLE_HR_MANAGER_ADMIN

} from 'app/app.constants';

export const EIP_ROUTE: Route = {
  path: EIP,
  component: EipformComponent,
  data: {

    authorities: [ROLE_ENGINEER, ROLE_RECRUITER, ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_HR_MANAGER_ADMIN, ROLE_SUPER_ADMIN],

    pageTitle: EIP
  },
  canActivate: [UserRouteAccessService]
};
