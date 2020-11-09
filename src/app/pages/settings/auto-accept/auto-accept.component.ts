import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../@core/services/http.service';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';


@Component({
  selector: 'ngx-auto-accept',
  templateUrl: './auto-accept.component.html',
  styleUrls: ['./auto-accept.component.scss']
})
export class AutoAcceptComponent implements OnInit {
  oneReferral:any;
id='5eeb922effd26f28de6c866b'



  constructor(private service: HttpService,private toastr:ToastrService) { }

  ngOnInit(): void {
     
  }

  // Refferals/AcceptRefferal?id=5eeb922effd26f28de6c866b
AcceptRefferal(id){
let body={ id:this.id};
  this.service.post('Refferals/AcceptRefferal',body,null).subscribe(
    (response) => {
      this.oneReferral=response;
      console.log("Accept=",this.oneReferral)
  },  (error) => {
    this.toastr.error(error.error);
  });

}


  color='blue';
  // constructor() { }

  // ngOnInit(): void {
  // }
  Minutes: any[] = [{ value: '-1', label: '' },
  { value: 300, label: 5 },
  { value: 600, label: 10 },
  { value: 900, label: 15 },
  { value: 1200, label: 20 },
  { value: 1800, label: 30 },
  { value: 2400, label: 40 },
  { value: 3000, label: 50 },
  { value: 3600, label: 60 }]
  acceptTemplate: any;
  rejectTemplate: any;
  autoAcceptAfterSeconds: any;
  IsAutoAccept: boolean; 
  unchecked: boolean = false;
  // color: ThemePalette = 'warn';
  

  gotoUpdateTemplate(tempCode) {
    // this.router.navigate(['/dashboard/updatetemplate'], { queryParams: { templateId: tempCode } });
  }

  onBlurMethod() {
    const obj = {
      autoAcceptAfterSeconds: this.autoAcceptAfterSeconds
    }
     
  }

  UpdateAutoAccept() {
    this.IsAutoAccept=true;
    if (!this.unchecked) {
      this.autoAcceptAfterSeconds = -1;
      this.onBlurMethod();
    }
  }


}
