import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParaamarshGatewaySharedModule } from 'app/shared';
import { LEAVE_ROUTE } from 'app/leavemanagement/leave/leave.route';
import { LeaveComponent } from 'app/leavemanagement/leave/leave.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { MatButtonModule, MatFormFieldModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ParaamarshGatewaySharedModule,
    RouterModule.forChild([LEAVE_ROUTE]),
    ChartModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  declarations: [LeaveComponent],
  entryComponents: [LeaveComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaveModule {}
