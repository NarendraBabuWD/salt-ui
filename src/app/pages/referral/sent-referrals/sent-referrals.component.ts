import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sent-referrals',
  templateUrl: './sent-referrals.component.html',
  styleUrls: ['./sent-referrals.component.scss']
})
export class SentReferralsComponent implements OnInit {

  constructor() { }

  sentReferralsArray = [
    {  patientName: 'Carolina SCHEIN',  alliedHealthName: 'Dr Susan Charlton | Dermatology', status: 'ACCEPTED',
      sentReferralOn: '05 Aug 2020 06:43'},
    { patientName: 'Ms Anna ANDREWS',  alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality', status: 'ACCEPTED',
    sentReferralOn: '05 Aug 2020 06:43'},
    {  patientName: 'Mr Fred ANDREWS', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality', status: 'ACCEPTED',
    sentReferralOn: '05 Aug 2020 06:43' },
    { patientName: 'Mrs Penny ANDERSON',  alliedHealthName: 'Dr Susan Charlton | Dermatology' , status: 'ACCEPTED',
    sentReferralOn: '05 Aug 2020 06:43'},
    { patientName: 'Henry WATLAND',  alliedHealthName: 'Dr Susan Charlton | Dermatology', status: 'ACCEPTED',
    sentReferralOn: '05 Aug 2020 06:43' }
    
  ];

  ngOnInit(): void {
  }

}
