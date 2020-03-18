import { MatSortModule } from '@angular/material/sort';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParaamarshGatewaySharedModule } from 'app/shared';
import { LeavehistoryComponent } from 'app/leavemanagement/leavehistory/leavehistory.component';
import { LEAVE_HISTORY_ROUTE } from 'app/leavemanagement/leavehistory/leavehistory.route';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ParaamarshGatewaySharedModule,
    RouterModule.forChild([LEAVE_HISTORY_ROUTE]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [LeavehistoryComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaveHistoryModule {}
