import { AddOrgContactComponent } from './org-contact/add-org-contact/add-org-contact.component';
import { OrgContactComponent } from './org-contact/org-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { AddOrganizationComponent } from './organizations/add-organization/add-organization.component';
import { AddLocationComponent } from './locations/add-location/add-location.component';
import { LocationsComponent } from './locations/locations.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ViewOrganizationComponent } from './organizations/view-organization/view-organization.component';
import { ViewLocationComponent } from './locations/view-location/view-location.component';
import { EditOrganizationComponent } from './organizations/edit-organization/edit-organization.component';

const routes: Routes = [{
  path: '',
  component: OrganizationComponent,
  children: [
    {
      path: 'all',
      component: OrganizationsComponent,
    },
    {
      path: 'add',
      component: AddOrganizationComponent,
    },
    {
      path: 'view',
      component: ViewOrganizationComponent,
    },
    {
      path: 'edit',
      component: EditOrganizationComponent,
    },
    {
      path: 'locations',
      component: LocationsComponent,
    },
    {
      path: 'location',
      component: AddLocationComponent,
    },
    {
      path: 'location/view',
      component: ViewLocationComponent,
    },
    {
      path: 'contacts',
      component: OrgContactComponent,
    },
    {
      path: 'contact',
      component: AddOrgContactComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }

export const routedComponents = [
  OrganizationComponent,
  OrganizationsComponent,
  AddOrganizationComponent,
  EditOrganizationComponent,
  LocationsComponent,
  AddLocationComponent,
  ViewLocationComponent,
  ViewOrganizationComponent,
  OrgContactComponent,
  AddOrgContactComponent,
];
