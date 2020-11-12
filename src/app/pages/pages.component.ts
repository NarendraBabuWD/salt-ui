import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// import { MENU_ITEMS } from './pages-menu';

import { NbMenuService, NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})


export class PagesComponent {
  constructor(private router: Router, private titleService: Title) {}

  // setTimeout(()= menu = MENU_ITEMS, 1000);
 /*setTimeout(() => {
  menu = MENU_ITEMS
            }, 1000);*/
  // menu = MENU_ITEMS;
 menu: any[] = [];
 MENU_ITEMS: any[] = [];
 checkOrgTyeId = '';

  public ngOnInit() {
    // this.titleService.setTitle('My awesome app');

    this.menu = [];
    this.MENU_ITEMS = [];
    this.checkOrgTyeId = sessionStorage.getItem("organizationTypeId");
    // setTimeout(()=> {
      if(this.checkOrgTyeId === '1'){
      
      

        this.MENU_ITEMS = [
          {
            title: 'Dashboard',
            icon: 'home-outline',
            link: '/owner/ownerDashboard',
            
          },
        
          {
            title: 'Roles',
            icon: 'award-outline',
            link: '/owner/roles/all'
          },
          {
            title: 'Staff',
            icon: 'person-outline',
            link: '/owner/staff/all'
          },
          {
            title: 'Organisations',
            icon: 'edit-2-outline',
            link: '/owner/organization/all',
          },
          // {
          //       title: 'Locations',
          //     icon: 'edit-2-outline',
          //     link: '/owner/organization/locations',
          //  },
        
          {
            title: 'Subscription',
            icon: 'clipboard-outline',
            link: '/owner/subscription/all'
          },
        /*  {
            title: 'Business',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Appointments',
                link: '/owner/forms/inputs',
              },
              {
                title: 'Add ons',
                link: '/owner/forms/layouts',
              },
              {
                title: 'Pharmacy',
                link: '/owner/forms/buttons',
              },
              {
                title: 'Voice',
                link: '/owner/forms/datepicker',
              },
            ],
          },*/
          {
            title: 'Settings',
            icon: 'clipboard-outline',
            children: [
              {
                title: 'Referral Template',
                link: '/owner/settings/autoAccept',
              }
            ],
          },
        ];
      }
       if (this.checkOrgTyeId === '2'){
        // MENU_ITEMS = [];
            this.MENU_ITEMS = [
              {
                title: 'Practitioner ',
                icon: 'home-outline',
                link: '/practice/practitionerDashboard'
              },
              {
                title: 'Staff',
                icon: 'person-outline',
                link: '/practice/staff/all'
              },
              {
                title: 'Allied Health',
                icon: 'edit-2-outline',
                children: [
                  {
                    title: 'View Allied Health',
                    link:'/allied/alliedhealth/ViewAllied',
                  },
                  {
                    title: 'Add Allied Health',
                    link:'/allied/alliedhealth/AddAllied',
                  }
                ],
              },
              {
                title: 'Referral',
                icon: 'clipboard-outline',
                children:[
                  {
                    title:'Pending Referrals',
                    link:'/practice/referral/pendingHospitalReferral'
                  },
                  {
                    title:"Sent Referrals",
                    link:"/practice/referral/sentReferral"
                  },
                  {
                    title:'Accepted Referrals',
                    link:'/practice/referral/acceptedReferral'
                  },
                  {
                    title:"Rejected Referrals",
                    link:"/practice/referral/rejectedReferral"
                  },
                  {
                    title:"Deleted Referrals",
                    link:"/practice/referral/deletedReferral"
                  },
                
                ]
              },
              {
                title: 'Settings',
                icon: 'clipboard-outline',
                children: [
                  {
                    title: 'Add Settings',
                    link: "/practice/settings/autoAccept",
                  }
                ],
              },
            ]
      } 
       if (this.checkOrgTyeId === '3'){
        // MENU_ITEMS = [];
        this.MENU_ITEMS = [
          {
            title: 'Allied Health',
            icon: 'home-outline',
            // link: '/allied/alliedHealthDashboard'
            children:[
              {
                title:'ViewAllied',
                link:'/allied/alliedhealth/ViewAllied',
              },
              {
                title:'AddAllied',
                link:'/allied/alliedhealth/AddAllied',
              }
            ]
          },
          {
            title: 'Staff',
            icon: 'person-outline',
            link: '/allied/staff/all'
          },
          {
            title: 'Referral',
            icon: 'clipboard-outline',
            children:[
              {
                title:'Pending Referrals',
                link:'/allied/referral/pendingAllied'
              },
              {
                title:'Accepted Referrals',
                link:'/allied/referral/acceptedReferral'
              },
              {
                title:"Rejected Referrals",
                link:"/allied/referral/rejectedReferral"
              },
            ]
          },
          {
            title: 'Settings',
            icon: 'clipboard-outline',
            children: [
              {
                title: 'Referral Template',
                link: '/allied/settings/ReferralTemplate',
              },
              {
                title: 'Auto Accept',
                link: '/allied/settings/autoAccept',
              }
            ],
          },
        ]
      }
      // }, 1000);

    setTimeout(()=> 
    this.menu = this.MENU_ITEMS, 1000);
    // setInterval(()=>{ this.menu = MENU_ITEMS }, 250);
  }
}
