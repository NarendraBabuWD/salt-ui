import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './@core/services/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {
authenticated: boolean;
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    // return true;
    return this.authService.isAuthenticated()
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      });
  }
}
