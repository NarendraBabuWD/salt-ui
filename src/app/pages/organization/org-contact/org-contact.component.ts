import { EnumsService } from './../../../@core/data/enums.service';
import { HttpService } from './../../../@core/services/http.service';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-org-contact',
  templateUrl: './org-contact.component.html',
  styleUrls: ['./org-contact.component.scss'],
})
export class OrgContactComponent {
  selectedRow: any;
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizationId: any = '';
  organizations: any = [];
  //contacts: any = [];
  //locData: any;
  locations: any;
  contactsData:any;
  contacts: any;

  constructor( private router: Router, private toastr: ToastrService,
    private dialogService: NbDialogService, private service: HttpService,
    private enums: EnumsService) {
      this.organizations = this.enums.organizations;
      this.contacts = this.enums.contacts;
      this.bindDataGrid();
     // this.loadOrganizations();
  }

  Pagesize: number = 20;
  bindDataGrid() {
    this.dataGridSettings = {
      //selectMode: 'multi',
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
        deleteButtonContent: '<i class="nb-trash" title="delete"></i>',
        confirmDelete: true,
      },
      columns: {
        conname: {
          title: 'Contact Name',
          type: 'string',
        },
        conphone: {
          title: 'Phone',
          type: 'number',
        },
        conemail: {
          title: 'Email',
          type: 'string',
        },
      },
    };
  }

  loadOrganizations(){
    this.service.get('Organization/getOrganisations', null).subscribe(
      (response) => {
        this.organizations = response;
        // var org = {};
        // for(const item of this.orgResponse){
        //   org = {
        //     id: item.organisation_id,
        //     name: item.organisation_name,
        //   }
        //   this.organizations.push(org);
        // }
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadLocations(event) {
   //this.enums.orgName = event.organisation_name;
    this.service.get('Organization/getOrganisationlocations?organisation_id='+ event.organisation_id, null).subscribe(
      (response) => {
        this.locations = response.getlocs;
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadContacts(event:any){
    this.enums.locname = event.locname;
    this.service.get('Organization/getOrganisationlocation?organisation_location_id='+ event.organisation_location_id, null).subscribe(
      (response) => {
        //this.locData =response;
        this.enums.locationId = response.organisation_location_id;
        this.contactsData = response.get_con;
        this.dataGridSource.load(this.contactsData);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  edit(event: any): void {
   // this.enums.contact = event.data;

    this.router.navigate(['/pages/organization/contact'], { queryParams: { id: event.data.organisation_contact_id } });
  }

  create(): void {
    this.router.navigate(['/pages/organization/contact']);
  }

  delete(event: any): void {
    this.confirmDelete(event.data);
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false ,
    context:{ title:"Delete",data:"Are you sure , you want to delete this contact?"}})
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        this.service.post('Organization/deleteorganisationlocationcontact?organisation_location_contact_id=' + data.organisation_contact_id, null,null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            this.toastr.success();
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }
}
