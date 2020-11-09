import { EnumsService } from './../../../@core/data/enums.service';
import { HttpService } from './../../../@core/services/http.service';
import { HttpParams } from '@angular/common/http';

import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent  {
  selectedRows: any;
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizationId: any = '';
  organizations: any = [];
  locations: any;
  staffs: any = [];
  locationId: any;
  
  constructor( private router: Router, private toastr: ToastrService,private dialogService: NbDialogService,
     private service: HttpService,private enums: EnumsService) {
    this.staffs = this.enums.staffs;
    this.bindDataGrid();
    
    this.organizationId = localStorage.getItem("organisationId");
    this.loadLocations(this.organizationId);
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
    //   rowClassFunction: (row) => {
    //    // var curUserId = localStorage.getItem('user_id');
    //    debugger
    //     if(row.data.status == 'Active'){
    //         return '';
    //     } else {
    //         return 'hide-action';
    //     }
    // },
      edit: {
        editButtonContent: '<i class="nb-edit" title="edit"></a></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-compose" title="view"></i>',
        confirmDelete: true,
      },
      status:{
        editButtonContent: '<i class="nb-edit" title="edit"></a></i>',


      },
      columns: {
        firstname: {
          title: 'Name',
          type: 'string',
        },
        mobile: {
          title: 'Mobile',
          type: 'string',
        },
        email: {
          title: 'Email',
          type: 'string',
        },
        postcode: {
          title: 'Postcode',
          type: 'string',
        },
        city: {
          title: 'City',
          type: 'string',
        },
        status: {
          title: 'Status',
          type: 'string',
        },
      },
    };
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

  loadLocations(id: any) {
    this.staffs = [];
   // this.enums.orgName = event.organisation_name;
   let orgId = { organisation_id: 4};
    this.service.post('Organisation/getOrganisationlocations', orgId, null).subscribe(
      (response) => {
        console.log(response);
        
        this.locations = response.getlocs;
        this.locations = response.getlocs.filter(i => i.locstatus == 1);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadStaffs(event){
   // this.enums.locationId = event.organisation_location_id;
    //this.enums.locname = event.locname;
    localStorage.setItem('locationid',event.organisation_location_id);
    localStorage.setItem('locationname',event.locname);
    // let orgLocId = { organisation_location_id: event.organisation_location_id};
    let orgLocId = { organisation_location_id: 5};
    this.service.post('Staff/getstaffs', orgLocId, null).subscribe(
      (response) => {
        this.staffs = response;
        this.dataGridSource.load(this.staffs);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  edit(data: any): void {
    if(data.status == 2 || data.status == '2' || data.status == 'De-Active'){
      this.toastr.error("Deactivated staff cannot be edited");
    }
    else{
      this.router.navigate(['/pages/staff/add'], { queryParams: { id: data.id } });
    }
  }

  create(): void {
    // this.router.navigate(['/pages/staff/add']);
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/add']);
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/add']);
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/add']);
      }
  }

  view(data: any): void {
    // this.router.navigate(['/pages/staff/view'], { queryParams: { id: data.id } });
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/view'], { queryParams: { id: data.id } });
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/view'], { queryParams: { id: data.id } });
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/view'], { queryParams: { id: data.id } });
      }
  }


  Deactivate(){
    for(const row of this.selectedRows){
      this.confirmDeactivate(row);
    }
  }

  delete(): void {
    for(const row of this.selectedRows){
      this.confirmDelete(row);
    }
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false,
    context:{ title:'Delete', data:'Are you sure, You want to delete this staff?'} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let deleteById = { id: data.id, deleted_by:1 };
        this.service.post('Staff/deletestaff', deleteById, null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            const index = this.staffs.findIndex(obj => obj.id = data.id);
            this.staffs.splice(index, 1);
            this.toastr.success('Staff Deleted successfully');
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  changeStatus(data, e) {
    console.log(data);
    console.log(e.target.checked);
    this.confirmDeactivate(data);
    }
    
  confirmDeactivate(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false,
    context:{ title:'Deactivate', data:'Are you sure, You want to deactivate this staff?'} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let actById = { id: data.id, updated_by:1 };
        this.service.post('Staff/deactivatestaff', actById,null).subscribe(
          (response) => {
            const index = this.staffs.findIndex(obj => obj.id = data.id);
            this.staffs[index].status = "Deactive";
            this.dataGridSource.load(this.staffs);
            this.toastr.success('Staff Deactivated successfully');
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  onUserRowSelect(event) {
    this.selectedRows = event.selected;
}
}
