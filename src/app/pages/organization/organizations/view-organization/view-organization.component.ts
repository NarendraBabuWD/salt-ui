import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from 'app/@core/data/enums.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDeleteComponent } from 'app/@theme/components/modal/confirm-delete/confirm-delete.component';

@Component({
  selector: 'ngx-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent implements OnInit {
  subscription: any;
  orgId: any;
  orgTypeId: any;
  orgTypes: any;
  loading = false;
  orgData: any;
  locations: any;

  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizations: any = [];
  selectedRows: any ;
  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService,
    private dialogService: NbDialogService,private toastr: ToastrService, private enums: EnumsService) {
      this.orgTypes = this.enums.orgTypes;
      this.orgTypeId = localStorage.getItem('orgtypeid');
      this.bindDataGrid();    
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.orgId = params.id;
        //this.orgTypeId = params.orgTypeId;
        this.loadOrgDetails(this.orgId);
        this.loadLocDetails(this.orgId);
      }
    });
  }

  goToEdtOrg(){
    this.router.navigate(['/pages/organization/edit'], { queryParams: { id: this.orgId } });
  }



  loadOrgDetails(id:any) {
    let orgById = {  organisation_id: id };
    this.service.post('Organisation/getOrganisation', orgById, null).subscribe(
      (response) => {
        this.orgData = response[0];
        console.log(this.orgData);
        
        var index = this.orgTypes.find((i:any) => i.id == this.orgData.organisation_type_id);
        if(index){
          this.orgData.organisation_type_id = index.name;
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
          type: 'number',
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

  locId:any;
  loadLocDetails(id:any){
    let getLocByOrgId = {  organisation_id: id };
    this.service.post('Organisation/getOrganisationlocations', getLocByOrgId, null).subscribe(
      (response) => {
        this.locations =response.getlocs;
        this.dataGridSource.load(this.locations);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  // edit(event){
  //   this.router.navigate(['/pages/organization/edit'], { queryParams: { id: this.orgData.organisation_id , orgTypeId:this.orgData.organisation_type_id} });
  // }

  cancel() {
    this.router.navigate(['/pages/organization/all']);
  }

  createLocation(){
  console.log(this.orgId);
  
    // this.router.navigate(['/pages/organization/location'] );
    this.router.navigate(['/pages/organization/location'], { queryParams: { orgId: this.orgId } });

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

  onUserRowSelect(event){
    this.selectedRows = event.selected;
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
            this.toastr.success();
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  deactivate(){
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
        let delByLocId = { organisation_location_id: data.organisation_location_id, active: status};
        this.service.post('Organisation/deactivateorganisationlocation', delByLocId, null)
        .subscribe(
          (response) => {
            const index = this.locations.findIndex(obj => obj.organisation_location_id == data.organisation_location_id);
            this.locations[index].locstatus = status;
            this.dataGridSource.load(this.locations);
            this.toastr.success(response.message)
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }
           
}
