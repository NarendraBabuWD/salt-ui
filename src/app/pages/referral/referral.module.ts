import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferralRoutingModule, routedComponents } from './referral-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrService } from '../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../@core/data/enums.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReferralInfoComponent } from './referral-info/referral-info.component';


import {
  NbCardModule,
  NbDatepickerModule,
  NbCheckboxModule,
  NbAlertModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbActionsModule,
  NbTabsetModule,
  NbSpinnerModule,
  NbSelectModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { RejectedReferralComponent } from './rejected-referral/rejected-referral.component';
import { DeletedReferralsComponent } from './deleted-referrals/deleted-referrals.component';
import { PendingReferralsComponent } from './pending-referrals/pending-referrals.component';
import { SentReferralsComponent } from './sent-referrals/sent-referrals.component';
import { PendingAlliedComponent } from './pending-allied/pending-allied.component';
// import { ViewReferralComponent } from './view-referral/view-referral.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ReferralRoutingModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NbCardModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbAlertModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbActionsModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbTooltipModule,   
  ],
  declarations: [
    ...routedComponents,
    PendingReferralsComponent,
    SentReferralsComponent,
    PendingAlliedComponent,
    ReferralInfoComponent,
    // DeletedReferralsComponent,
    // RejectedReferralComponent,
    // ViewReferralComponent,
  ],
  providers: [
    EnumsService,
    ToastrService,
  ],
})
export class ReferralModule { }
