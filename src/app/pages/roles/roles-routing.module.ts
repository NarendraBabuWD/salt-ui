import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { ViewAllRolesComponent } from './view-all-roles/view-all-roles.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [{
  path: '',
  component: RolesComponent,
  children: [
    {
      path: 'all',
      component: ViewAllRolesComponent,
    },
    {
      path: 'view',
      component: ViewRoleComponent,
    },
    {
      path: 'add',
      component: AddRoleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule { }

export const routedComponents = [
  RolesComponent,
  ViewAllRolesComponent,
  ViewRoleComponent,
  AddRoleComponent,
];
