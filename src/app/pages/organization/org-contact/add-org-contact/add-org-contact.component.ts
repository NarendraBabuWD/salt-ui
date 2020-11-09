import { EnumsService } from './../../../../@core/data/enums.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-org-contact',
  templateUrl: './add-org-contact.component.html',
  styleUrls: ['./add-org-contact.component.scss'],
})
export class AddOrgContactComponent implements OnInit, OnDestroy {
  public orgContactForm: FormGroup;
  subscription: any;

  editMode = false;
  organizationId: any;
  loading = false;
  states: any;
  timeZones: any;
  organizations: any;
  locations: any;
  contactId: any;
  orgTypes: any;
  orgName: any;
  locName: any;
  contact: { org: any; modules: any; };
  locationId: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder, private enums: EnumsService, private location: Location) {
      this.states = this.enums.states;
      this.timeZones = this.enums.timeZone;
      this.orgTypes = this.enums.orgTypes;
      
     // this.orgName = this.enums.orgName;
     // this.locName = this.enums.locname;
     this.orgName = localStorage.getItem('organisationName');
     this.locName = localStorage.getItem('locationname');
     this.locationId = localStorage.getItem('locationid');

  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.contactId = params.id;
        this.editMode = true;       

      }

      this.orgContactForm = this.fb.group({
        organisation_location_id: [''],
        // title:['',Validators.pattern("Validators.pattern('^[a-zA-Z \-\']+')")],
        contitle: [''],
        conname: [''],
        conphone: ['',[Validators.required,Validators.maxLength,Validators.minLength]],
        conemail: [''],
        conDesignationId: [''],
      });
    });

    // if(this.editMode){
    //  // this.contact = this.enums.contact;
    //   this.setDetails(this.contact)
    // }
    // else{
    //   this.loadOrganizations();
    // }

    this.contact = this.enums.contact;
       this.setDetails(this.contact)
  }

  get f() { return this.orgContactForm.controls; }

  // loadOrganizations() {
  //   this.service.get('Organization/getOrganisations', null).subscribe(
  //     (response) => {
  //       this.organizations = response;
  //     },
  //     (error) => {
  //       this.toastr.error(error.error);
  //     });
  // }

  // loadLocations(event) {
  //   this.organizationId = event.organisation_id;
  //   this.orgName = event.organisation_name;
  //   this.service.get('Organization/getOrganisationlocations?organisation_id='+ event.organisation_id, null).subscribe(
  //     (response) => {
  //       debugger
  //       this.locations = response.getlocs;
  //     },
  //     (error) => {
  //       this.toastr.error(error.error);
  //     });
  // }
  
  setDetails(data: any) {
    
    if (data) {
      //this.organizationId = data.id;
      this.f.organisation_location_id.setValue(this.locationId);
      this.f.contitle.setValue(data.contitle);
      this.f.conname.setValue(data.conname);
      this.f.conphone.setValue(data.conphone);
      this.f.conemail.setValue(data.conemail);
      this.f.conDesignationId.setValue(data.condesignationid);
    }
    this.loading = false;
  }

  onSubmit() {
    const formData = this.orgContactForm.value;
    this.loading = true;
    
    console.log(formData);
    if(formData.organisation_location_id == ""){
      formData.organisation_location_id = this.locationId;
    }
    if (this.orgContactForm.valid == true) {
      if (this.editMode == false) {
        const postData ={...formData,created_by: 1, trial: 1, status: 1};
        this.service.postJson('Organisation/Createorganisationcontact', postData).subscribe(
          (response) => {
            this.orgContactForm.reset();
            this.loading = false;
            this.toastr.success('Contact Saved successfully');

            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {
        const postData = {
          organisation_contact_id: this.contactId,
          contitle: formData.contitle,
          conname: formData.conname,
          conphone: formData.conphone,
          conemail: formData.conemail,
          conDesignationId: formData.conDesignationId,
          conupdated_by: 1
        }
        this.service.postJson('Organisation/updateorganisationcontact' , postData).subscribe(
          (response) => {
            
            this.orgContactForm.reset();
            this.editMode = true;
            //this.setDetails(response);
            this.loading = false;
            this.toastr.success('Contact Updated successfully');
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error);
          });
      }
    }
}

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
    //this.router.navigate(['/pages/organization/contacts']);
  }

  cancel() {
    this.location.back();
    //this.router.navigate(['/pages/organization/contacts']);
  }

  
}
