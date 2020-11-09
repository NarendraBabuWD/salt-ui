import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlliedHealthComponent } from './alliedHealth.component'; 
import { ViewAlliedComponent } from './view-allied/view-allied.component';
import { AddAlliedComponent } from './add-allied/add-allied.component';
const routes: Routes = [{
  path: '',
  component: AlliedHealthComponent,
  children: [
      {
        path: 'ViewAllied',
        component: ViewAlliedComponent
      },
      {
        path:'AddAllied',
        component: AddAlliedComponent
      }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlliedHealthRoutingModule { }

export const routedComponents = [
  AlliedHealthComponent,
  ViewAlliedComponent,
  AddAlliedComponent,
  // AutoAcceptComponent,
  // ReferralTemplateComponent
];
