import { Route } from '@angular/router';

import { AssignAssetComponent } from './assign-asset.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const ASSIGNASSET_ROUTE: Route = {
  path: 'assignasset',
  component: AssignAssetComponent,
  data: {
    authorities: [],
    pageTitle: 'Assign Assets'
  },
  canActivate: [UserRouteAccessService]
};
