import { Route } from '@angular/router';
import { TimesheetapprovalComponent } from './timesheetapproval.component';
import { ROLE_HR_MANAGER, LOGIN_TITLE, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const TIMESHEETAPPROVAL_ROUTE: Route = {
  path: 'timesheetapproval',
  component: TimesheetapprovalComponent,
  data: {
    authorities: [ROLE_HR_MANAGER, ROLE_SUPER_ADMIN],
    pageTitle: 'timesheetapproval'
  }
};
