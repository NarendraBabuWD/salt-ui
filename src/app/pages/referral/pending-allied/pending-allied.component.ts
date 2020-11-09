import { Component, OnInit } from '@angular/core';
import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../@core/services/http.service';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';

@Component({
  selector: 'ngx-pending-allied',
  templateUrl: './pending-allied.component.html',
  styleUrls: ['./pending-allied.component.scss']
})
export class PendingAlliedComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) { }
    pendingReferralsArray:any=[];

  // pendingReferralsArray = [
  //   {  patientName: 'Carolina SCHEIN',  alliedHealthName: 'Dr Susan Charlton | Dermatology',
  //     lastModifiedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Ms Anna ANDREWS',  alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   lastModifiedOn: '05 Aug 2020 06:43'},
  //   {  patientName: 'Mr Fred ANDREWS', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   lastModifiedOn: '05 Aug 2020 06:43' },
  //   { patientName: 'Mrs Penny ANDERSON',  alliedHealthName: 'Dr Susan Charlton | Dermatology' , 
  //   lastModifiedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Henry WATLAND',  alliedHealthName: 'Dr Susan Charlton | Dermatology', 
  //   lastModifiedOn: '05 Aug 2020 06:43' }
    
  // ];

  ngOnInit(): void {
      this.getPendingReferrals();
  }

  viewpendingAllied(referral){

    this.router.navigate(['pages/referral/alliedReferralInfo'],{queryParams:{refId:referral.referral_id}} )
  }
  getPendingReferrals() {
    this.pendingReferralsArray = [];
    let body = {  id:3}
    this.service.post('Refferals/SendRefferal', body, null).subscribe(
      (response) => {
        console.log(response);
        this.pendingReferralsArray = response;
    },  (error) => {
      this.toastr.error(error.error);
    });
}

acceptRef(referral){
    console.log(referral);
    // console.log(data);
  this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true,
  context:{ title:'Accept', data:'Are you sure, You want to accept this Referral?'} })
  .onClose.subscribe((res) => {
    if (res == 'delete') {
      let deleteById = { id: referral.referral_id};
      this.service.post('Refferals/AcceptRefferal', deleteById, null).subscribe(
        (response) => {
          this.getPendingReferrals();
          
          this.toastr.success('Referrals Accept successfully');
        },
        (error) => {
          this.toastr.error(error.error);
        });
    }
  });
  }



 rejectRef(data: any) {
   console.log(data);
  this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true,
  context:{ title:'Reject', data:'Are you sure, You want to reject this Referral?'} })
  .onClose.subscribe((res) => {
    if (res == 'delete') {
      let deleteById = { id: data.referral_id};
      this.service.post('Refferals/RejectRefferal', deleteById, null).subscribe(
        (response) => {
          this.getPendingReferrals();
          
          this.toastr.success('Referrals Rejected successfully');
        },
        (error) => {
          this.toastr.error(error.error);
        });
    }
  });
}

}

