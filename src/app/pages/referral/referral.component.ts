
import { Component, OnInit } from '@angular/core';
import { EnumsService } from '../../@core/data/enums.service';
import { HttpService } from '../../@core/services/http.service';
// import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from '../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-referral',
  template: `<router-outlet></router-outlet>`,
})

export class ReferralComponent implements OnInit{ 

 
  referrals:any;
  oneReferral:any;
  referralId:any;
  acceptedReferralsArray:any=[];
  rejectedReferralsArray:any=[];
  id:'5eeb922effd26f28de6c866b'

  constructor(private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) { }

  ngOnInit(): void {
    // this.loadReferrals();
    this.GetReferral();
    // this.AcceptRefferal();
    // this.RejactRefferal();
    // this.SendRefferal();
    // this.DeleteRefferal();
  }


  loadReferrals() {
    alert("ref");
    this.service.get('Refferals/GetRefferals', null).subscribe(
      (response) => {
        this.referrals = response;
        console.log("referrals=",this.referrals)
        // this.dataGridSource.load(this.subscriptions);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
  

  viewReferral(id){

  }


  // this.referralId='5eeb922effd26f28de6c866b';
  GetReferral() {
    // debugger
    this.service.get('Refferals/GetRefferal?id=5eeb922effd26f28de6c866b',null).subscribe(
      (response) => {
        this.oneReferral=response;
        console.log("oneref=",this.oneReferral)
    },  (error) => {
      this.toastr.error(error.error);
    });
}

// Refferals/AcceptRefferal?id=5eeb922effd26f28de6c866b
AcceptRefferal(){
  this.service.post('Refferals/AcceptRefferal?id='+this.id,null,null).subscribe(
    (response) => {
      this.oneReferral=response;
      console.log("Accept=",this.oneReferral)
  },  (error) => {
    this.toastr.error(error.error);
  });

}

// rejectedReferralsArray  
RejactRefferal(){
  alert("reje");
  // var rejId='5eeb922effd26f28de6c866b';
  // debugger
  this.service.post('Refferals/RejectRefferal?id='+this.id,null,null).subscribe(
    (response) => {
      this.rejectedReferralsArray=response;
      console.log("reject=",this.rejectedReferralsArray)
  },  (error) => {
    this.toastr.error(error.error);
  });

}

postReferral:any=[];
SendRefferal(){
  alert("SendRefferal");
  // var rejId='5eeb922effd26f28de6c866b';
  let body={id:this.id}
  this.service.post('Refferals/SendRefferal',body,null).subscribe(
    (response) => {
      this.postReferral=response;
      console.log("send=",this.postReferral);
  },  (error) => {
    this.toastr.error(error.error);
  });

//  /Refferals/ReadJsonFiledocone
// docOne(){
//   this.service.post('/Refferals/ReadJsonFiledocone',body,null).subscribe(
//     (response) => {
//       this.
//     }
//   )
// }




}






// /Refferals/DeleteRefferal
deleteRefferal:any=[];
DeleteRefferal(){
  alert("DeleteRefferal");
  // var rejId='5eeb922effd26f28de6c866b';
  this.service.post('Refferals/DeleteRefferal?id='+this.id,null,null).subscribe(
    (response) => {
      this.deleteRefferal=response;
      console.log("DeleteRefferal=",this.deleteRefferal);
  },  (error) => {
    this.toastr.error(error.error);
  });
}



}
