import { ROLE_NETWORK_ADMIN, ROLE_SUPER_ADMIN } from './../../../app.constants';
import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { AssetDashBoardComponent } from './asset-dashboard.component';

export const ASSET_DASHBOARD_ROUTE: Route = {
  path: 'asset-dashboard',
  component: AssetDashBoardComponent,
  data: {
    authorities: [ROLE_SUPER_ADMIN, ROLE_NETWORK_ADMIN],
    pageTitle: 'Asset Dashboard'
  },
  canActivate: [UserRouteAccessService]
};
