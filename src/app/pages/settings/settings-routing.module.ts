import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AutoAcceptComponent } from './auto-accept/auto-accept.component'
import { ReferralTemplateComponent } from './referral-template/referral-template.component';
import { UpdateTemplateComponent } from './update-template/update-template.component';
const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [
      {
        path: 'autoAccept',
        component: AutoAcceptComponent
      },
      {
        path:'ReferralTemplate',
        component: ReferralTemplateComponent
      },
      {
        path:'updateTemplate',
        component: UpdateTemplateComponent
      }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

export const routedComponents = [
  SettingsComponent,
  AutoAcceptComponent,
  ReferralTemplateComponent,
  UpdateTemplateComponent
];
