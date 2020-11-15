import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../../@core/services/http.service';
import { ToastrService } from '../../../../@theme/components/toaster/toastr.service';
import { EnumsService } from 'app/@core/data/enums.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDeleteComponent } from 'app/@theme/components/modal/confirm-delete/confirm-delete.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss'],
})
export class ViewStaffComponent implements OnInit {
  subscription: any;
  locationId: any;
  staffDetails: any;
  loading = false;
  staffDummy: any = {};
  staffLocations: any;

  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  organizations: any = [];
  selectedRows: any ;
  staffId: any;
  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService, private dialogService: NbDialogService,
    private toastr: ToastrService, private enums: EnumsService,private location: Location) {
     this.locationId = this.enums.locationId; 
     this.bindDataGrid();
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.staffId = params.id;
        this.enums.staffId = this.staffId;
        this.loadStaffDetails(this.staffId);
      }
    });
  }

  Pagesize: number = 20;
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
        editButtonContent: '<i class="nb-arrow-retweet" title="Deactivate"></a></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash" title="view"></i>',
        confirmDelete: true,
      },
      columns: {
        location_name: {
          title: 'Location Name',
          type: 'string',
        },
        role_name: {
          title: 'Role name',
          type: 'string',
        },
        location_status: {
          title: 'Status',
          type: 'string',
          valuePrepareFunction: (value: any) => {
            return value === "1" ? 'Active' : 'De-Active';
          },
        }
      },
    };
  }

  loadStaffDetails(id: string) {
    let staffId = {  id: id};
        this.service.post('Staff/getstaff', staffId, null).subscribe((response) => {
        this.loading = true;
        this.staffDetails = response;
        this.staffLocations = response.getlocs;
        this.dataGridSource.load(this.staffLocations);
         this.loading = false;
        }, (error) => {
          this.loading = false;
          this.toastr.error(error.error);
        });
  }

  goBack() {
    this.location.back()
  }

  cancel() {
    // this.router.navigate(['/pages/staff/all']);
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/all']);
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/all']);
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/all']);
  }
}

  edit(): void {
    // this.router.navigate(['/pages/staff/add'], { queryParams: { id: this.staffId } });
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/add'], { queryParams: { id: this.staffId } });
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/add'], { queryParams: { id: this.staffId } });
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/add'], { queryParams: { id: this.staffId } });
  }
  }

  createStaffLocation(){
    // this.router.navigate(['/pages/staff/location'], { queryParams: { id: this.locationId } });
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/staff/location'], { queryParams: { id: this.locationId } });
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/staff/location'], { queryParams: { id: this.locationId } });
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/staff/location'], { queryParams: { id: this.locationId } });
    }
  }

  deactivateStaffLocation(event: any){
      this.confirmDeactivate(event.data);
  }

  delete(event: any): void {
      this.confirmDelete(event.data);
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false,
    context:{ title:'Delete', data:'Are you sure, You want to delete this staff location?'} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        let body={ id:data.organisation_location_id,
           deleted_by:1}
        this.service.post('Staff/deletestafflocation', body,null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            const index = this.staffLocations.findIndex(obj => obj.staff_location_id = data.staff_location_id);
            this.staffLocations.splice(index, 1);
            this.toastr.success('Staff Location Deleted successfully');
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  confirmDeactivate(data: any) {
    if (data.status == "1") {
      this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: true,
        context:{ title:'Deactivate', data:'Are you sure, You want to deactivate this staff location?'} })
        .onClose.subscribe((res) => {
          if (res == 'delete') {
            let body={ id:data.organisation_location_id,
                 updated_by:1
            }
            this.service.post('Staff/deactivatestafflocation', body,null).subscribe(
              (response) => {
                const index = this.staffLocations.findIndex(obj => obj.staff_location_id = data.staff_location_id);
                this.staffLocations[index].status = "2";
                this.dataGridSource.load(this.staffLocations);
                this.toastr.success('Staff location Deactivated successfully');
              },
              (error) => {
                this.toastr.error(error.error);
              });
          }
        });
    } else {
      this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false,
        context:{ title:'Activate', data:'Are you sure, You want to activate this staff location?'} })
        .onClose.subscribe((res) => {
          if (res == 'delete') {
            let body={ id:data.organisation_location_id ,
              updated_by:1}
            this.service.post('Staff/activatestafflocation', body,null).subscribe(
              (response) => {
                const index = this.staffLocations.findIndex(obj => obj.staff_location_id = data.staff_location_id);
                this.staffLocations[index].status = "1";
                this.dataGridSource.load(this.staffLocations);
                this.toastr.success('Staff location Deactivated successfully');
              },
              (error) => {
                this.toastr.error(error.error);
              });
          }
        });
    }
  }
}
