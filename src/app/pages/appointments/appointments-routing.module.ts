import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';
import { ViewAppointmentTypeComponent } from './appointment-type/view-appointment-type/view-appointment-type.component';
import { AddAppointmentTypeComponent } from './appointment-type/add-appointment-type/add-appointment-type.component';
import { AppointmentTypeComponent } from './appointment-type/appointment-type.component';

const routes: Routes = [{
  path: '',
  component: AppointmentsComponent,
  children: [
    {
      path: 'view',
      component: ViewAppointmentTypeComponent ,
    },
    {
      path: 'add',
      component: AddAppointmentTypeComponent ,
    },
    {
      path: 'all',
      component: AppointmentTypeComponent ,
    }
  
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule { }

export const routedComponents = [
    AppointmentsComponent,
    AppointmentTypeComponent,
    ViewAppointmentTypeComponent,
    AddAppointmentTypeComponent
   
];
