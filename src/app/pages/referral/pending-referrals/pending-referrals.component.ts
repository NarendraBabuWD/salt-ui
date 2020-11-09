import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pending-referrals',
  templateUrl: './pending-referrals.component.html',
  styleUrls: ['./pending-referrals.component.scss']
})
export class PendingReferralsComponent implements OnInit {

  constructor() { }

  pendingReferralsArray = [
    {  patientName: 'Carolina SCHEIN',  alliedHealthName: 'Dr Susan Charlton | Dermatology',
      lastModifiedOn: '05 Aug 2020 06:43'},
    { patientName: 'Ms Anna ANDREWS',  alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    lastModifiedOn: '05 Aug 2020 06:43'},
    {  patientName: 'Mr Fred ANDREWS', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    lastModifiedOn: '05 Aug 2020 06:43' },
    { patientName: 'Mrs Penny ANDERSON',  alliedHealthName: 'Dr Susan Charlton | Dermatology' , 
    lastModifiedOn: '05 Aug 2020 06:43'},
    { patientName: 'Henry WATLAND',  alliedHealthName: 'Dr Susan Charlton | Dermatology', 
    lastModifiedOn: '05 Aug 2020 06:43' }
    
  ];

  ngOnInit(): void {
  }

}
