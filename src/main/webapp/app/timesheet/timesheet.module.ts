import { NotificationManagementComponent } from './../admin/notification-management/notification-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetapprovalComponent } from './timesheetapproval/timesheetapproval.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheethistoryComponent } from './timesheethistory/timesheethistory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TIMESHEET_ROUTE } from './timesheet/timesheet.route';
import { TIMESHEET_ADMIN_ROUTE } from './timesheet-admin/timesheet-admin.route';
import { TIMESHEETAPPROVAL_ROUTE } from './timesheetapproval/timesheetapproval.route';
import { TIMESHEETAPPROVALDETAILS_ROUTE } from './timesheetapproval/details/details.route';
import { DASHBOARD_ROUTE } from './hr-dashboard/hr-dashboard.route';
import { DetailsComponent } from './timesheetapproval/details/details.component';
import { ViewComponent } from './timesheetapproval/view/view.component';
import { TIMESHEETAPPROVALVIEW_ROUTE } from './timesheetapproval/view/view.route';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TIMESHEETHISTORY_ROUTE } from './timesheethistory/timesheethistory.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimesheetAdminComponent } from './timesheet-admin/timesheet-admin.component';
import { MaterialModule } from '../material.module';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatButtonModule
} from '@angular/material';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrDashboardCurrentMonthComponent } from './hr-dashboardcurrentmonth/hr-dashboardcurrentmonth.component';
import { UserReportsComponent } from 'app/admin/user-reports/user-reports.component';
import { DASHBOARDCURRENTMONTH_ROUTE } from './hr-dashboardcurrentmonth/hr-dashboardcurrentmonth.route';
import { USERREPORTS_ROUTE } from 'app/admin/user-reports/user-reports.route';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NOTIFICATIONMNG_ROUTE } from 'app/admin/notification-management/notification-management.route';

@NgModule({
  declarations: [
    TimesheetapprovalComponent,
    TimesheetComponent,
    TimesheethistoryComponent,
    DetailsComponent,
    ViewComponent,
    TimesheetAdminComponent,
    HrDashboardComponent,
    HrDashboardCurrentMonthComponent,
    UserReportsComponent,
    NotificationManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      TIMESHEET_ROUTE,
      TIMESHEETAPPROVAL_ROUTE,
      TIMESHEETAPPROVALDETAILS_ROUTE,
      TIMESHEETAPPROVALVIEW_ROUTE,
      TIMESHEETHISTORY_ROUTE,
      TIMESHEET_ADMIN_ROUTE,
      DASHBOARD_ROUTE,
      DASHBOARDCURRENTMONTH_ROUTE,
      USERREPORTS_ROUTE,
      NOTIFICATIONMNG_ROUTE
    ]),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    NgxPaginationModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule
  ],
  entryComponents: [TimesheethistoryComponent]
})
export class TimesheetModule {}
