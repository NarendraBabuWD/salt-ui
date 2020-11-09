import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';

export class AuthResult {
    protected errors: string[] = [];
    protected messages: string[] = [];

    constructor(protected success: boolean, protected response?: any, errors?: any, messages?: any) {

      this.errors = this.errors.concat([errors]);
      if (errors instanceof Array) {
        this.errors = errors;
      }

      this.messages = this.messages.concat([messages]);
      if (messages instanceof Array) {
        this.messages = messages;
      }
    }

    getResponse(): any {
      return this.response;
    }

    getErrors(): string[] {
      return this.errors.filter(val => !!val);
    }

    getMessages(): string[] {
      return this.messages.filter(val => !!val);
    }

    isSuccess(): boolean {
      return this.success;
    }

    isFailure(): boolean {
      return !this.success;
    }
}

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {
   }

  authenticateUser(postData?: any): Observable<AuthResult> {
    return this.http.auth(postData)
      .map((response) => {
        this.storeUserDetails(response);
        return new AuthResult(true, response, [], '');
      })
      .catch((response) => {
        const errors = [];

        if (response instanceof HttpErrorResponse) {
          if (response.message) {
            errors.push(response.message);
          } else {
            errors.push(response.statusText + ' : ' + response.message);
          }
        } else {
          errors.push('Something went wrong.');
        }
        return of(
          new AuthResult(false, response, errors, ''));
      });
  }

  isAuthenticated(): Observable<any> {
    let result: boolean = false;
    if (this.getToken()) {
      result = true;
    }
    return of(result);
  }

  changePassword(postData?: any): Observable<AuthResult>  {
    const apiUrl = 'account/ChangePassword';
    return this.http.post(apiUrl, this.querify(postData), null)
    .map((response) => {
      return new AuthResult(true, response, [], '');
    })
    .catch((response) => {
      const errors = [];
      if (response instanceof HttpErrorResponse) {
        if (response.error.Message) {
          errors.push(response.statusText + ' : ' + response.error.Message);
        } else {
          errors.push(response.statusText + ' : ' + response.error);
        }

      } else {
        errors.push('Something went wrong.');
      }
      return of(
        new AuthResult(false, response, errors, ''));
    });
  }

  resetPassword(postData?: any): Observable<AuthResult>  {
    const apiUrl = 'account/resetPassword';
    return this.http.post(apiUrl, this.querify(postData), null)
    .map((response) => {
      return new AuthResult(true, response, [], '');
    })
    .catch((response) => {

      const errors = [];
      if (response instanceof HttpErrorResponse) {
        if (response.error.message) {
          errors.push(response.statusText + ' : ' + response.error.message);
        } else {
          errors.push(response.statusText + ' : ' + response.error);
        }

      } else {
        errors.push('Something went wrong.');
      }
      return of(
        new AuthResult(false, response, errors, ''));
    });
  }


  forgotPassword(postData?: any): Observable<AuthResult>  {
    const apiUrl = 'account/ForgotPassword';
    return this.http.post(apiUrl, this.querify(postData), null)
    .map((response) => {
      return new AuthResult(true, response, [], '');
    })
    .catch((response) => {
      const errors = [];

      if (response instanceof HttpErrorResponse) {
        if (response.error.Message) {
          errors.push(response.statusText + ' : ' + response.error.Message);
        } else {
          errors.push(response.statusText + ' : ' + response.error);
        }
      } else {
        errors.push('Something went wrong.');
      }
      return of(
        new AuthResult(false, response, errors, ''));
    });
  }

  private storeUserDetails(response: any) {
    sessionStorage.setItem('roleId', response.userDetails.roleId);
    sessionStorage.setItem('userName', response.userDetails.userName);
    //sessionStorage.setItem('userBranches', response.userDetails.userBranches);
    sessionStorage.setItem('userFullName', response.userDetails.fullName);
    sessionStorage.setItem('accessToken', response.token);
    sessionStorage.setItem('userRole', response.userDetails.userRole);   
    sessionStorage.setItem('organisationId', response.userDetails.organisationId);   
    sessionStorage.setItem('organisationName', response.userDetails.organisationName);
    sessionStorage.setItem('organizationTypeId', response.userDetails.organisationTypeId.toString());

  }

  getToken() {
     return sessionStorage.getItem('accessToken');
  }

  getUser() {
    return sessionStorage.getItem('userName');
  }

  getInstitutionDetails()  {

    const details = {
        instituteName: sessionStorage.getItem('instituteName'),
        address: sessionStorage.getItem('address'),
        city: sessionStorage.getItem('city'),
    };
    return details;
  }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('isAdmin');
  }

  querify = function (json: any) {
    let querifiedString: string = '';
          // tslint:disable-next-line: forin
          for ( const key in json ) {
            querifiedString += key + '=' + json[key] + '&';
        }
        return querifiedString;
  };
}
