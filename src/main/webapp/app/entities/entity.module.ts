import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EipformComponent } from './jobPost/eipform/eipform.component';
import { EIP_ROUTE } from './jobPost/eipform/eipform.route';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { EipformModule } from 'app/entities/jobPost/eipform/eipform.module';
import { ItaimApplicationEntityModule } from 'app/entities/asset-inventory/asset-inventory.module';

@NgModule({
  imports: [
    EipformModule,
    RouterModule.forChild([
      {
        path: 'job',
        loadChildren: './jobPost/job/job.module#JobPostJobModule'
      },
      {
        path: 'job-history',
        loadChildren: './jobPost/job-history/job-history.module#JobPostJobHistoryModule'
      },
      EIP_ROUTE
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
    FontAwesomeModule,
    FormsModule,
    ItaimApplicationEntityModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParaamarshGatewayEntityModule {}
