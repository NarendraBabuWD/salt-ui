import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from './../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../../@core/data/enums.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  public subscriptionForm: FormGroup;
  subscription: any;
  editMode = false;
  subscriptionId: any;
  loading = false;
  roles: any;
  preferences: any = [];
  locations: any;
  organizations: any;
  orgTypes: any;
  modules: any;
  subscriptionDurations: any;
  arrModuleIds: any = [];
  isFreeTrial: any = false;
  orgTypeId: { org: any; modules: any; };
  costFree:any=false;
  moduleMandatory:any=false;
  


  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder,private enums: EnumsService,private location: Location) {
      this.preferences = this.enums.preferences;
      this.subscriptionDurations = this.enums.subscriptionDuration;
      this.orgTypes = this.enums.orgTypes.slice(0);
      if(this.orgTypes.length > 3)
        this.orgTypes.splice(0,1); // removing owner type
      //this.modules = this.enums.modules;
     // this.loadOrganizations();
      this.loadRoles();
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.subscriptionId = params.id;
        this.editMode = true;
        this.orgTypeId =  this.enums.org_type_id;
        this.loadModules(this.orgTypeId);
         this.loadSubscriptionDetails(this.subscriptionId);
      }
      this.subscriptionForm = this.fb.group({
        name: ['', [Validators.required]],
        organisation_type_id: ['',[Validators.required]],
        preference: [''],
        description: ['',[Validators.required]],
        trial: [''],
        recommended: [''],
        status: [''],
        // duration: this.fb.array([this.getDuration()]),
        // role: this.fb.array([this.getRole()]),
        duration: this.fb.array([],[Validators.required]),
        role: this.fb.array([],[Validators.required]),
        mdl: this.fb.array([]),
      });
    });

    if(this.editMode == false){
     // this.getDuration()
     // this.getRole()
     this.addDuration();
     this.addRole();
    }
  }

  get f() { return this.subscriptionForm.controls; }
  get duration() { return <FormArray>this.subscriptionForm.get('duration'); }
  get role() { 
    return <FormArray>this.subscriptionForm.get('role'); 

}
  get mdl() { return <FormArray>this.subscriptionForm.get('mdl'); }

  getModule(data: any) {
    return this.fb.group({
      moduleid: [''],
    });
  }

  getDuration() : FormGroup {
    return this.fb.group({
      duration: [''],
      cost: [''],
    });
  }

  getRole() {
    return this.fb.group({
      roleid: [''],
      limits: [''],
    });
  }

  addDuration(): void{
    console.log(this.loading)
    this.loading= false;
    const control = <FormArray>this.subscriptionForm.controls['duration'];
    control.push(this.getDuration());
  }

  addRole() {
    const control = <FormArray>this.subscriptionForm.controls['role'];
    control.push(this.getRole());
  }

  addModule(event: any){
    this.moduleMandatory =false;
    var modId = event.currentTarget.getAttribute("id");
    if(event.target.checked){
      this.arrModuleIds.push({moduleid: modId});
    // this.moduleMandatory =true;

      
    }
    else{
      var index = this.arrModuleIds.findIndex((i: any) => i.moduleid == modId);
      if(index != null){
        this.arrModuleIds.splice(index,1);
      }
    }
  }

  removeDuration(unit: any, i: number) {
    const control = <FormArray>this.subscriptionForm.controls['duration'];
    const deleteControl = <FormArray>this.subscriptionForm.controls['deleteduration'];
    if (unit.action == 'update') {
      deleteControl.push(this.fb.group({ id: unit.id }));
      control.removeAt(i);
    } else {
      control.removeAt(i);
    }
  }

  removeRole(unit: any, i: number) {
    const control = <FormArray>this.subscriptionForm.controls['role'];
    const deleteControl = <FormArray>this.subscriptionForm.controls['deleterole'];
    if (unit.action == 'update') {
      deleteControl.push(this.fb.group({ id: unit.id }));
      control.removeAt(i);
    } else {
      control.removeAt(i);
    }
  }

  changeDuration(event: any){
    
    // var durationControls = this.duration.controls[0]['controls']
    // this.duration.controls[0].get('cost').setValue('');   
    // this.duration.controls[0].get('duration').setValue('');   
      
    if(event.target.checked){
      this.costFree=true;

      this.subscriptionDurations = this.enums.DurationFreeTrial;
      var durationControls = this.duration.controls[0]['controls']
      this.duration.controls[0].get('cost').setValue("0");
      this.duration.controls[0].get('cost').disable();     
      // this.duration.controls[0].get('cost').setValue('0');    

    }
    else{
      this.subscriptionDurations = this.enums.subscriptionDuration;
      this.duration.controls[0].get('cost').enable();     

      this.costFree=false;

    }
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
  
  loadModules(id: any) {
    let body={organisation_type_id:id};
    this.service.post('Subscription/viewmodules',body, null).subscribe((response) => {
       this.modules = response.ml;
    }, (error) => {
      this.toastr.error(error.error);
    });
  }

  loadSubscriptionDetails(id: string) {
    let body={Id:id};
    this.service.post('Subscription/getsubscription',body, null).subscribe((response) => {
     // this.loadModules(response.organisation_type_id);
    //   setTimeout(function() {
    //     this.loadModules(response.organisation_type_id);
    //     this.setDetails(response);
    // }.bind(this), 1000);
      this.setDetails(response);
    }, (error) => {
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  setDetails(data: any) {
    if (data) {
      
      this.f.name.setValue(data.name);
      this.f.organisation_type_id.setValue(data.organisation_type_id)
      this.f.preference.setValue(data.preference);
      this.f.description.setValue(data.description);
      this.f.trial.setValue(data.trail);
      data.trail == 0 ? this.isFreeTrial = false: this.isFreeTrial = true;
      this.f.recommended.setValue(data.recommended);
      this.f.status.setValue(data.status);

     // this.removeDuration(0);
     
      for (const unit of data.cst) {
        const control = <FormArray>this.subscriptionForm.controls['duration'];
       // control.removeAt(0);
        control.push(this.fb.group({
          duration: unit.duration,
          cost: unit.subscriptioncost,
        }),
        );
      }
     // this.subscriptionForm.controls['duration'].removeAt(0);

      for (const unit of data.rle) {
        const control = <FormArray>this.subscriptionForm.controls['role'];
       // control.removeAt(0);
        control.push(this.fb.group({
          roleid: unit.roleid,
          limits: unit.limit,
        }),
        );
      }
 
      var modIndex = 0; var permIndex = 0;
      if(this.modules && this.modules.length > 0){
        for(const m of  data.mdl){
          var selectedmod = this.modules.find((i: any) => i.moduleid == m.moduleid);
          selectedmod.status = true;
        
         }
      }
    }
    this.loading = false;
  }

  onSubmit() {
    const formData = this.subscriptionForm.value;
    formData.mdl = this.arrModuleIds;
    formData.status = 1;
    if(formData.trial==0){
      formData.duration[0].cost="0";
    }
    formData.trial = (formData.trial)?1:0; 
    formData.created_by = 1;
    console.log(formData);
    this.loading = true;
    if (this.subscriptionForm.valid == true) {
      if (this.editMode == false) {
        this.service.postJson('Subscription/createsubscription', formData).subscribe(
          (response) => {
            this.subscriptionForm.reset();
            this.loading = false;
            this.toastr.success('Subscription Saved successfully');
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {
        formData.id = this.subscriptionId;
        formData.updated_by = 1;
        if(formData.recommended == null){
          formData.recommended = "true";
        }

        this.service.postJson('Subscription/updatesubscription' , formData).subscribe(
          (response) => {
            this.toastr.success('Staff Updated successfully');
this.router.navigate(['/pages/subscription/all']);
            this.subscriptionForm.reset();
            this.editMode = true;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error);
          });
      }
    }
  }

  // addNew(){
  // this.editMode = false;
  // this.router.navigate(['/pages/subscription/add']);
  // }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  goBack() {
    //this.router.navigate(['/pages/staff/all']);
    this.location.back();
  }

  cancel() {
    //this.router.navigate(['/pages/staff/all']);
    this.location.back();
  }
}
