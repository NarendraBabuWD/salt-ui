import { Component, OnInit } from '@angular/core';
import { PrintService } from './../../@core/services/print.service';

@Component({
  selector: 'print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss'],
})
export class PrintLayoutComponent implements OnInit {
  showHeaderFooter = true;

  organizationName: string;
  address: string;
  reportHeaderText: string;
  reportFooterText: string;
  constructor(private printService: PrintService) { }

  ngOnInit() {
    this.showHeaderFooter = this.printService.showHeaderFooter;
    // TODO: Make a service call to get the header and footer details.
      this.reportHeaderText = 'Header text goes here';
      this.reportFooterText = 'Footer Text goes here';
      this.organizationName = 'Springfields School, Tolichowki';
      this.address = 'Plot No. 8-85-45/2, Azizbag, Tolichowki, Hyderabad- 500080, Ph. 040-541528774';
  }

}
