import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalDashboardComponent } from './dashboard/hospital-dashboard/hospital-dashboard.component';
import { AlliedHealthDashboardComponent } from './dashboard/allied-health-dashboard/allied-health-dashboard.component';

import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'ownerDashboard',
      component: DashboardComponent,
    },
    {
      path: 'practitionerDashboard',
      component: HospitalDashboardComponent,
    },
    {
      path: 'alliedHealthDashboard',
      component: AlliedHealthDashboardComponent,
    },
    {
      path: 'roles',
      loadChildren: './roles/roles.module#RolesModule',
    },
    {
      path: 'organization',
      loadChildren: './organization/organization.module#OrganizationModule',
    },
    {
      path: 'staff',
      loadChildren: './staff/staff.module#StaffModule',
    },
    {
      path: 'subscription',
      loadChildren: './subscription/subscription.module#SubscriptionModule',
    },
    {
      path:'referral',
      loadChildren: './referral/referral.module#ReferralModule',
    },
    {
      path:'settings',
      loadChildren: './settings/settings.module#SettingsModule',
    },
    {
      path:'alliedhealth',
      loadChildren: './alliedhealth/alliedhealth.module#AlliedHealthModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
