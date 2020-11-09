import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PrintLayoutComponent } from './@print/print-layout/print-layout.component';

export const routes: Routes = [
   {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'owner',
    loadChildren: () => import('./@auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'allied',
    loadChildren: () => import('./@auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'practice',
    loadChildren: () => import('./@auth/auth.module').then(m => m.NgxAuthModule),
  },
  /*{
    path: 'owner',
    loadChildren: () => import('./owner/owner.module').then(m => m.OwnerAuthModule),
  },
  {
    path: 'allied',
    loadChildren: () => import('./allied/allied.module').then(m => m.AlliedAuthModule),
  },*/
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', canActivate: [AuthGuard], loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},

  { path: 'owner', canActivate: [AuthGuard], loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},
  { path: 'allied', canActivate: [AuthGuard], loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},
  { path: 'practice', canActivate: [AuthGuard], loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},

  { path: '**', redirectTo: 'pages' },

  //{ path: '', redirectTo: 'pages', pathMatch: 'full' },
  // tslint:disable-next-line: max-line-length
  //{ path: 'pages', loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},
  //{ path: '**', redirectTo: 'pages' },
  { path: 'print',
  outlet: 'print',
  component: PrintLayoutComponent,
  children: [
    // { path: 'invoice/:invoiceIds', component: InvoiceComponent },
  ],
},
];


const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  PrintLayoutComponent,
];
