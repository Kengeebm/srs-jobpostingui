import { Route } from '@angular/router';
import { ViewComponent } from './view.component';

export const TIMESHEETAPPROVALVIEW_ROUTE: Route = {
  path: 'timesheet/approval/view',
  component: ViewComponent,
  data: {
    authorities: [],
    pageTitle: 'timesheetapproval-view'
  }
};
