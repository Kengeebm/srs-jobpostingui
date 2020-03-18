import { Route } from '@angular/router';

import { AddClientComponent } from './add-client.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const ADDCLIENT_ROUTE: Route = {
  path: 'addclient',
  component: AddClientComponent,
  data: {
    authorities: [],
    pageTitle: 'Add Client'
  },
  canActivate: [UserRouteAccessService]
};
