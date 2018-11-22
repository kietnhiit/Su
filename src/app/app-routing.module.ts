import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthService } from './core/services/auth.services';
/* import { PostComponent } from './post/post.component';
import { NewpostComponent } from './newpost/newpost.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component'; */

const routes: Routes = [
  {
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'newpost',
    loadChildren: './newpost/newpost.module#NewpostModule'
  },
  {
    path: 'post',
    loadChildren: './post/post.module#PostModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
