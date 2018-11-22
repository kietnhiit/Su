import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostCommentComponent } from './post-comment.component'
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommentService } from '../core/services';

@NgModule({
  imports: [
    SharedModule,
    PostRoutingModule
  ],
  declarations: [
    PostComponent,
    PostCommentComponent
  ],
  providers: []
})
export class PostModule {}
