import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';
import { ROLE_RECRUITER, ROLE_ENGINEER, ROLE_RECRUITERMANAGER } from 'app/app.constants';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: [ROLE_RECRUITER, ROLE_ENGINEER, ROLE_RECRUITERMANAGER],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};
