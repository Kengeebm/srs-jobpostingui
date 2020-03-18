import { Route } from '@angular/router';
import { HomeComponent } from './';
import { LOGIN_TITLE } from 'app/app.constants';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: LOGIN_TITLE
  }
};
