import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from 'app/@core/data/enums.service';

@Component({
  selector: 'ngx-add-staff-location',
  templateUrl: './add-staff-location.component.html',
  styleUrls: ['./add-staff-location.component.scss']
})
export class AddStaffLocationComponent implements OnInit {
  public staffLocationForm: FormGroup;
  staffId: any;
  loading = false;
  roles: any;
  locations: any;
  organizations: any;
  orgName:any = "";
  locname:any = "";
  locationId:any = 0;
  staffs: any;
  subscription: any;
  staffLocationId: any;
  organizationId: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService) {
      this.orgName = this.enums.orgName;
      this.locname = this.enums.locname;
      this.locationId = this.enums.locationId;
      this.staffId = this.enums.staffId;
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.staffLocationId = params.id;
      }
        this.staffLocationForm = this.fb.group({
        staff_id:['', [Validators.required]],
        organisation_location_id:['', [Validators.required]],
        role_id: ['', [Validators.required]],
      });
    });

    this.organizationId = localStorage.getItem("organisationId");
    this.loadLocations(this.organizationId);
    //this.loadOrganizations();
    this.loadRoles(); 
    this.loadStaffs();
  }

  get f() {
     return this.staffLocationForm.controls;
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
     
  loadLocations(id : any) {
   // this.enums.orgName = event.organisation_name;
   //this.enums.orgName = localStorage.getItem("organisationName")
    this.service.get('Organization/getOrganisationlocations?organisation_id='+ id, null).subscribe(
      (response) => {
        this.locations = response.getlocs;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadRoles() {
    this.service.get('Roles/GetRoles', null).subscribe(
      (response) => {
        this.roles =response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
  
  loadStaffs(){
    this.service.get('Staff/getstaffs?organisation_location_id='+ this.staffLocationId, null).subscribe(
      (response) => {
        this.staffs = response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  setDetails(data: any) {
    if (data) {
      this.staffId = data.id;
      this.f.organisation_location_id.setValue(this.locationId);
      var staffLocs = data.getlocs;
      var index = staffLocs.find((i: any) => i.organisation_name == this.locationId);
      var objRole = { roleId: index.role_id, roleName: index.role_name};
      this.f.role_id.setValue(index.role_id);
    }
    this.loading = false;
  }

  onSubmit() {
    const formData = this.staffLocationForm.value;
    let postData:any;
    this.loading = true;
    if (this.staffLocationForm.valid == true) {
        postData = {...formData,  created_by: 1};
        let queryData = this.querify(postData);
        this.service.post('Staff/createstafflocation?'+queryData,null,null).subscribe(
          (response) => {
            this.staffLocationForm.reset();
            //this.setDetails(response);
            this.loading = false;
            this.toastr.success('Staff Location Saved successfully');
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });  
    }
}

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/pages/staff/view'],{ queryParams : {id: this.staffId }});
  }

  cancel() {
    this.router.navigate(['/pages/staff/view'],{ queryParams : {id: this.staffId }});
  }

  querify = function (json: any) {
    let querifiedString: string = '';
          // tslint:disable-next-line: forin
          for ( const key in json ) {
            querifiedString += key + '=' + json[key] + '&';
        }
        return querifiedString;
  };
}