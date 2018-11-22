import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    HttpService,
    UserService,
    JWTService,
    ErrorService,
    AuthService,
    CommentService,
    PostService,
    TagService,
    HomeService
} from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptor/http.header.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true
    },
    HttpService,
    UserService,
    JWTService,
    ErrorService,
    AuthService,
    CommentService,
    PostService,
    TagService,
    HomeService
  ],
  declarations: []
})
export class CoreModule { }
