import { Component, OnInit } from '@angular/core';
import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../@core/services/http.service';
// import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-rejected-referral',
  templateUrl: './rejected-referral.component.html',
  styleUrls: ['./rejected-referral.component.scss']
})
export class RejectedReferralComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) { }

    ngOnInit(): void {  
      this.RejactRefferal(); 
    }
  // rejectedReferralsArray = [
  //   {  patientName: 'Carolina SCHEIN', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology', 
  //     comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Ms Anna ANDREWS', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
  //   {  patientName: 'Mr Fred ANDREWS', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43' },
  //   { patientName: 'Mrs Penny ANDERSON', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology' ,
  //   comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Henry WATLAND', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology',
  //   comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43' }
    
  // ];
 
  rejectedReferralsArray:any=[];
  RejactRefferal(){
    
  // var rejId='5eeb922effd26f28de6c866b';
  // debugger
  let  body={id:2};
  this.service.post('Refferals/RejectRefferal',body,null).subscribe(
    (response) => {
      this.rejectedReferralsArray=response;
      console.log("reject=",this.rejectedReferralsArray)
  },  (error) => {
    this.toastr.error(error.error);
  });

  }

  

}
