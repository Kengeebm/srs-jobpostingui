import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { configurationRoute } from 'app/admin/configuration/configuration.route';
import { docsRoute } from 'app/admin/docs/docs.route';
import { healthRoute } from 'app/admin/health/health.route';
import { logsRoute } from 'app/admin/logs/logs.route';
import { gatewayRoute } from 'app/admin/gateway/gateway.route';
import { metricsRoute } from 'app/admin/metrics/metrics.route';
import { userMgmtRoute } from 'app/admin/user-management/user-management.route';
import { dataConfigMgmtRoute } from 'app/admin/data-config-management/data-config-management.route';
import { historyMgmtRoute } from 'app/admin/history-management/history-management.route';

const ADMIN_ROUTES = [
  configurationRoute,
  docsRoute,
  healthRoute,
  logsRoute,
  ...userMgmtRoute,
  ...dataConfigMgmtRoute,
  gatewayRoute,
  metricsRoute,
  historyMgmtRoute
];

export const adminState: Routes = [
  {
    path: '',
    data: {
      authorities: []
    },
    canActivate: [UserRouteAccessService],
    children: ADMIN_ROUTES
  }
];
