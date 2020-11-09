import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `<div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
  <router-outlet></router-outlet></div>`,
})
export class NgxAuthComponent implements OnDestroy {

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService) {

    this.subscription = auth.onAuthenticationChange()
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
