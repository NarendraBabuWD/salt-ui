import { EnumsService } from './../../../@core/data/enums.service';
import { HttpService } from './../../../@core/services/http.service';
import { ConfirmDeleteComponent } from './../../../@theme/components/modal/confirm-delete/confirm-delete.component';
import { ToastrService } from './../../../@theme/components/toaster/toastr.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { SelectSubscriptionComponent } from 'app/@theme/components/modal/select-subscription/select-subscription.component';


@Component({
  selector: 'ngx-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {
  dataGridSettings: any;
  dataGridSource: LocalDataSource = new LocalDataSource();
  subscriptions: any = [];
  selectedRows: any ;
  orgTypes: any;
  constructor( private router: Router, private toastr: ToastrService,private dialogService: NbDialogService, 
    private service: HttpService, private enums: EnumsService) {
      this.orgTypes = this.enums.orgTypes.slice(0);
      this.orgTypes.splice(0,1);//remove owner type
      this.bindDataGrid();
     // this.loadGetData();
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
        name: {
          title: 'Subscription Name',
          type: 'string',
        },
        organisation_type_id: {
          title: 'Organization Type',
          type: 'string',
        },
        description: {
          title: 'Description',
          type: 'string',
        },
        trail: {
          title: 'trail',
          type: 'string',
        },
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

  loadSubscriptions(event: any) {
    let body={organisation_type_id:event.id}
    this.service.post('Subscription/getsubscriptions',body, null).subscribe(
      (response) => {
        this.subscriptions = response;
        console.log(this.subscriptions);
        
        this.dataGridSource.load(this.subscriptions);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  edit(data: any): void {
    this.enums.org_type_id = data.organisation_type_id;
    if(data.status == 2 || data.status == '2' || data.status == 'De-Active'){
      this.toastr.error("Deactivated subscription cannot be edited");
    }
    else{
    this.router.navigate(['/pages/subscription/add'], { queryParams: { id: data.id  }});
    }
  }

  create(): void {
    this.router.navigate(['/pages/subscription/add']);
  }

  view(event: any): void {
    this.router.navigate(['/pages/subscription/view'], { queryParams: { id: event.data.id } });
  }

  Deactivate(){
    for(const row of this.selectedRows){
      if(row.status == 1){
        this.confirmDeactivate(row);
      }
      else{
        this.confirmActivate(row);
      }
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
    dialogTitle = 'Deactivate subscription';
    dialogMessage = 'Are you sure , you want to deactivate this subscription?'
    
    this.dialogService.open(SelectSubscriptionComponent, { hasBackdrop: false , 
      context: {title: dialogTitle, message: dialogMessage,subscriptionId: data.id} })
      .onClose.subscribe((res) => {
      if (res == 'delete') {
        const index = this.subscriptions.findIndex(obj => obj.id == data.id);
              this.subscriptions[index].status = 2;
              this.dataGridSource.load(this.subscriptions);
      
      }
    });
  }

  confirmActivate(data: any) {
    let dialogTitle: any = '';
    let dialogMessage: any = '';
  
    dialogTitle = 'Activate subscription';
    dialogMessage = 'Are you sure , you want to activate this subscription?'
     
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false , 
      context: {title: dialogTitle, data: dialogMessage,} })
      .onClose.subscribe((res) => {
      if (res == 'delete') {
        this.service.post('Subscription/activatesubscription?subscription_id=' + data.id, null,null)
          .subscribe(
            (response) => {
              const index = this.subscriptions.findIndex(obj => obj.id == data.id);
              this.subscriptions[index].status = 1;
              this.dataGridSource.load(this.subscriptions);
              this.toastr.success(response.message)
            },
            (error) => {
              this.toastr.error(error.error);
            });
        }
       
     
    });
  }

  confirmDeactivateOld2(data: any) {
    let dialogTitle: any = '';
    let dialogMessage: any = '';
   // let status: any = 1;
    if(data.status == 1){ // it is active , make deactive
      dialogTitle = 'Deactivate Organisation';
      dialogMessage = 'Are you sure , you want to deactivate this organization?'
      //status = 2;
    }
    else{ // it is deactive, make active
      dialogTitle = 'Activate Organisation';
      dialogMessage = 'Are you sure , you want to activate this organization?'
      //status = 1;
    }
    //return;
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false , 
      context: {title: dialogTitle, data: dialogMessage,} })
      .onClose.subscribe((res) => {
      if (res == 'delete') {
        if(data.status == 1){ //make deactive
          this.service.post('Subscription/deactivatesubscription?subscription_id=' + data.id, null,null)
          .subscribe(
            (response) => {
             // this.dataGridSource.remove(data);
              const index = this.subscriptions.findIndex(obj => obj.id == data.id);
              this.subscriptions[index].status = status;
              this.dataGridSource.load(this.subscriptions);
              if(response.s_id != null){
                this.toastr.error(response.message)
                this.enums.lstSubscriptionIds = response.s_id;

                  //if deactivated subs is link to org
                this.dialogService.open(SelectSubscriptionComponent, { hasBackdrop: false  })
                .onClose.subscribe((res) => {
                  if (res == 'delete') {

                    //var selected id = 
                       // const index = this.subscriptions.find(obj => obj.id = data.id);
                       // index.status = 2;
                       // this.dataGridSource.load(this.subscriptions);
                       //  this.toastr.success(response.message);
                      
                  }
                });

              }
              //this.toastr.success("Organization deactivated successfully");
              this.toastr.success(response.message)
            },
            (error) => {
              this.toastr.error(error.error);
            });
        }
        else{ // make active
          this.service.post('Subscription/activatesubscription?subscription_id=' + data.id, null,null)
          .subscribe(
            (response) => {
             // this.dataGridSource.remove(data);
              const index = this.subscriptions.findIndex(obj => obj.id == data.id);
              this.subscriptions[index].status = status;
              this.dataGridSource.load(this.subscriptions);
              //this.toastr.success("Organization deactivated successfully");
              this.toastr.success(response.message)
            },
            (error) => {
              this.toastr.error(error.error);
            });
        }
       
      }
    });
  }

  confirmDeactivateOld(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false , 
      context: {title:'Deactivate',data:'Are you sure , you want to deacivate the subscription?',} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        var active = +!!data.status;
        this.service.post('Subscription/deactivatesubscription?subscription_id=' + data.id , null,null)
        .subscribe(
          (response) => {
            const index = this.subscriptions.find(obj => obj.id = data.id);
            index.status = 2;
            this.dataGridSource.load(this.subscriptions);
            //this.subscriptions.splice(index, 1);
           // this.toastr.success("Organization deactivated successfully");
           this.toastr.success(response.message);
          },
          (error) => {
            this.toastr.error(error.error);
          });
      }
    });
  }

  confirmDelete(data: any) {
    this.dialogService.open(ConfirmDeleteComponent, { hasBackdrop: false, 
      context: {title:'Delete',data:'Are you sure , you want to delete the subscription?',} })
    .onClose.subscribe((res) => {
      if (res == 'delete') {
        this.service.post('Subscription/deletesubscription?subscription_id=1' + data.id, null,null).subscribe(
          (response) => {
            this.dataGridSource.remove(data);
            const index = this.subscriptions.findIndex(obj => obj.id = data.id);
            this.subscriptions.splice(index, 1);
            
            // this.toastr.success("Subscription Deleted Successfully");
            this.toastr.success(response.message);
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
