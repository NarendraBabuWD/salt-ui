import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-allied-health-dashboard',
  templateUrl: './allied-health-dashboard.component.html',
  styleUrls: ['./allied-health-dashboard.component.scss']
})
export class AlliedHealthDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  usersArray:any=[
    {
      firstname:'mkmk',
DOB:'14-11-1212',
Email:'mkmk@gmail.com',
City:'hyderabad',
// displayedColumns:''

    },
    {
      firstname:'madhukiran',
DOB:'04-01-1212',
Email:'madhu@gmail.com',
City:'chennai',
// displayedColumns:''

    },
    

  ]
}


