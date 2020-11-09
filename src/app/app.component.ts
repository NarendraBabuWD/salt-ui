import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { PrintService } from './@core/services/print.service';

@Component({
  selector: 'ngx-app',
  template: `
  <div [class.isPrinting]="printService.isPrinting">
  <router-outlet></router-outlet>
  <router-outlet name="print"></router-outlet>
</div>
  `,
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService, public printService: PrintService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
