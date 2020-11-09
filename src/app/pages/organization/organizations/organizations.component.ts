import { EnumsService } from './../../../@core/data/enums.service';
import { HttpService } from './../../../@core/services/http.service';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent  {
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizations: any = [];
  selectedRows: any ;

  constructor( private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) {
      this.bindDataGrid();
      this.loadOrganisations();
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
        organisation_name: {
          title: 'Organization Name',
          type: 'string',
        },
        name: {
          title: 'Organization Type',
          type: 'string',
        },
        trading_name: {
          title: 'Trading Name',
          type: 'string',
        },
        abn: {
          title: 'ABN',
          type: 'string',
        },
        // email: {
        //   title: 'Email',
        //   type: 'string',
        // },
        status: {
          title: 'status',
          type: 'string',
          valuePrepareFunction: (value: any) => {
            return value === 1 ? 'Active' : 'De-Active';
          },
        },
      },
    };
  }

  loadOrganisations() {
    let empBody = {};
    this.service.post('Organisation/getOrganisations', empBody, null).subscribe(
      (response) => {
        this.organizations = response;
        this.dataGridSource.load(this.organizations);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  edit(data: any): void {
    localStorage.setItem('orgtypeid',data.organisation_type_id);
    if(data.status == 2 || data.status == '2' || data.status == 'De-Active'){
      this.toastr.error("Deactivated organisation cannot be edited");
    }
    else{
    this.router.navigate(['/pages/organization/edit'], { queryParams: { id: data.organisation_id } });
    }
  }

  create(): void {
    this.router.navigate(['/pages/organization/add']);
  }

  view(data: any): void {
    this.router.navigate(['/pages/organization/view'], { queryParams: { id: data.organisation_id , orgTypeId: data.organisation_type_id} });
  }

  changeStatus(data, e) {
    console.log(data);
    console.log(e.target.checked);
    this.confirmDeactivate(data);
    }

  Deactivate(){
    // debugger
    for(const row of this.selectedRows){
      this.confirmDeactivate(row);
    }
  }

  delete(): void {
    for(const row of this.selectedRows){
      this.confirmDelete(row);
    }
  }

  confirmDeactivate(data: any) {
    let dialogTitle: any = '';
    let dialogMessage: any = '';
    let status: any = 1;
    if(data.status == 1){ // it is active , make deactive
      dialogTitle = 'Deactivate Organisation';
      dialogMessage = 'Are you sure , you want to deactivate this organization?'
      status = 2;
    }
    else{ // it is deactive, make active
      dialogTitle = 'Activate Organisation';
      dialogMessage = 'Are you sure , you want to activate this organization?'
      status = 1;
    }
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true , 
      context: {title: dialogTitle, data: dialogMessage,} })
      .onClose.subscribe((res) => {
      if (res == 'delete') {
       // var active = +!!data.status;
       let deAcOrgId = {  organisation_id: data.organisation_id, active: status };
        this.service.post('Organisation/deactivateorganisation', deAcOrgId, null)
        .subscribe(
          (response) => {
            const index = this.organizations.findIndex(obj => obj.organisation_id == data.organisation_id);
            this.organizations[index].status = status;
            this.dataGridSource.load(this.organizations);
            this.toastr.success(response.message);
            this.loadOrganisations();
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true, 
      context: {title:'Delete',data:'Are you sure , you want to delete the organization?',} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let delByOrgId = {  organisation_id: data.organisation_id};
        this.service.post('Organisation/deleteorganisation', delByOrgId, null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            const index = this.organizations.findIndex(obj => obj.organisation_id = data.organisation_id);
            this.organizations.splice(index, 1);
            this.toastr.success("Organisation Deleted Successfully");
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
