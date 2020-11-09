import { EnumsService } from './../../../../@core/data/enums.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit, OnDestroy {
  public locationForm: FormGroup;
  subscription: any;

  editMode = false;
  organizationId: any;
  locationId: any;
  loading = false;
  states: any;
  timeZones: any;
  orgtypeId: any;
  orgTypes: any;
  public locationEditForm: FormGroup;
  selectedItem: number;
  selectedOrg: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService,private location:Location) {
      // this.states = this.enums.states;
      this.timeZones = this.enums.timeZone;
      this.states=this.enums.state;
      this.orgTypes = this.enums.orgTypes;
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.selectedOrg = params.orgId;
      if (params && params.id) {
        this.organizationId = params.id;
        this.orgtypeId = params.orgTypeId
        this.editMode = true;
        this.selectedItem = 2;
        this.loadLocation(params.id);
      }

      this.locationForm = this.fb.group({
        locname:['',[Validators.required]],
        locidentifier: ['', [Validators.required]],
        locphone: ['', [Validators.required,Validators.maxLength,Validators.minLength]],
        locemail: ['', [Validators.required]], 
        locaddress: ['', [Validators.required]],
        locsuburb: ['', [Validators.required]],
        locpostcode: ['', [Validators.required]],
        locstate: ['', [Validators.required]],
        loctimezone: ['', [Validators.required]],
        contitle:['',Validators.pattern('^[a-zA-Z \-\']+')],
        conname: ['', [Validators.required]],
        conphone: ['', [Validators.required,Validators.minLength,Validators.maxLength]],
        conemail: ['', [Validators.required]],
        condesignationid: ['', [Validators.required]],
      });

      this.locationEditForm = this.fb.group({
        locname:['',[Validators.required]],
        locidentifier: ['', [Validators.required]],
        locphone: ['', [Validators.required,Validators.minLength,Validators.maxLength]],
        locemail: ['', [Validators.required]], 
        locaddress: ['', [Validators.required]],
        locsuburb: ['', [Validators.required]],
        locpostcode: ['', [Validators.required,Validators.minLength,Validators.maxLength]],
        locstate: ['',],
        loctimezone: ['', [Validators.required]],
        locstatus:['1'],
        loctitle:['',]
      });
    });
  }

  get f() {
    let loccontrols:any;
    (this.editMode == false)? loccontrols= this.locationForm.controls:
     loccontrols = this.locationEditForm.controls;
     return loccontrols;
  }

  loadLocation(id: string) {
    let orgLocID = {  organisation_location_id: id } ;
    this.service.post('Organisation/getOrganisationlocation', orgLocID, null).subscribe(
      response => {
        this.loading =true;
        this.setDetails(response);
      },
      error => {
        this.loading = false;
        this.toastr.error(error);
      },
    );
  }

  onSubmit() {
    const formData = (this.editMode == false)?this.locationForm.value:this.locationEditForm.value;
    // formData.loctimezone =   new Date();
    let postData:any = {};
    this.loading = true;
    if (this.locationForm.valid == true || this.locationEditForm.valid == true) {
      if (this.editMode == false) {
        // this.organizationId = this.enums.OrganizationId;
        postData = JSON.stringify({organisation_id: this.selectedOrg, ...formData, created_by:1});
        console.log(postData);
        this.service.postJson('Organisation/createOrganisationlocation', postData).subscribe(
          (response) => {
            this.locationForm.reset();
            this.loading = false;
            this.toastr.success('Location Saved Successfully');

            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {
        formData.id = this.organizationId;
        formData.loctitle=formData.locname;
        postData = JSON.stringify(
                          {organisation_type_id: this.orgtypeId,
                           organisation_id: this.organizationId,
                           organisation_location_id: this.locationId,
                            ...formData,
                           locupdated_by: 1
                          });
                          
        this.service.postJson('Organisation/updateorganisationlocation' , postData).subscribe(
          (response) => {
            
            this.locationEditForm.reset();
            this.editMode = true;
            this.loading = false;
            this.toastr.success(response.message);

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
    console.log(data);
    if (data) {      
      this.organizationId = data.organisation_id;
      this.locationId = data.organisation_location_id;
      this.f.locname.setValue(data.locaddress);
      this.f.locidentifier.setValue(data.locidentifier);
      this.f.locemail.setValue(data.locemail);
      this.f.locphone.setValue(data.locphone);
      this.f.locaddress.setValue(data.locaddress);
      this.f.loctimezone.setValue(data.loctimezone);
      this.f.locsuburb.setValue(data.locsuburb);
      this.f.locpostcode.setValue(data.locpostcode);
      this.f.locstate.setValue(data.locstate);
      this.f.locstatus.setValue(data.locstatus);
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
