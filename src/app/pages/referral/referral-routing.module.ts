import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferralComponent } from './referral.component';
// import { ViewReferralComponent } from './view-referral/view-referral.component';
import { RejectedReferralComponent } from './rejected-referral/rejected-referral.component';
import { AcceptReferralComponent } from './accept-referral/accept-referral.component';
import { DeletedReferralsComponent } from './deleted-referrals/deleted-referrals.component';
import { PendingReferralsComponent } from './pending-referrals/pending-referrals.component'
import { SentReferralsComponent } from './sent-referrals/sent-referrals.component';
import { PendingAlliedComponent } from './pending-allied/pending-allied.component';
import { ReferralInfoComponent } from './referral-info/referral-info.component';
import { AlliedReferralInfoComponent } from './allied-referral-info/allied-referral-info.component';

const routes: Routes = [{
  path: '',
  component: ReferralComponent,
  children: [
    /*{
      path: 'all',
      component: ViewReferralComponent,
    },*/
    {
      path: 'pendingHospitalReferral',
      component: PendingReferralsComponent,
    },
    {
      path: 'acceptedReferral',
      component: AcceptReferralComponent,
    },
    {
        path: 'rejectedReferral',
        component: RejectedReferralComponent,
      },
      {
        path: 'deletedReferral',
        component: DeletedReferralsComponent,
      },
      {
        path: 'sentReferral',
        component: SentReferralsComponent
      },
      {
        path: 'pendingAllied',
        component: PendingAlliedComponent
      },
      {
        path:'alliedReferralInfo',
        component: AlliedReferralInfoComponent
      },
      {
        path: 'referralInfo',
        component: ReferralInfoComponent
      }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralRoutingModule { }

export const routedComponents = [
    ReferralComponent,
    RejectedReferralComponent,
    AcceptReferralComponent,
    DeletedReferralsComponent,
    PendingAlliedComponent,
    AlliedReferralInfoComponent
    // ViewReferralComponent
];
