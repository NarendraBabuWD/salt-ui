import { Component, Input ,OnInit} from '@angular/core';
import { EnumsService } from 'app/@core/data/enums.service';
import { NbDialogRef } from '@nebular/theme';
import { HttpService } from 'app/@core/services/http.service';
import { ToastrService } from '../../toaster/toastr.service';

@Component({
  selector: 'ngx-select-subscription',
  templateUrl: './select-subscription.component.html',
  styleUrls: ['./select-subscription.component.scss']
})
export class SelectSubscriptionComponent implements OnInit{
  editmode:any = false;
  subscriptionIds: any = [];
  @Input() title: string;
  @Input() message:string;
  @Input() data: Array<any>;
  @Input() subscriptionId: number;
  subscriptions: any;
  selectedId: any;
  responseMessage: any;

   constructor(protected ref: NbDialogRef<SelectSubscriptionComponent>, private enums: EnumsService,
    private service: HttpService, private toastr: ToastrService) {
    // this.data = this.ref.content;
    this.subscriptionIds = this.enums.lstSubscriptionIds;
    // if(this.data != null || this.data.length > 0){
    //   this.editmode = true;
    // }
  }
 
  ngOnInit(){
    this.service.post('Subscription/deactivatesubscription?subscription_id=' + this.subscriptionId, null,null)
    .subscribe(
      (response) => {
        this.responseMessage = response.message;
        if(response.s_id != null ){
          if( response.s_id.length >0){
            this.toastr.error(response.message);
            this.subscriptionIds = response.s_id;
            this.editmode = true;
          }
        }
        else{
          this.toastr.success(response.message)
        }
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  saveSubscription(event: any){
    this.selectedId = event;

  }

  cancel() {
    if(this.editmode == true){
      this.ref.close();
    }
    else{
      // subscription is already deactivated , if selected no , then activate it back
      this.service.post('Subscription/activatesubscription?subscription_id=' + this.subscriptionId, null,null)
      .subscribe(
        (response) => {
          const index = this.subscriptions.findIndex(obj => obj.id == this.subscriptionId);
          this.subscriptions[index].status = status;
        //  this.dataGridSource.load(this.subscriptions);
        //  this.toastr.success(response.message)
        },
        (error) => {
          this.toastr.error(error.error);
        });
        this.ref.close();
    }

  }

  submit() {
   
    if(this.editmode == true){
      let selectedId = this.selectedId;
      // deactivate api call with changed id
      this.service.post('Subscription/deactivatesubscription?subscription_id=' + this.subscriptionId + '&subscription_changeid=' + selectedId, null,null)
      .subscribe(
        (response) => {
            this.toastr.success(response.message)
          
        },
        (error) => {
          this.toastr.error(error.error);
        });

        this.ref.close('delete');
    }
    else{

      this.toastr.success(this.responseMessage);
     // this.ref.close()
      this.ref.close('delete');
    }
   // 

  }
}
