import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-rejected-referral',
  templateUrl: './rejected-referral.component.html',
  styleUrls: ['./rejected-referral.component.scss']
})
export class RejectedReferralComponent implements OnInit {

  constructor() { }


  rejectedReferralsArray = [
    {  patientName: 'Carolina SCHEIN', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology', 
      comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
    { patientName: 'Ms Anna ANDREWS', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
    {  patientName: 'Mr Fred ANDREWS', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43' },
    { patientName: 'Mrs Penny ANDERSON', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology' ,
    comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43'},
    { patientName: 'Henry WATLAND', refferalSent: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology',
    comments: 'Dear APractitioner, \n\n\n\n I am unable to accept Carolina SCHEIN at this point of time. \n\n\n\n Thanks \n\n Susan Charlton Dermatology\n Melbourne\n 07 4234 5785', referralRejectedOn: '05 Aug 2020 06:43' }
    
  ];

  ngOnInit(): void {
  }


  

}
