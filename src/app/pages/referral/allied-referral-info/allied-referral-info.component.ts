import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../@core/services/http.service';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { Router,ActivatedRoute } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-allied-referral-info',
  templateUrl: './allied-referral-info.component.html',
  styleUrls: ['./allied-referral-info.component.scss']
})
export class AlliedReferralInfoComponent implements OnInit {
    template: any;
    refId:any;
    subscription:any;
    




  ngOnInit(): void {
    this.subscription=this.actRoute.queryParams.subscribe(params=>{
      if(params && params.refId){
        this.refId=params.refId;

      }
    })

  }
  editorConfig: AngularEditorConfig;
  templateSaved: boolean = false;
  constructor( private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
private service: HttpService, private loc:Location, private actRoute:ActivatedRoute, private enums: EnumsService ) {

this.template="Dear Dr A Practitioner,<br>I would be happy to accept Michigaan,little caves <br>and will contact the patient on their contact information, provided and book an appointment with them.<br>NOV-09-1991 <br> Thanks <br> DR Madhavan"
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter template text here...',
      toolbarHiddenButtons: [["insertImage", "insertVideo", "toggleEditorMode", "customClasses"]]
    }
  }



  AcceptRef(){
 // console.log(data);
        let deleteById = { id: this.refId};
        this.service.post('Refferals/AcceptRefferal', deleteById, null).subscribe(
          (response) => {
            // this.getPendingReferrals();
            
            this.toastr.success('Referrals Accept successfully');
            this.loc.back();
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
   
  
      RejectedRef(){
        // console.log(data);
               let deleteById = { id: this.refId};
               this.service.post('Refferals/RejectRefferal', deleteById, null).subscribe(
                 (response) => {
                   // this.getPendingReferrals();
                   
                   this.toastr.success('Referrals Rejected successfully');
                   this.loc.back();
                 },
                 (error) => {
                   this.toastr.error(error.error);
                 });
             }
          
       
  }

   
