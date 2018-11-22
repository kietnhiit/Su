import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../core/services';
import { MyPostComponent } from './my-post.component';
import { MyFavoritedPostComponent } from './my-favorited-post.component'

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: MyPostComponent
      },
      {
        path: 'favorites',
        component: MyFavoritedPostComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthService],
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
