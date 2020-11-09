import { Component, OnInit } from '@angular/core';
import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../@core/services/http.service';
// import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-sent-referrals',
  templateUrl: './sent-referrals.component.html',
  styleUrls: ['./sent-referrals.component.scss']
})
export class SentReferralsComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) { }

  // sentReferralsArray = [
  //   {  patientName: 'Carolina SCHEIN',  alliedHealthName: 'Dr Susan Charlton | Dermatology', status: 'ACCEPTED',
  //     sentReferralOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Ms Anna ANDREWS',  alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality', status: 'ACCEPTED',
  //   sentReferralOn: '05 Aug 2020 06:43'},
  //   {  patientName: 'Mr Fred ANDREWS', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality', status: 'ACCEPTED',
  //   sentReferralOn: '05 Aug 2020 06:43' },
  //   { patientName: 'Mrs Penny ANDERSON',  alliedHealthName: 'Dr Susan Charlton | Dermatology' , status: 'ACCEPTED',
  //   sentReferralOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Henry WATLAND',  alliedHealthName: 'Dr Susan Charlton | Dermatology', status: 'ACCEPTED',
  //   sentReferralOn: '05 Aug 2020 06:43' }
    
  // ];
 

  ngOnInit(){
    this.SendRefferal();
  }
  sentReferralsArray:any=[];
SendRefferal(){
  // var rejId='5eeb922effd26f28de6c866b';
  let body={id:4}
  this.service.post('Refferals/SendRefferal',body,null).subscribe(
    (response) => {
      this.sentReferralsArray=response;
      console.log("send=",this.sentReferralsArray);
  },  (error) => {
    this.toastr.error(error.error);
  }); 
 
}

}
