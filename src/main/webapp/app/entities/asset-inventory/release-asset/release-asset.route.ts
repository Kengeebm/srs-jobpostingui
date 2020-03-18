import { Route } from '@angular/router';

import { ReleaseAssetComponent } from './release-asset.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const RELEASEASSET_ROUTE: Route = {
  path: 'releaseasset',
  component: ReleaseAssetComponent,
  data: {
    authorities: [],
    pageTitle: 'Release Asset'
  },
  canActivate: [UserRouteAccessService]
};
