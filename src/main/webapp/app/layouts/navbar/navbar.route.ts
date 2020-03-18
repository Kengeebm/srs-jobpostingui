import { Route } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { ROLE_SUPER_ADMIN, ROLE_HR_MANAGER } from 'app/app.constants';

export const navbarRoute: Route = {
  path: '',
  component: NavbarComponent,
  data: {
    authorities: [ROLE_SUPER_ADMIN, ROLE_HR_MANAGER]
  },
  outlet: 'navbar'
};
