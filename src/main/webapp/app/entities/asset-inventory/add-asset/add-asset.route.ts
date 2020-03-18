import { Route } from '@angular/router';

import { AddAssetComponent } from './add-asset.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const ADDASSETS_ROUTE: Route = {
  path: 'addassets',
  component: AddAssetComponent,
  data: {
    authorities: [],
    pageTitle: 'Add Assets'
  },
  canActivate: [UserRouteAccessService]
};
