import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ParaamarshGatewaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ParaamarshGatewaySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ParaamarshGatewaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParaamarshGatewaySharedModule {
  static forRoot() {
    return {
      ngModule: ParaamarshGatewaySharedModule
    };
  }
}
