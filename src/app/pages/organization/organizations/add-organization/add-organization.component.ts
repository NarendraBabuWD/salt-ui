import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../../@core/data/enums.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit, OnDestroy {
  public organizationForm: FormGroup;
  subscription: any;

  editMode = false;
  organizationId: any;
  locationId: any;
  loading = false;
  states: any;
  ttl:any;
  timeZones: any;
  orgtypeId: any;
  orgTypes: any;
  editOrgForm: FormGroup;
  isAlreadyExistTitle: boolean = false;
  errorMsg:any;
  orgemail:any;
  selectedOrgType: any;
  // maxMsglength: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService,private location:Location) {
      this.states = this.enums.state;
      this.ttl=this.enums.titles;
      this.timeZones = this.enums.timeZone;
      this.orgTypes = this.enums.orgTypes;
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.organizationId = params.id;
        this.orgtypeId = params.orgTypeId
        this.editMode = true;
        this.loadDetails(params.id);
      }

      // this.organizationForm = this.fb.group({
      //   business_name: ['', [Validators.required]],
      //   trading_name: [''],
      //   abn: ['', [Validators.required]],
      //   email: [''],
      //   businessContact: [''],
      //   location: this.fb.group({
      //     name:['',[Validators.required]],
      //     Identifier: ['', [Validators.required]],
      //     Phone: ['', [Validators.required]],
      //     email: ['', [Validators.required]],
      //     address: ['', [Validators.required]],
      //     suburb: ['', [Validators.required]],
      //     postcode: ['', [Validators.required]],
      //     state: ['', [Validators.required]],
      //     timezone: ['', [Validators.required]], 
      //     contact: this.fb.group({
      //       title:[''],
      //       name: ['', [Validators.required]],
      //       phone: ['', [Validators.required]],
      //       email: ['', [Validators.required]],
      //       designationId: ['', [Validators.required]],
      //     })
      //   }),
      // });
    
      
      this.organizationForm = this.fb.group({
        organisation_type_id: ['', [Validators.required]],
        // organisation_id:[this.organizationId],
        organisation_name: ['', [Validators.required]],
        trading_name: [''],
        abn: ['', [Validators.required]],
        email: [''],
        phone: ['',[Validators.maxLength,Validators.minLength]],
        locname:['',[Validators.required]],
        locidentifier: ['', [Validators.required]],
        locphone: ['', [Validators.required,Validators.maxLength,Validators.minLength]],
        locemail: ['', [Validators.required]], 
        locaddress: ['', [Validators.required]],
        locsuburb: ['', [Validators.required]],
        locpostcode: ['', [Validators.required,Validators.maxLength,Validators.minLength]],
        locstate: ['', [Validators.required]],
        loctimezone: ['', [Validators.required]],
        contitle:['',[Validators.required]],
        conname: ['', [Validators.required]],
        conphone: ['', [Validators.required,Validators.minLength,Validators.maxLength]],
        conemail: ['', [Validators.required]],
        conDesignationId: ['', [Validators.required]],
      });
    });

    this.editOrgForm = this.fb.group({
      organisation_type_id: ['', [Validators.required]],
      organisation_name: ['', [Validators.required]],
      trading_name: [''],
      abn: ['', [Validators.required]],
      email: [''],
      phone: ['',[Validators.minLength,Validators.maxLength]],
    });

  }

  get f() {
     return this.organizationForm.controls;
  }
 

  /*validatePhone(event){
    const enteredPhone = event.target.value;
    console.log(enteredPhone);
    console.log(enteredPhone.charAt(0));
    if(enteredPhone.charAt(0) === '0') {
      this.maxMsglength = 11;
      this.organizationForm.controls['phone'].setValidators(Validators.minLength(11));
    } else {
      this.maxMsglength = 10;
      this.organizationForm.controls['phone'].setValidators(Validators.minLength(10));
    }
  }*/

  loadDetails(id: string) {
    let body={ RoleId:id}
    this.service.post('Organization/GetRole',body, null).subscribe(
      response => {
        this.setDetails(response);
      },
      error => {
        this.toastr.error(error);
      },
    );
  }

  getOrgId(event:any){
    console.log(event);
    this.selectedOrgType = event;
  }

  checkEmail(event: any){
    const enteredEmail = event.target.value;

    this.isAlreadyExistTitle = false;
    this.errorMsg = '';
    console.log(this.selectedOrgType);
    console.log(enteredEmail);
      let body = {
        email: enteredEmail,
        organisation_type_id: this.selectedOrgType
    }
  
  this.service.post('Organisation/CheckEmail', body, null).subscribe(
        (response) => { 
           console.log(response);
           if(response){
            this.isAlreadyExistTitle = true;
            this.errorMsg = 'Already Exist';
            // this.toastr.error("Role Exist, Please enter different combination of organisation type and role name")
           }else{
            this.isAlreadyExistTitle = false;
            this.errorMsg = '';
           }
           
        },
        (error) => {
          this.toastr.error(error.error);
        });
    
   
  }
  onSubmit() {
    const formData = this.organizationForm.value;
    formData.loctimezone =   new Date();
    let postData:any = {};

    this.loading = true;
    if (this.organizationForm.valid == true) {
      if (this.editMode == false) {
        postData = JSON.stringify({...formData,status:1});
        this.service.postJson('Organisation/createOrganisation', postData).subscribe(
          (response) => {
            this.organizationForm.reset();
            //this.editMode = true;
           // this.setDetails(response);
            this.loading = false;
            this.toastr.success('Organization Saved Successfully');
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {
        formData.id = this.organizationId;
        postData = JSON.stringify(
                          {organisation_type_id: this.orgtypeId,
                           organisation_id: this.organizationId,...formData,
                           createdBy:1,updatedBy:1
                          });
        this.service.postJson('Organization/updateorganisation' , postData).subscribe(
          (response) => {
            this.organizationForm.reset();
            this.editMode = true;
           // this.setDetails(response);
            this.loading = false;
            this.toastr.success('Organization Updated Successfully');
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error);
          });
      }
    }
  }

  setDetails(data: any) {
    if (data) {
      this.organizationId = data.id;
      this.f.name.setValue(data.name);
      this.f.tradingName.setValue(data.tradingName);
      this.f.abn.setValue(data.abn);
      this.f.businessEmail.setValue(data.businessEmail);
      this.f.businessContact.setValue(data.businessContact);
    }
    this.loading = false;
  }
  
  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
   // this.router.navigate(['/pages/organization/all']);
  }

  cancel() {
    this.location.back();
    //this.router.navigate(['/pages/organization/all']);
  }
}
