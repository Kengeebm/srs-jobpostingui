import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { errorRoute, navbarRoute } from 'app/layouts';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#ParaamarshGatewayAdminModule'
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class ParaamarshGatewayAppRoutingModule {}
