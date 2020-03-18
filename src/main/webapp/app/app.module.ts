import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { ParaamarshGatewaySharedModule } from 'app/shared';
import { ParaamarshGatewayCoreModule } from 'app/core';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ParaamarshGatewayHomeModule } from 'app/home';
import { ParaamarshGatewayAccountModule } from 'app/account/account.module';
import { ParaamarshGatewayEntityModule } from 'app/entities/entity.module';
import { ParaamarshGatewayAppRoutingModule } from 'app/app-routing.module';
import { ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent } from 'app/layouts';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';
import { TimesheetModule } from './timesheet/timesheet.module';
import { LeavemanagmentModule } from 'app/leavemanagement/leavemanagment.module';
import { MaterialModule } from './material.module';
import { RequestmanagmentModule } from 'app/requestmanagement/requestmanagment.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AutoLogoutService } from './services/auto-logout.service';
import { AutoLogoutComponent } from './home/auto-logout.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000
    }),
    ParaamarshGatewaySharedModule.forRoot(),
    ParaamarshGatewayCoreModule,
    ParaamarshGatewayHomeModule,
    ParaamarshGatewayAccountModule,
    TimesheetModule,
    RequestmanagmentModule,
    LeavemanagmentModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ParaamarshGatewayEntityModule,
    ParaamarshGatewayAppRoutingModule,
    MaterialModule,
    AngularFontAwesomeModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, AutoLogoutComponent],
  providers: [
    AutoLogoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    Title
  ],
  bootstrap: [JhiMainComponent]
})
export class ParaamarshGatewayAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
