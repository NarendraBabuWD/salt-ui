import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult, AuthService } from './../../@core/services/auth.service';
import { Config } from '../../../app.config';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class NgxRequestPasswordComponent {

  config = Config;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: AuthService, protected router: Router) { }

  forgotPassword(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    const postData = 'email=' + this.user.email;
    this.service.forgotPassword(postData).subscribe((result: AuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        setTimeout(() => {
          return this.router.navigate(['/auth/reset-password'], { queryParams: { email: this.user.email } });
        }, this.config.redirectDelay);
      } else {
        this.errors = result.getErrors();
      }
    });
  }
}
