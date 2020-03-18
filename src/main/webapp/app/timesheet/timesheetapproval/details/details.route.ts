import { Route } from '@angular/router';
import { DetailsComponent } from './details.component';

export const TIMESHEETAPPROVALDETAILS_ROUTE: Route = {
  path: 'timesheet/approval/details/:id',
  component: DetailsComponent,
  data: {
    authorities: [],
    pageTitle: 'timesheetapproval-details'
  }
};
