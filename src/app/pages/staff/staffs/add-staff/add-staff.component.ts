import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../../@core/data/enums.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit, OnDestroy {
  public staffForm: FormGroup;
  subscription: any;
  myFormValueChanges$: any;

  editMode = false;
  staffId: any;
  loading = false;
  states: any;
  tit:any;
  roles: any;
  preferences: any = [];
  locations: any;
  organizations: any;
  orgName:any = "";
  locname:any = "";
  locationId:any = 0;
  organizationId: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService,private location: Location) {
      this.preferences = this.enums.preferences;
      this.orgName = this.enums.orgName;
      this.locname = this.enums.locname;
      this.locationId = this.enums.locationId;
      this.tit=this.enums.titles;

      this.organizationId = localStorage.getItem("organisationId");
      //this.loadOrganizations();
      this.loadLocations();
      this.loadRoles();   
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.staffId = params.id;
        this.editMode = true;
         this.loadStaffDetails(this.staffId);
      }

      this.staffForm = this.fb.group({
        organisation_location_id:[''],
        // title: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z \-\']+')])],
        title: [ '',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')
          ]
        ],
        firstname: ['', [Validators.required]],
        surname: [''],
        mobile: ['', [Validators.required,Validators.minLength]],
        email: ['', [Validators.required]],
        address:[''],
        postcode: ['',[Validators.minLength]],
        city: [''],
        state: ['', [Validators.required]],
        password: ['', [Validators.required]],
        preference: ['', [Validators.required]],
        role_id: ['', [Validators.required]],
      });
    });
  }

  get f() {
     return this.staffForm.controls;
  }

  loadOrganizations(){
    this.service.get('Organization/getOrganisations', null).subscribe(
      (response) => {
        this.organizations = response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
     
  loadLocations() {
    //this.enums.orgName = event.organisation_name;
   // this.enums.orgName = localStorage.getItem("organizationName");
   let orgPId = { organisation_id: 4};
    this.service.post('Organisation/getOrganisationlocations', orgPId, null).subscribe(
      (response) => {
        this.locations = response.getlocs;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadRoles() {
    let empBody = {};
    this.service.post('Roles/GetRoles', empBody, null).subscribe(
      (response) => {
        this.roles =response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
  
  loadStaffDetails(id: string) {
    let getById = { id: id   };
    this.service.post('Staff/getstaff',getById, null).subscribe((response) => {
      this.loading = true;
      this.setDetails(response);
    }, (error) => {
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  setDetails(data: any) {
    if (data) {
      this.staffId = data.id;
      this.f.organisation_location_id.setValue(this.locationId)
      this.f.title.setValue(data.title);
      this.f.firstname.setValue(data.firstname);

      this.f.surname.setValue(data.surname);
      this.f.mobile.setValue(data.mobile);
      this.f.email.setValue(data.email);
      this.f.address.setValue(data.address);
      this.f.city.setValue(data.city);
      this.f.state.setValue(data.state);
      this.f.postcode.setValue(data.postcode);
      this.f.password.setValue(data.password);
      this.f.preference.setValue(data.preference);

      var staffLocs = data.getlocs;
     
      var index = staffLocs.find((i: any) => i.organisation_location_id == this.locationId);
      if(index != undefined){
        this.f.role_id.setValue(index.role_id);
      }
    }
    this.loading = false;
  }

  onSubmit() {
    const formData = this.staffForm.value;
    let postData:any;
    // this.loading = true;
    if (this.staffForm.valid == true) {
      if (this.editMode == false) {
        postData = {...formData, status: 1, created_by: 1};
        this.service.postJson('Staff/createstaff', postData).subscribe(
          (response) => {
            this.staffForm.reset();
            //this.editMode = true;
            //this.setDetails(response);
            this.loading = false;
            this.toastr.success('Staff Saved successfully');
            // this.router.navigate(['/pages/staff/all']);
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {
        formData.id = this.staffId;
        postData = {...formData,status: 1, updated_by: 1}
        this.service.postJson('Staff/updatestaff' , postData).subscribe(
          (response) => {
            this.staffForm.reset();
            this.editMode = true;
            //this.setDetails(response);
            this.loading = false;
            this.toastr.success('Staff Updated successfully');
            // this.router.navigate(['/pages/staff/all']);
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error);
          });
      }
    }
    else{
      alert("please enter valid data");
    }
}

  createStaffLocation(){
      this.router.navigate(['/pages/staff/location'], { queryParams: { id: this.locationId } });
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  cancel() {
    // this.location.back();
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/all']);
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/all']);
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/all']);
      }
  }
}
