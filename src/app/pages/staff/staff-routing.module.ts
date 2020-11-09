import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStaffLocationComponent } from './staffs/add-staff-location/add-staff-location.component';
import { StaffComponent } from './staff.component';
import { AddStaffComponent } from './staffs/add-staff/add-staff.component';
import { StaffsComponent } from './staffs/staffs.component';
import { ViewStaffComponent } from './staffs/view-staff/view-staff.component';

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [
    {
      path: 'all',
      component: StaffsComponent,
    },
    {
      path: 'add',
      component: AddStaffComponent,
    },
    {
      path: 'view',
      component: ViewStaffComponent,
    },
    {
      path: 'location',
      component: AddStaffLocationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule { }

export const routedComponents = [
  StaffComponent,
  StaffsComponent,
  AddStaffComponent,
  ViewStaffComponent,
  AddStaffLocationComponent,
];
