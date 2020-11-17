import { Component, OnInit } from '@angular/core';
// import { EnumsService } from '../../../@core/data/enums.service';
import { HttpService } from '../../../../@core/services/http.service';
// import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { Router } from '@angular/router';
// import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'ngx-add-appointment-type',
  templateUrl: './add-appointment-type.component.html' 
})
export class AddAppointmentTypeComponent implements OnInit { 

  public addAppTypeForm: FormGroup;
  selectLocations: Boolean = false;

  constructor(private router: Router, private fb: FormBuilder,
              private toastr: ToastrService,
              private dialogService: NbDialogService, 
              private service: HttpService) { }

              locations = [
                { id:1, name: "loc1", status: false},
                { id:2, name: "loc2", status: false}
              ]

   ngOnInit(): void {  

    this.addAppTypeForm = this.fb.group({
      ServiceCode:[''],
      AccountingCode: [ '',[Validators.required]],
      Name: ['', [Validators.required]],
      Description: [''],
      CategoryId: [''],
      Color: ['', [Validators.required]],
      Duration:[''],
      Price: ['',[Validators.minLength]],
      // IsIncGST: [''],
      ProviderId: ['', [Validators.required]],
      Organisation_Location_Id: ['', [Validators.required]]
    });

        // this.getProvidersList(); 
    }              

    get f() {
      return this.addAppTypeForm.controls;
   }
 


    onItemChange(value){
      console.log(" Value is : ", value );
      if(value == 2){
        this.selectLocations = true;
      } else {
        this.selectLocations = false;
      }
   }

    getProvidersList(){
    
      let  body = { OrgTypeId: 3 };
      this.service.post('Staff/getStaffdetailsbyorgtype', body, null).subscribe(
        (response) => {
          console.log(response);
          
      },  (error) => {
        this.toastr.error(error.error);
      });
    
      }
    
      onSubmit(){
        console.log(this.addAppTypeForm.value);  
      }
      
}
