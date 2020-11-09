import { EnumsService } from './../../../@core/data/enums.service';
import { HttpService } from './../../../@core/services/http.service';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
  selectedRow: any;
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizationId: any = '';
  organizations: any = [];
  locations: any =[]; 
  addbtn: Boolean = false;
  subscription: any;
  orgTypeId: any;
  orgTypes: any;
  loading = false;
  orgData: any;
  locData: any;
  locId:any;
  orgResponse: any;
  selectedRows: any;
  selectedOrg: any;

  constructor( private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService,
    private enums: EnumsService) {
      this.orgTypes = this.enums.orgTypes;
      this.bindDataGrid();
      this.loadOrganization();
  }

  loadOrganization() {
    this.locations = [];
    let empBody = {};
    this.service.post('Organisation/getOrganisations', empBody, null).subscribe(
      (response) => {
      //  this.orgResponse =response;
        this.orgResponse = response.filter( e => e.status == 1);
        var org = {};
        for(const item of this.orgResponse){
          org = {
            id: item.organisation_id,
            name: item.organisation_name,
          }
          this.organizations.push(org);
        }
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  Pagesize: number = 20;
  bindDataGrid() {
    this.dataGridSettings = {
      selectMode: 'multi',
      mode: 'external',
      actions: {
        add: false,
        position: 'right',
      }, 
      pager: {
        display: true,
        perPage: this.Pagesize,
      },
      edit: {
        editButtonContent: '<i class="nb-edit" title="edit"></a></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-compose" title="view"></i>',
        confirmDelete: true,
      },
      columns: {
        locname: {
          title: 'Location Name',
          type: 'string',
        },
        locemail: {
          title: 'Email',
          type: 'string',
        },
        locphone: {
          title: 'Phone',
          type: 'string',
        },
        locstatus: {
          title: 'Status',
          type: 'string',
          valuePrepareFunction: (value: any) => {
            return value === 1 ? 'Active' : 'De-Active';
          },
        }
      },
    };
  }

  loadLocations(event:any) {
    //this.enums.OrganizationId = event;
    console.log(event);
    this.selectedOrg = event;
    this.addbtn = true;
    let orgID = {   organisation_id: event };
    this.service.post('Organisation/getOrganisationlocations', orgID, null).subscribe(
      (response) => {
        console.log(response);
        this.locations = [];
        if(response.getlocs != null)
          this.locations = response.getlocs;
          //filter out only active locations
        this.dataGridSource.load(this.locations);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  cancel() {
    this.router.navigate(['/pages/organization/all']);
  }

  editLocation(data: any): void {
    this.router.navigate(['/pages/organization/location'], { queryParams: { id: data.organisation_location_id } });
  }

  view(data){
    this.router.navigate(['/pages/organization/location/view'], { queryParams: { id: data.organisation_location_id } });
  }

  edit(data: any): void {
    if(data.locstatus == 2 || data.locstatus == '2' || data.locstatus == 'De-Active'){
      this.toastr.error("Deactivated location cannot be edited");
    }
    else{
      this.router.navigate(['/pages/organization/location'], { queryParams: { id: data.id } });
    }
  }
  create(): void {
    this.router.navigate(['/pages/organization/location'], { queryParams: { orgId: this.selectedOrg } });
  }

  deactivate(): void{
    for(const row of this.selectedRows){
      this.confirmDeactivate(row);
    }
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
       // var active = +!!data.status;
       let delByLocId = { organisation_location_id: data.organisation_location_id, active: status};
        this.service.post('Organisation/deactivateorganisationlocation', delByLocId, null)
        .subscribe(
          (response) => {
            
           // this.dataGridSource.remove(data);
            const index = this.locations.findIndex(obj => obj.organisation_location_id == data.organisation_location_id);
            this.locations[index].locstatus = status;
            this.dataGridSource.load(this.locations);
            //this.toastr.success("Organization deactivated successfully");
            this.toastr.success(response.message)
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  delete(): void {
    for(const row of this.selectedRows){
      this.confirmDelete(row);
    }
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false ,
    context:{ title:"Delete",data:"Are you sure , you want to delete this location?"}})
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let delOrgLocById = { organisation_location_id: data.organisation_location_id };
        this.service.post('Organisation/deleteorganisationlocation', delOrgLocById,null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            this.toastr.success(response.message);
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  onUserRowSelect(event){
    this.selectedRows = event.selected;
  }
}
