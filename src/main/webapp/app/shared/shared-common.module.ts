import { NgModule } from '@angular/core';

import { ParaamarshGatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ParaamarshGatewaySharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ParaamarshGatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ParaamarshGatewaySharedCommonModule {}
