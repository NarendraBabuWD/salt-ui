import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlliedHealthRoutingModule, routedComponents } from './alliedhealth-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrService } from '../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../@core/data/enums.service';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  NbCardModule,
  NbLayoutModule,
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
// import { ViewAlliedComponent } from './view-allied/view-allied.component';
// import { ReferralTemplateComponent } from './referral-template/referral-template.component';


@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    AlliedHealthRoutingModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NbCardModule,
    NbLayoutModule,
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
    // ViewAlliedComponent,
    // ReferralTemplateComponent,
  ],
  providers: [
    EnumsService,
    ToastrService,
  ],
})
export class AlliedHealthModule { }
