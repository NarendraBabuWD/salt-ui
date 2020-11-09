import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../app.config';

@Injectable()
export class HttpService {
  config = Config;
  constructor(private httpClient: HttpClient) { }

  get(url: string, headers: any | null): Observable<any> {
    const requestHeaders = this.getHeaders(headers);
    return this.httpClient.get(this.config.apiBaseUrl + url, { headers: requestHeaders });
  }

  getWithBody(url: string, body: any | null , headers: any | null): Observable<any> {
    let requestHeaders = this.getHeaders(headers);
    console.log(body+ "body");
    
    return this.httpClient.get(this.config.apiBaseUrl + url, { headers: requestHeaders, params: body });
  }

  getWithInput(url: string, body: any | null , headers: any | null): Observable<any> {
    const requestHeaders = this.getHeaders(headers);
    return this.httpClient.get(this.config.apiBaseUrl + url,  { headers: requestHeaders });
  }

  delete(url: string, headers: any | null): Observable<any> {
    const requestHeaders = this.getHeaders(headers);
    return this.httpClient.delete(this.config.apiBaseUrl + url, { headers: requestHeaders });
  }

  post(url: string, body: any | null, headers: any | null): Observable<any> {
    const requestHeaders = this.getHeaders(headers);
    return this.httpClient.post(this.config.apiBaseUrl + url, body, { headers: requestHeaders });
  }

  put(url: string, body: any | null, headers: any | null): Observable<any> {
    const requestHeaders = this.getHeaders(headers);
    return this.httpClient.put(this.config.apiBaseUrl + url, body, { headers: requestHeaders });
  }

  auth(body: any | null): Observable<any> {
    //const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const finalHeaders = Object.assign({}, null,
     
      {
        'Accept': '*/*',
      },
      {'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',}
     
  );
   const requestHeaders = new HttpHeaders(finalHeaders);
   return this.httpClient.post(this.config.authenticationTokenUrl, body, { headers: requestHeaders });

   // return this.httpClient.post(this.config.authenticationTokenUrl, body, { headers: requestHeaders, withCredentials:true });
  }

  upload(url: string, body: any | null): Observable<any> {
    const requestHeaders = this.getJsonHeaders(null);
    return this.httpClient.post(this.config.apiBaseUrl + url, body, { headers: requestHeaders });
  }

  postJson(url: string, body: any | null): Observable<any> {
   
    const requestHeaders = this.getJsonHeaders(null);
    return this.httpClient.post(this.config.apiBaseUrl + url, body, { headers: requestHeaders });
  }

  putJson(url: string, body: any | null): Observable<any> {
    const requestHeaders = this.getJsonHeaders(null);
    return this.httpClient.put(this.config.apiBaseUrl + url, body, { headers: requestHeaders });
  }

  uploadMedia(url: string, body: any | null): Observable<any> {
    const requestHeaders = this.getJsonHeaders(null);
    return this.httpClient.post(this.config.mediaUploadUrl + url, body, { headers: requestHeaders });
  }

  mediaPath(id: string) {
    const domainName =  this.getCustomerDomainName();
    return Config.mediaViewUrl + '?id=' + domainName + '&gid=' + id + '&random=' + Math.floor(Date.now() / 1000);
  }

  private getHeaders(headers: any): HttpHeaders {
    const token = this.getToken();
    const userName = this.getUser();
    const domainName = this.getCustomerDomainName();
    const academicYear = this.getAcademicYear();

    const finalHeaders = Object.assign({}, headers,
      {
        'Authorization': 'bearer ' + token,
      },
      {
        'content-type': 'application/json',
      },
      // {
      //   'domain-name': domainName,
      // },
      // {
      //   'user-name': userName,
      // },
      // {
      //   'academic-year': academicYear,
      // },
  );
    return new HttpHeaders(finalHeaders);
  }

  private getJsonHeaders(headers: any): HttpHeaders {
    const token = this.getToken();
    const userName = this.getUser();
    const domainName = this.getCustomerDomainName();
    const academicYear = this.getAcademicYear();

    const finalHeaders = Object.assign({}, headers,
      {
        'Authorization': 'bearer ' + token,
      },
      {
        'content-type': 'application/json',
      },
      // {
      //   'domain-name': domainName,
      // },
      // {
      //   'user-name': userName,
      // },
      // {
      //   'academic-year': academicYear,
      // },
  );
    return new HttpHeaders(finalHeaders);
  }

  getToken() {
    return sessionStorage.getItem('accessToken');
  }

  getUser() {
    return sessionStorage.getItem('userName');
  }

  getCustomerDomainName() {
    if (localStorage.getItem('domain')) {
     return localStorage.getItem('domain');
    }
  }

  getAcademicYear() {
    if (sessionStorage.getItem('currentAcademicYearId')) {
      return sessionStorage.getItem('currentAcademicYearId');
    }
    return 1;
  }
}
