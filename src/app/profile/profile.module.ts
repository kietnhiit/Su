import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyPostComponent } from './my-post.component';
import { MyFavoritedPostComponent } from './my-favorited-post.component';
import { SharedModule } from '../shared/shared.module';
import { PostService } from '../core/services/post.services';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    MyPostComponent,
    MyFavoritedPostComponent
  ],
  providers: []
})
export class ProfileModule {}
