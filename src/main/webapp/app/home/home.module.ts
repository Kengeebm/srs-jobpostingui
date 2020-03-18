import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParaamarshGatewaySharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DASHBOARD_ROUTE } from './dashboard/dashboard.route';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartModule } from 'angular-highcharts';
import { WELCOME_ROUTE } from 'app/home/welcome/welcome.route';
import { WelcomeComponent } from 'app/home/welcome/welcome.component';
import { MaterialModule } from 'app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    ParaamarshGatewaySharedModule,
    RecaptchaModule,
    AngularFontAwesomeModule,
    RouterModule.forChild([HOME_ROUTE, DASHBOARD_ROUTE, WELCOME_ROUTE]),
    ChartModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [HomeComponent, DashboardComponent, WelcomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParaamarshGatewayHomeModule {}
