import { Component, OnInit } from '@angular/core';
import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../@core/services/http.service';
// import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-deleted-referrals',
  templateUrl: './deleted-referrals.component.html',
  styleUrls: ['./deleted-referrals.component.scss']
})
export class DeletedReferralsComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) { }


    ngOnInit(){
    this.DeleteRefferal();

    }


  // deletedReferralsArray = [
  //   {  patientName: 'Carolina SCHEIN', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology', 
  //      deletedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Ms Anna ANDREWS', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   deletedOn: '05 Aug 2020 06:43'},
  //   {  patientName: 'Mr Fred ANDREWS', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
  //   deletedOn: '05 Aug 2020 06:43' },
  //   { patientName: 'Mrs Penny ANDERSON', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology' ,
  //   deletedOn: '05 Aug 2020 06:43'},
  //   { patientName: 'Henry WATLAND', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology',
  //   deletedOn: '05 Aug 2020 06:43' }
    
  // ];

   

// /Refferals/DeleteRefferal
deletedReferralsArray:any=[];
DeleteRefferal(){
  // var rejId='5eeb922effd26f28de6c866b';
  let body={id:5}
  this.service.post('Refferals/DeleteRefferal',body,null).subscribe(
    (response) => {
      this.deletedReferralsArray=response;
      console.log("DeleteRefferal=",this.deletedReferralsArray);
  },  (error) => {
    this.toastr.error(error.error);
  });
}

}
