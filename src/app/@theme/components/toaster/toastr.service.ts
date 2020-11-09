import { Injectable } from '@angular/core';
import 'style-loader!angular2-toaster/toaster.css';
import { ToasterConfig } from 'angular2-toaster';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({ providedIn: 'root' })
export class ToastrService {

  config: ToasterConfig;
  index = 1;
  typesPrimary: NbComponentStatus = 'primary';
  typesSuccess: NbComponentStatus = 'success';
  typesInfo: NbComponentStatus = 'info';
  typesWarning: NbComponentStatus = 'warning';
  typesDanger: NbComponentStatus = 'danger';

  constructor(private toasterService: NbToastrService) { }

  public primary(body: string = '', title: string = '') {
    const config = {
      status: this.typesPrimary,
      destroyByClick: true,
      duration: 5000,
      preventDuplicates: true,
    };
    this.index += 1;
    body = body || 'Action is performed successfully.',
      title = 'Information!',
      this.toasterService.show(body, title, config);
  }

  public info(body: string = '', title: string = '') {
    const config = {
      status: this.typesInfo,
      destroyByClick: true,
      duration: 5000,
      preventDuplicates: true,
    };
    this.index += 1;
    body = body || 'Action is performed successfully.',
      title = 'Information!',
      this.toasterService.show(body, title, config);
  }

  public success(body: string = '', title: string = '') {
    const config = {
      position:NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: this.typesSuccess,
      destroyByClick: true,
      duration: 5000,
      preventDuplicates: false,
    };
    this.index += 1;
    body = body || 'Action is performed successfully.',
      title = 'Success!',
      this.toasterService.show(body, title, config);
  }

  public warning(body: string = '', title: string = '') {
    const config = {
      position:NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: this.typesWarning,
      destroyByClick: true,
      duration: 5000,
      preventDuplicates: false,
    };
    this.index += 1;
    body = body || 'Wanting is performed successfully.',
      title = 'Warning!',
      this.toasterService.show(body, title, config);
  }

  public error(body: string = '', title: string = '') {
    const config = {
      position:NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: this.typesDanger,
      destroyByClick: true,
      duration: 5000,
      preventDuplicates: false,
    };
    this.index += 1;
    body = body || '',
      title = 'Error!',
      this.toasterService.show(body, title, config);
  }
}
