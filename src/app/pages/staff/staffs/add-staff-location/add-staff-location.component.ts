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
      // this.staffId = this.enums.staffId;
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {

      // console.log(params.staffId);
      if (params && params.staffId) {
        this.staffLocationId = params.id;
        this.staffId = params.staffId;
      }
        this.staffLocationForm = this.fb.group({
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
    let body={}
    this.service.post('Organization/getOrganisations', body,null).subscribe(
      (response) => {
        this.organizations = response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
     
  loadLocations(id : any) {
    let body={organisation_id: id}

   // this.enums.orgName = event.organisation_name;
   //this.enums.orgName = localStorage.getItem("organisationName")
    this.service.post('Organisation/getOrganisationlocations',body, null).subscribe(
      (response) => {
        this.locations = response.getlocs;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadRoles() {
    let body={}
    this.service.post('Roles/GetRoles',body, null).subscribe(
      (response) => {
        this.roles =response;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
  
  loadStaffs(){
let body={
  organisation_location_id:this.staffLocationId
}
    this.service.post('Staff/getstaffs', body, null).subscribe(
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
  //  let staff_id:this.staffLocationId
    this.loading = true;
    if (this.staffLocationForm.valid == true) {
      console.log(formData);
      
        // postData = {...formData,created_by: 1};
        postData = {
          staff_id: this.staffId,
          organisation_location_id: formData.organisation_location_id,
          role_id: formData.role_id,
          created_by: 1
        }
        this.service.post('Staff/createstafflocation',postData,null).subscribe(
          (response) => {
            this.staffLocationForm.reset();
            //this.setDetails(response);
            this.loading = false;
            this.toastr.success('Staff Location Saved successfully');
            this.goBack();
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
