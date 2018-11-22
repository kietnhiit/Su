import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SettingRoutingModule
  ],
  declarations: [
    SettingComponent
  ],
  providers: []
})
export class SettingModule {}
