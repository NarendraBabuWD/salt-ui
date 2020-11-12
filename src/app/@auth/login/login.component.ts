import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResult, AuthService } from './../../@core/services/auth.service';
import { Config } from '../../../app.config';
import { HttpService } from './../../@core/services/http.service';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class NgxLoginComponent  {

  config = Config;
  showMessages: any = {};

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  submitted: boolean = false;
  validDomain: boolean = false;
  isReadOnly: boolean = false;
  ValidatingDomain: boolean = false;
  logoUrl: string = '';

  constructor(protected service: AuthService, 
              protected router: Router,
              private httpService: HttpService,
              private route: ActivatedRoute) {
                this.service.logout();

                if (localStorage.getItem('domain')) {
                  this.user.domain = localStorage.getItem('domain');
                  this.validDomain = true;
                }
                // Get logo
                if (localStorage.getItem('logoUrl')) {
                  this.logoUrl = this.httpService.mediaPath(localStorage.getItem('logoUrl'));
                } else {
                  this.logoUrl = '../assets/images/edunixLogo.png';
                }
  }

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.route.url.subscribe(() =>{
      // console.log(this.route.snapshot);
      console.log(this.route.snapshot['_routerState'].url); 
      if( this.route.snapshot['_routerState'].url == "/owner/login"){
        this.user.domain = "loc1";
        this.isReadOnly = true;
      } else{
        this.user.domain = "";
        this.isReadOnly = false;
      }
      
    });
  }

  // validateDomain() {
  //   if (this.user.domain) {
  //     this.ValidatingDomain = true;
  //     localStorage.setItem('domain', this.user.domain);
  //     this.validDomain = true;
  //   }
  // }

  login(): void {
    
    // For directly redirecting to dashboard
    // this.router.navigate(['/pages/dashboard']);
    // this.router.navigateByUrl('/');
    //         setTimeout(() => {
    //           return this.router.navigateByUrl('/');
    //         }, this.config.redirectDelay);

        this.errors = this.messages = [];
        this.submitted = true;
        this.showMessages.error = false;

        console.log(this.user);
        
        const postData: any = 'UserName=' + this.user.email + '&Password=' + this.user.password;
       /* const jsonData : any = JSON.stringify({
          UserName : this.user.email,
          Password : this.user.password,
          Identifier : this.user.domain
        })*/
        const jsonData : any = {
          UserName : this.user.email,
          Password : this.user.password,
          Identifier : this.user.domain
        }
      console.log(jsonData);
     
        this.service.authenticateUser(jsonData).subscribe((result: AuthResult) => {
          this.submitted = false;
          if (result.isSuccess()) {            
            this.showMessages.success = true;
            this.logoUrl = this.httpService.mediaPath(result.getResponse().logoUrl);
            localStorage.setItem('domain', this.user.domain);
            localStorage.setItem('organisationId', result.getResponse().userDetails.organisationId);
            localStorage.setItem('organisationName', result.getResponse().userDetails.organisationName);
          
            this.messages.push('Please wait. Redirecting to dashboard.');
            console.log(result);
            setTimeout(() => {
            if(sessionStorage.getItem("organizationTypeId") === '1'){
                 this.router.navigateByUrl('/owner/ownerDashboard');
                 console.log("1");

                 
            } else if(sessionStorage.getItem("organizationTypeId") === '2'){
              this.router.navigate(['/practice/practitionerDashboard']);
              console.log("2");
            } else if(sessionStorage.getItem("organizationTypeId") === '3'){
              this.router.navigateByUrl('/allied/alliedHealthDashboard'); 
              console.log("3");
         }
        }, this.config.redirectDelay);
           /* setTimeout(() => {
              return this.router.navigateByUrl('referral');
            }, this.config.redirectDelay);*/
          } else {
            this.showMessages.error = true;
            this.errors = result.getErrors();
          }
        });
      }

    cleanLogin() {
    this.user.domain = '';
    this.validDomain = false;
    this.ValidatingDomain = false;
    localStorage.removeItem('domain');
    localStorage.removeItem('logoUrl');
    sessionStorage.removeItem('instituteName');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('city');
    this.errors = this.messages = [];
    this.logoUrl = this.config.baseUrl + 'resource/img/65cd45b0-28dd-4df1-a6d4-14101ed1c470';
  }
}
