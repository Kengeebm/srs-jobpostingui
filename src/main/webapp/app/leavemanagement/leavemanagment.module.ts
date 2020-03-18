import { LeaveReportingManagerComponent } from './leave-reportingmanager/leave-reportingmanager.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LEAVE_ROUTE } from 'app/leavemanagement/leave/leave.route';
import { LEAVE_HISTORY_ROUTE } from 'app/leavemanagement/leavehistory/leavehistory.route';
import { LeaveHistoryModule } from 'app/leavemanagement/leavehistory/leavehistory.module';
import { LeaveModule } from 'app/leavemanagement/leave/leave.module';
import { ChartModule } from 'angular-highcharts';
import { LeaveAdminComponent } from './leave-admin/leave-admin.component';
import { LEAVE_ADMIN_ROUTE } from './leave-admin/leave-admin.route';
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
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LEAVE_REPORTINGMANAGER_ROUTE } from './leave-reportingmanager/leave-reportingmanager.route';

@NgModule({
  imports: [
    RouterModule.forChild([LEAVE_ROUTE, LEAVE_HISTORY_ROUTE, LEAVE_ADMIN_ROUTE, LEAVE_REPORTINGMANAGER_ROUTE]),
    FontAwesomeModule,
    FormsModule,
    ChartModule,
    LeaveModule,
    LeaveHistoryModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MaterialModule,
    CommonModule,
    BrowserModule
  ],
  declarations: [LeaveAdminComponent, LeaveReportingManagerComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeavemanagmentModule {}
