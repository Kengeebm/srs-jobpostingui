import { Route } from '@angular/router';

import { ViewAssetComponent } from './view-asset.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const VIEWASSET_ROUTE: Route = {
  path: 'viewasset',
  component: ViewAssetComponent,
  data: {
    authorities: [],
    pageTitle: 'View Asset'
  },
  canActivate: [UserRouteAccessService]
};
