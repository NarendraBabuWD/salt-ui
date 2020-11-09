import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { HttpService } from './../../../@core/services/http.service';
import { EnumsService } from 'app/@core/data/enums.service';

@Component({
  selector: 'ngx-view-all-roles',
  templateUrl: './view-all-roles.component.html',
  styleUrls: ['./view-all-roles.component.scss'],
})
export class ViewAllRolesComponent {
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  rolesData: any = [];
  rolesCount: any = [];
  organizations: any = [];
  organizationId: any = '';
  orgTypes: any = [];
  constructor(private service: HttpService, private router: Router,private toastr: ToastrService,
     private enums: EnumsService) {
    this.bindDataGrid();
   // this.rolesCount = this.enums.rolesCount;
    this.organizations = this.enums.organizations;
    this.orgTypes = this.enums.orgTypes;
     this.loadGetData();
  
    //this.dataGridSource.load(this.rolesCount);
  }

  Pagesize: number = 30;
  bindDataGrid() {
    this.dataGridSettings = {
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
        editButtonContent: '<i class="nb-edit"><a href="www.google.com"></a></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-compose"></i>',
        confirmDelete: true,
      },
      columns: {
        roleName: {
          title: 'Name',
          type: 'string',
        },
        orgTypeId: {
          title: 'Organization Type',
          type: 'string',
        },
        modulesCount: {
          title: 'Module Count',
          type: 'string',
        },
        permissionCount: {
          title: 'Permission Count',
          type: 'string',
        },
      },
      };
  }

  loadGetData() {
    let empBody = { };
    this.service.post('Roles/GetRoles', empBody, null).subscribe(
      (response) => {
        this.rolesCount =response;
        console.log(this.rolesCount);
        
        this.dataGridSource.load(this.rolesCount);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  create(): void {
    this.router.navigate(['/pages/roles/add']);
  }

  edit(data: any): void {
   
    var index = this.orgTypes.find((i: any) => i.name == data.orgTypeId);
   // this.enums.orgTypeId = index.id;
   // this.enums.org_type_id = index.id;
    localStorage.setItem('orgtypeid',index.id);
    
    this.router.navigate(['/pages/roles/add'], { queryParams: { id: data.roleId} });
  }

  view(data: any): void {
    var index = this.orgTypes.find((i: any) => i.name == data.orgTypeId);
   // this.enums.orgTypeId = index.id;
   localStorage.setItem('orgtypeid',index.id);
    this.router.navigate(['/pages/roles/view'], { queryParams: { id: data.roleId } });
  }
  
}
