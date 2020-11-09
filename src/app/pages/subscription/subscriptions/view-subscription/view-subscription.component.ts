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
  selector: 'ngx-view-subscription',
  templateUrl: './view-subscription.component.html',
  styleUrls: ['./view-subscription.component.scss']
})
export class ViewSubscriptionComponent implements OnInit {
  subscription: any;
  subscriptionId: any;
  loading = false;
  subscriptionDetails: any;
  constructor(private router: Router, private route: ActivatedRoute, private service: HttpService, private dialogService: NbDialogService,
    private toastr: ToastrService, private enums: EnumsService,private location: Location) {
    
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.subscriptionId = params.id;
        this.enums.subscriptionId = this.subscriptionId;
        this.loadSubscriptionDetails(this.subscriptionId);
      }
    });
  }

  loadSubscriptionDetails(id: string) {
    this.service.get('Subscription/getsubscription?subscription_id=' + id, null).subscribe((response) => {
      this.loading = true;
      this.subscriptionDetails = response;
      //this.staffLocations = response.get;
      //this.dataGridSource.load(this.subscriptionDetails);
      // this.setDetails(response);
       this.loading = false;
    }, (error) => {
      this.loading = false;
      this.toastr.error(error.error);
    });
} 

goBack() {
  //this.router.navigate(['/pages/staff/all']);
  this.subscriptionDetails.back()
}
cancel() {
  this.router.navigate(['/pages/subscription/all']);
// this.location.back();
}

edit(): void {
  this.router.navigate(['/pages/subscription/add'], { queryParams: { id: this.subscriptionId } });
}
createsubscription(){
  this.router.navigate(['/pages/subscription/add'], { queryParams: { id: this.subscriptionId } });
}


}
