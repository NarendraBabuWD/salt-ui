import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-appointment-type',
  templateUrl: './appointment-type.component.html',
})
export class AppointmentTypeComponent { 

  constructor( private router: Router){ }


   appTypeListArray = [
    {  code: 'S001', name: 'Initial Consultation', category: 'General',
        color: 'red', duration: '30 mins', price: '100.00', location: 'All Locations' },
        {  code: 'S002', name: 'Subsequent Consultation', category: 'General',
        color: 'red', duration: '30 mins', price: '100.00', location: 'All Locations' }
  ];

  create(){
    this.router.navigate(['/pages/appointments/add']);
  }
}
