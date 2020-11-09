import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AuthService } from './@core/services/auth.service';
import { AuthGuard } from './auth-guard.service';
import { HttpService } from './@core/services/http.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
} from '@nebular/theme';

import { MomentModule } from 'angular2-moment';
import { CurrencyPipe } from '@angular/common';
import { PrintService } from './@core/services/print.service';
import { ExcelService } from './@core/services/excel.service';

@NgModule({
  declarations: [AppComponent, ...routedComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbEvaIconsModule,
    MomentModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    AuthService,
    HttpService,
    CurrencyPipe,
    PrintService,
    ExcelService,
  ],
})
export class AppModule {
}
