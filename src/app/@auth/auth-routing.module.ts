import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NgxAuthComponent } from './auth.component';
import { NgxChangePasswordComponent } from './change-password/change-password.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'change-password',
        component: NgxChangePasswordComponent,
      },
      {
        path: 'request-password',
        component: NgxRequestPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule { }

export const routedComponents = [
  NgxAuthComponent,
  NgxLoginComponent,
  NgxChangePasswordComponent,
  NgxRequestPasswordComponent,
];
