import { Route } from '@angular/router';

import { ViewClientComponent } from './view-client.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const VIEWCLIENT_ROUTE: Route = {
  path: 'view-clientreport',
  component: ViewClientComponent,
  data: {
    authorities: [],
    pageTitle: 'View Client'
  },
  canActivate: [UserRouteAccessService]
};
