import { Component , Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent  {
  @Input() title: string;
  @Input() data:string;
  //data:any ;
  constructor(protected ref: NbDialogRef<ConfirmDeleteComponent>) {
   // this.data = this.ref.content;
   }
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close('delete');

  }

}
