import { Route } from '@angular/router';

import { ViewReleasedassetComponent } from './view-releasedasset.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const VIEWRELEASEDASSET_ROUTE: Route = {
  path: 'view-releasedasset',
  component: ViewReleasedassetComponent,
  data: {
    authorities: [],
    pageTitle: 'View releasedasset'
  },
  canActivate: [UserRouteAccessService]
};
