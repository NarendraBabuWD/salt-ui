import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.scss']
})
export class HospitalDashboardComponent implements OnInit {

  constructor() { }


  
  userData = [
    {  name: 'Carolina SCHEIN', businessId: 'ABNJTSOFT242', email: 'bharath.bv@hotmail.com', 
        address: '123 main street'},
    { name: 'Ms Anna ANDREWS', businessId: 'ABNJTSOFT242', email: 'udaykirang27@gmail.com', 
    address: '123 main street'},
    {  name: 'Mr Fred ANDREWS',  businessId: 'ABNJTSOFT242', email: 'udaykirang27@gmail.com', 
    address: '123 main street' },
    { name: 'Mrs Penny ANDERSON', businessId: 'ABNJTSOFT242', email: 'udaykirang27@gmail.com', 
    address: '123 main street'},
    { name: 'Henry WATLAND', businessId: 'ABNJTSOFT242', email: 'bharath.bv@hotmail.com', 
    address: '123 main street' }
    
  ];

  ngOnInit(): void {
    // console.log(sessionStorage.getItem("organizationTypeId") != '2' && sessionStorage.getItem("organizationTypeId") != '3');
    
    console.log(sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3');
  }

}
