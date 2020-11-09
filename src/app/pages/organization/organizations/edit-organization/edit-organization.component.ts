import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../../@core/data/enums.service';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {
  public editOrganizationForm: FormGroup;
  subscription: any;

  organizationId: any;
  locationId: any;
  loading = false;
  orgtypeId: any;
  orgTypes: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService,private location:Location) {
      this.orgTypes = this.enums.orgTypes;
      this.orgtypeId = localStorage.getItem('orgtypeid');
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.organizationId = params.id;
        // this.orgtypeId = params.orgTypeId
        this.loadDetails(this.organizationId);
      }
      
      this.editOrganizationForm = this.fb.group({
       // organisation_type_id: ['', [Validators.required]],
        organisation_name: ['', [Validators.required]],
        trading_name: [''],
        abn: ['', [Validators.required]],
        email: [''],
        phone: ['',[Validators.minLength,Validators.maxLength]],
      });
    });

  }

  get f() {
     return this.editOrganizationForm.controls;
  }

  loadDetails(id: string) {
    let orgId = {  organisation_id: id };
    this.service.post('Organisation/getOrganisation', orgId, null).subscribe(
      response => {
        
        this.setDetails(response[0]);
      },
      error => {
        this.toastr.error(error);
      },
    );
  }

  onSubmit() {
    const formData = this.editOrganizationForm.value;
    let postData:any = {};
    this.loading = true;
    if (this.editOrganizationForm.valid == true) {
        // formData.id = this.organizationId;
        postData = JSON.stringify(
                          {status:1,
                           ...formData,
                           organisation_id:this.organizationId
                           
                          });
        this.service.postJson('Organisation/updateorganisation' , postData).subscribe(
          (response) => {
            this.editOrganizationForm.reset();
            this.loading = false;
            this.toastr.success('Organization Updated Successfully');
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error);
          });
    }
  }

  setDetails(data: any) {
    if (data) {
      this.organizationId = data.organisation_id;
     // this.f.organisation_type_id.setValue(data.organisation_type_id);
      this.f.organisation_name.setValue(data.organisation_name);
      this.f.trading_name.setValue(data.trading_name);
      this.f.abn.setValue(data.abn);
      this.f.email.setValue(data.email);
      this.f.phone.setValue(data.phone);
    }
    this.loading = false;
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  addNew(){
    this.router.navigate(['/pages/organization/add']);
  }

  goBack() {
    this.location.back();
    //this.router.navigate(['/pages/organization/all']);
  }

  cancel() {
    this.location.back();
   // this.router.navigate(['/pages/organization/all']);
  }
}
