import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by"><b><a href="http://www.jtsoftsolutions.com" target="_blank">JT Soft Solutions</a></b> {{currentYear}}</span>
  <div class="socials">
    <a href="#" target="_blank" class="ion ion-social-facebook"></a>
    <a href="#" target="_blank" class="ion ion-social-twitter"></a>
    <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
  </div>
  `,
})
export class FooterComponent {  currentYear = new Date().getFullYear(); }
