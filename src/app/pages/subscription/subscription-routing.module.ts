import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubscriptionComponent } from './subscriptions/add-subscription/add-subscription.component';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ViewSubscriptionComponent } from './subscriptions/view-subscription/view-subscription.component';

const routes: Routes = [{
  path: '',
  component: SubscriptionComponent,
  children: [
    {
      path: 'all',
      component: SubscriptionsComponent,
    },
    {
      path: 'add',
      component: AddSubscriptionComponent,
    },
    {
      path: 'view',
      component: ViewSubscriptionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule { }

export const routedComponents = [
  SubscriptionComponent,
  SubscriptionsComponent,
 AddSubscriptionComponent,
 ViewSubscriptionComponent,
];
