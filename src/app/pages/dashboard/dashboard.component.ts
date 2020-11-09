import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {


  

  ngOnInit(): void {
    console.log(sessionStorage.getItem("userRole") === "role2");
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
      firstname:'mkmsk',
DOB:'04-01-1212',
Email:'madhu@gmail.com',
City:'chennai',
// displayedColumns:''

    },
    



  ]
}
