import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-deleted-referrals',
  templateUrl: './deleted-referrals.component.html',
  styleUrls: ['./deleted-referrals.component.scss']
})
export class DeletedReferralsComponent implements OnInit {

  constructor() { }


  deletedReferralsArray = [
    {  patientName: 'Carolina SCHEIN', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology', 
       deletedOn: '05 Aug 2020 06:43'},
    { patientName: 'Ms Anna ANDREWS', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    deletedOn: '05 Aug 2020 06:43'},
    {  patientName: 'Mr Fred ANDREWS', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Mary Bloggs | General Medicine Speciality',
    deletedOn: '05 Aug 2020 06:43' },
    { patientName: 'Mrs Penny ANDERSON', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology' ,
    deletedOn: '05 Aug 2020 06:43'},
    { patientName: 'Henry WATLAND', deletedBy: 'Admin Hospital', alliedHealthName: 'Dr Susan Charlton | Dermatology',
    deletedOn: '05 Aug 2020 06:43' }
    
  ];

  ngOnInit(): void {
  }

}
