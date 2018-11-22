import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewpostComponent } from './newpost.component';
import { AuthService } from '../core/services';

const routes: Routes = [
  {
    path: '',
    component: NewpostComponent,
    canActivate: [AuthService]
  },
  {
    path: ':id',
    component: NewpostComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewpostRoutingModule {}
