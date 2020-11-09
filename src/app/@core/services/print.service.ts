import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  isPrinting = false;
  showHeaderFooter = true;
  originalUrl: string;

  constructor(private router: Router) { }

  printDocument(documentName: string, showHeaderFooter: any) {
    this.isPrinting = true;
    this.showHeaderFooter = showHeaderFooter;
    this.originalUrl = this.router.url;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, ''],
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
      this.router.navigateByUrl(this.originalUrl);
    });
  }

  reportDetails: any [];
  reportHeading: any;
  reportData: any;
}
