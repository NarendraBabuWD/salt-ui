import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../@core/services/http.service';
import { Router } from '@angular/router';
// import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-referral-template',
  templateUrl: './referral-template.component.html',
  styleUrls: ['./referral-template.component.scss']
})
export class ReferralTemplateComponent implements OnInit {

  // constructor() { }
  
  // acceptTemplate: string;
  // rejectTemplate: string;

  ngOnInit(): void {
  }
   
  
  Minutes: any[] = [{ value: '-1', label: '' },
  { value: 300, label: 5 },
  { value: 600, label: 10 },
  { value: 900, label: 15 },
  { value: 1200, label: 20 },
  { value: 1800, label: 30 },
  { value: 2400, label: 40 },
  { value: 3000, label: 50 },
  { value: 3600, label: 60 }]

  autoAcceptAfterSeconds: any;
  IsAutoAccept: boolean; checked: boolean = false;
  // color: ThemePalette = 'warn';
  constructor(private htservice:HttpService,private router:Router) { }

  // ngOnInit(): void {
  //   this.IsAutoAccept = window.location.href.indexOf("/dashboard/AutoAccept") > -1
  //   forkJoin(
  //     this.GetTemplate("ACCEPTED"),
  //     this.GetTemplate("REJECTED")
  //     this._serv.GetUserSettings()
  //   ).subscribe((result: any) => {
  //     this.acceptTemplate = result[0].data.content.replace(/[\r\n]/g, "<br />");
  //     this.rejectTemplate = result[1].data.content.replace(/[\r\n]/g, "<br />");
  //     this.autoAcceptAfterSeconds = result[2].autoAcceptAfterSeconds
  //     if (this.autoAcceptAfterSeconds > 0) {
  //       this.checked = false
  //     }
  //   })
  // }

  gotoUpdateTemplate(tempCode) {
    this.router.navigate(['/pages/settings/updateTemplate'], { queryParams: { templateId: tempCode } });
  }

  GetTemplate(action){
  var lid=localStorage.getItam('locationid');
this.htservice.post('/Refferals/ResetReferralTemplate',{location_id:lid,action},null).subscribe(
  (response)=>{
    console.log(response);
  }
)
  }

  



  onBlurMethod() {
    const obj = {
      autoAcceptAfterSeconds: this.autoAcceptAfterSeconds
    }
     
  }

  UpdateAutoAccept() {
    if (!this.checked) {
      this.autoAcceptAfterSeconds = -1;
      this.onBlurMethod();
    }
  }
  acceptTemplate:string=`Dear Dr A Practitioner,<br>I would be happy to accept {PATIENT_ADDRESS} and will contact the patient on their contact information {PATIENT_ADDRESS} provided and book an appointment with them.<br><br>Thanks<br>Dr Mary Bloggs`;

   rejectTemplate:string=`Dear {PRACTITIONER_NAME},<br><br>I am unable to accept {PATIENT_NAME} at this point of time.<br><br>Thanks<br><div>{PROVIDER_NAME}</div><div>{PROVIDER_ADDRESS}</div><div>{PROVIDER_PHONE}<br></div>`

}
