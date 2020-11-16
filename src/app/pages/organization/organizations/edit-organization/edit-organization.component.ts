import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../../@core/data/enums.service';
import {Location} from '@angular/common';
import { ConfirmDeleteComponent } from 'app/@theme/components/modal/confirm-delete/confirm-delete.component';
import { NbDialogService } from '@nebular/theme';


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
  locations: any;

  constructor(private router: Router, private route: ActivatedRoute, 
    private service: HttpService, private dialogService: NbDialogService,
    private toastr: ToastrService, private fb: FormBuilder,
    private enums: EnumsService,private location:Location) {
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
      this.loadLocDetails();
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
            // this.editOrganizationForm.reset();
            this.loading = false;
            this.toastr.success('Organization Updated Successfully');
            this.location.back();
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

  createLocation(){
      this.router.navigate(['/pages/organization/location'], { queryParams: { orgId: this.organizationId } });
    }

    editLocation(data: any): void {
      if(data.locstatus == 2 || data.locstatus == '2' || data.locstatus == 'De-Active'){
        this.toastr.error("Deactivated location cannot be edited");
      }
      else{
       this.router.navigate(['/pages/organization/location'], { queryParams: { id: data.organisation_location_id } });
      }
    }
  
    view(data){
      this.router.navigate(['/pages/organization/location/view'], { queryParams: { id: data.organisation_location_id } });
    }

    loadLocDetails(){
      let getLocByOrgId = {  organisation_id: this.organizationId };
      this.service.post('Organisation/getOrganisationlocations', getLocByOrgId, null).subscribe(
        (response) => {
          this.locations =response.getlocs;
          // this.dataGridSource.load(this.locations);
        },
        (error) => {
          this.toastr.error(error.error);
        });
    }

    
  changeStatus(data, e) {
    console.log(data);
    console.log(e.target.checked);
    this.confirmDeactivate(data);
    }

  confirmDeactivate(data: any) {
    let dialogTitle: any = '';
    let dialogMessage: any = '';
    let status: any = 1;
    if(data.locstatus == 1){ // it is active , make deactive
      dialogTitle = 'Deactivate Organisation location';
      dialogMessage = 'Are you sure , you want to deactivate this organization location?'
      status = 2;
    }
    else{ // it is deactive, make active
      dialogTitle = 'Activate Organisation location';
      dialogMessage = 'Are you sure , you want to activate this organization location?'
      status = 1;
    }
    
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false , 
      context: {title: dialogTitle, data: dialogMessage,} })
      .onClose.subscribe((res) => {
      if (res == 'delete') {
        let delByLocId = { organisation_location_id: data.organisation_location_id, active: status};
        this.service.post('Organisation/deactivateorganisationlocation', delByLocId, null)
        .subscribe(
          (response) => {
            const index = this.locations.findIndex(obj => obj.organisation_location_id == data.organisation_location_id);
            this.locations[index].locstatus = status;
            // this.dataGridSource.load(this.locations);
            this.toastr.success(response.message)
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false ,
    context:{ title:"Delete",data:"Are you sure , you want to delete this location?"}})
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let delOrgLocById = { organisation_location_id: data.organisation_location_id };
        this.service.post('Organisation/deleteorganisationlocation', delOrgLocById,null).subscribe(
          (response) => {
            // this.dataGridSource.remove(data);
            this.toastr.success();
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }
}
