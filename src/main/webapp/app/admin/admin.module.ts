import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParaamarshGatewaySharedModule } from 'app/shared';
import { UserMgmtComponent } from './user-management/user-management.component';
import { UserMgmtDetailComponent } from './user-management/user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management/user-management-update.component';
import { UserMgmtDeleteDialogComponent } from './user-management/user-management-delete-dialog.component';
import { adminState } from 'app/admin/admin.route';
import { LogsComponent } from 'app/admin/logs/logs.component';
import { JhiGatewayComponent } from 'app/admin/gateway/gateway.component';
import { JhiHealthCheckComponent } from 'app/admin/health/health.component';
import { JhiHealthModalComponent } from 'app/admin/health/health-modal.component';
import { JhiDocsComponent } from 'app/admin/docs/docs.component';
import { JhiMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { JhiConfigurationComponent } from 'app/admin/configuration/configuration.component';
import { DataConfigMgmtComponent } from 'app/admin/data-config-management/data-config-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryMgmtComponent } from 'app/admin/history-management/history-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { SearchUserPipe } from './user-management/searchuser.pipe';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    ParaamarshGatewaySharedModule,
    RouterModule.forChild(adminState),
    NgxPaginationModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DataConfigMgmtComponent,
    LogsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiDocsComponent,
    JhiGatewayComponent,
    JhiMetricsMonitoringComponent,
    HistoryMgmtComponent,
    SearchUserPipe
  ],
  entryComponents: [JhiHealthModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParaamarshGatewayAdminModule {}
