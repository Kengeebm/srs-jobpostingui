import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from 'app/blocks/config/prod.config';
import { ParaamarshGatewayAppModule } from 'app/app.module';
import 'hammerjs';
import 'zone.js/dist/zone';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(ParaamarshGatewayAppModule, { preserveWhitespaces: true })
  .then(success => console.log(`Application started`))
  .catch(err => console.error(err));
