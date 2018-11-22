import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewpostComponent } from './newpost.component';
import { NewpostRoutingModule } from './newpost-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostService } from '../core/services/post.services';

@NgModule({
  imports: [
    SharedModule,
    NewpostRoutingModule
  ],
  declarations: [
    NewpostComponent
  ],
  providers: []
})
export class NewpostModule { }
