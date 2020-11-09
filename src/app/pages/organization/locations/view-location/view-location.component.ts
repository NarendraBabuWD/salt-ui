import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from 'app/@core/data/enums.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Location} from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDeleteComponent } from 'app/@theme/components/modal/confirm-delete/confirm-delete.component';

@Component({
  selector: 'ngx-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit {
  subscription: any;
  orgTypeId: any;
  orgTypes: any;
  loading = false;
  orgData: any;
  locData: any;
  locId:any;
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizations: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,private dialogService:NbDialogService,
    private toastr: ToastrService, private enums: EnumsService,private location:Location) {
      this.orgTypes = this.enums.orgTypes;
      this.bindDataGrid();    
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.locId = params.id;
        this.orgTypeId = params.orgTypeId;
        this.loadLocDetails(this.locId);
      }
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
  
  contactsData:any;
  loadLocDetails(id:any){
    let orgLocID = { organisation_location_id: id };
    this.service.post('Organisation/getOrganisationlocation', orgLocID, null).subscribe(
      (response) => {
        this.locData =response;
        this.contactsData = response.get_con;
        this.dataGridSource.load(this.contactsData);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }
 
  // loadContactDetails(id: any){
  //   this.service.get('Organization/getOrganisationlocation?organisation_location_id='+id, null).subscribe(
  //     (response) => {
  //       this.contactsData =response;
  //     },
  //     (error) => {
  //       this.toastr.error(error.error);
  //     });
  // }

  goBack() {
    this.location.back();
    //this.router.navigate(['/pages/organization/all']);
  }

  edit(event){
    this.router.navigate(['/pages/organization/location'], { queryParams: { id: this.locId } });
  }

  cancel() {
    this.location.back();
    //this.router.navigate(['/pages/organization/all']);
  }

  createContact(){
    localStorage.removeItem("locationid");
    localStorage.setItem('locationid',this.locId);
    this.router.navigate(['/pages/organization/contact']);
  }

  editContact(data: any): void {
    // this.enums.contact = event.data;
    console.log(data);
    
    this.router.navigate(['/pages/organization/contact'], { queryParams: { id: data.organisation_contact_id } });
  }

  delete(event: any): void {
    // this.confirmDelete(event.data);
  }

  deleteContact(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false ,
    context:{ title:"Delete",data:"Are you sure , you want to delete this contact?"}})
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let delOrgLocConID = { "organisation_contact_id": data.organisation_contact_id };
        this.service.post('Organisation/deleteorganisationlocationcontact', delOrgLocConID, null).subscribe(
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
}
