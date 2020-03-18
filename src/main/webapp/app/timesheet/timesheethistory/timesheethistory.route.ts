import { Route } from '@angular/router';
import { TimesheethistoryComponent } from './timesheethistory.component';
import { ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_SUPER_ADMIN } from 'app/app.constants';

export const TIMESHEETHISTORY_ROUTE: Route = {
  path: 'timesheethistory',
  component: TimesheethistoryComponent,
  data: {
    authorities: [ROLE_RECRUITERMANAGER, ROLE_HR_MANAGER, ROLE_SUPER_ADMIN],
    pageTitle: 'timesheet-history'
  }
};
