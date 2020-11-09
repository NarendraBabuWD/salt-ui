import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult, AuthService } from './../../@core/services/auth.service';
import { Config } from '../../../app.config';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class NgxChangePasswordComponent {

  config = Config;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: AuthService, protected router: Router) { }

  changePassword(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    const postData = this.user;
    this.service.changePassword(postData).subscribe((result: AuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        setTimeout(() => {
          return this.router.navigateByUrl('/');
        }, this.config.redirectDelay);
      } else {
        this.errors = result.getErrors();
      }
    });
  }
}
