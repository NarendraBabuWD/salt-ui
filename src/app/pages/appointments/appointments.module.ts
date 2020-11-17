
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsRoutingModule, routedComponents } from './appointments-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrService } from '../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../@core/data/enums.service';
import { NgSelectModule } from '@ng-select/ng-select';
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

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    AppointmentsRoutingModule,
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
  ],
  providers: [
    EnumsService,
    ToastrService,
  ],
})
export class AppointmentsModule { }
