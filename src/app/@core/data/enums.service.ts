
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class EnumsService {
    [x: string]: any;
   // [x: string]: { org: any; modules: any; };
    //[x: number] : number;

    weekDays: any = [
                { id: 1, name: 'Monday'},
                { id: 2, name: 'Tuesday' },
                { id: 3, name: 'Wednesday'},
                { id: 4, name: 'Thursday'},
                { id: 5, name: 'Friday'},
                { id: 6, name: 'Saturday'},
                { id: 7, name: 'Sunday'},
              ];

    subscriptionDuration: any = [
      { id: 2, name: '30' },
      { id: 3, name: '60'},
      { id: 5, name: '90'},
      { id: 6, name: '180'},
      { id: 7, name: '360'},
    ];

    DurationFreeTrial: any = [
      { id: 1, name: '7'},
      { id: 1, name: '15'},
      { id: 2, name: '30' },
      // { id: 3, name: '60'},
      // { id: 5, name: '90'},
      // { id: 6, name: '180'},
      // { id: 7, name: '360'},
    ];
    
    orgTypes: any = [
        { id: 1, name: 'Owner'},
        { id: 2, name: 'Practice' },
        { id: 3, name: 'Allied'},
        { id: 4, name: 'Specialist'},
        //{ id: 5, name: 'Patients'},
    ];

    modules: any = [
      { id: 1, name: 'Roles', status: false},
      { id: 2, name: 'Users', status: false},
      { id: 3, name: 'Organisations', status: false},
      { id: 4, name: 'Referrals', status: false},
      { id: 5, name: 'Care Plan Questionnaire', status: false},
      { id: 5, name: 'Appointment Schedule', status: false},
      { id: 5, name: 'Appointment Types', status: false},
  ];

    modulesOld: any = [
        { id: 1, name: 'Roles', orgType: 1, perm: [1, 2, 3, 4 ] },
        { id: 2, name: 'Authorisation', orgType: 1, perm: [1, 2, 3, 4 ]},
        { id: 3, name: 'Organization', orgType: 1, perm: [1, 2, 3, 4 ] },
        { id: 4, name: 'Staff', orgType: 1, perm: [1, 2, 3, 4 ]},
        { id: 5, name: 'Subscriptions', orgType: 1, perm: [1, 2, 3, 4 ]},
        { id: 6, name: 'Email Templates', orgType: 1, perm: [1, 2, 3, 4 ]},
        { id: 7, name: 'Allied Health', orgType: 1, perm: [1, 2, 3, 4 ]},
        { id: 8, name: 'Questionnaire', orgType: 1, perm: [1, 2, 3, 4 ]},

        { id: 9, name: 'Authorisation', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 10, name: 'Staff', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 11, name: 'Email Templates', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 12, name: 'Referrals', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 13, name: 'Questionnaire', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 14, name: 'Appointments', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 15, name: 'Account Information', orgType: 2, perm: [1, 2, 3, 4 ]},
        { id: 16, name: 'Setting', orgType: 2, perm: [1, 2, 3, 4 ]},

        { id: 17, name: 'Authorisation', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 18, name: 'Staff', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 19, name: 'Referrals', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 20, name: 'Appointments', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 21, name: 'Email Templates', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 22, name: 'Setting', orgType: 3, perm: [1, 2, 3, 4 ]},
        { id: 23, name: 'Account Information', orgType: 3, perm: [1, 2, 3, 4 ]},

        { id: 24, name: 'Authorisation', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 25, name: 'Staff', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 26, name: 'Referrals', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 27, name: 'Appointments', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 28, name: 'Email Templates', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 29, name: 'Setting', orgType: 4, perm: [1, 2, 3, 4 ]},
        { id: 30, name: 'Account Information', orgType: 4, perm: [1, 2, 3, 4 ]},

        // Patients Modules
        { id: 31, name: 'Registration', orgType: 5, perm: [1, 2, 3, 4 ]},
        { id: 32, name: 'Profile', orgType: 5, perm: [1, 2, 3, 4 ]},
        { id: 33, name: 'Referrals', orgType: 5, perm: [1, 2, 3, 4 ]},
        { id: 34, name: 'Appointments', orgType: 5, perm: [1, 2, 3, 4 ]},
        { id: 35, name: 'Questionnaire', orgType: 5, perm: [1, 2, 3, 4 ]},
        { id: 36, name: 'Reminders', orgType: 5, perm: [1, 2, 3, 4 ]},

    ];

    permissions: any = [
        { id: 1, name: 'create'},
        { id: 2, name: 'view' },
        { id: 3, name: 'update'},
        { id: 4, name: 'delete'},
    ];

    timeZone: any = [
        { id: 1, offset: 'UTC +8', name: 'Western Standard Time', exampleCity: 'Perth' },
        { id: 2, offset: 'UTC +8:45', name: 'Central Western Standard', exampleCity: 'Eucla' },
        { id: 3, offset: 'UTC +9:30', name: 'Central Standard Time', exampleCity: 'Adelaide' },
        { id: 4, offset: 'UTC +10', name: 'Eastern Standard Time', exampleCity: 'Sydney' },
        { id: 5, offset: 'UTC +10:30', name: 'Lord Howe Standard Time', exampleCity: 'Lord Howe Island' },
    ];

    state:any =[
      { id:1, stateName:'New South Wales'},
      { id:2, stateName:'Queensland'},
      { id:3, stateName:'South Australia'},
      { id:4, stateName:'Tasmania'},
      { id:5, stateName:'Victoria'},
      { id:6, stateName:'Western Australia'},
      { id:7, stateName:'Australian Capital Territory'},
      { id:8, stateName:'Jervis Bay Territory	'},
      { id:9, stateName:'Northern Territory'},

    ]

    states: any = [
        { id: 1, name: 'Australian Capital Territory'},
        { id: 2, name: 'New South Wales' },
        { id: 3, name: 'Northern Territory'},
        { id: 4, name: 'South Australia'},
        { id: 5, name: 'Tasmania'},
        { id: 6, name: 'Victoria'},
        { id: 7, name: 'Western Australia'},
    ];

    organizations: any = [
        {
          id: 1,
          name: 'Allied Healthcare',
          tradingName: 'AHC',
          abn: 'ABNJTSOFT242',
          businessEmail: 'xyz@gmail.com',
          businessContact: 'Noor',
        },
        {
          id: 2,
          name: 'Test Org 1',
          tradingName: 'Test1',
          abn: 'Test1_242',
          businessEmail: 'xyz1@gmail.com',
          businessContact: 'cont1',
        },
        {
          id: 3,
          name: 'Test Org 2',
          tradingName: 'Test2',
          abn: 'Test2_242',
          businessEmail: 'xyz2@gmail.com',
          businessContact: 'cont2',
        },
        {
          id: 4,
          name: 'Test Org 3',
          tradingName: 'Test3',
          abn: 'Test3_242',
          businessEmail: 'xyz3@gmail.com',
          businessContact: 'cont3',
        },
        {
            id: 5,
          name: 'Test Org 4',
          tradingName: 'Test4',
          abn: 'Test4_242',
          businessEmail: 'xyz4@gmail.com',
          businessContact: 'cont4',
        },
        {
            id: 6,
          name: 'Test Org 5',
          tradingName: 'Test5',
          abn: 'Test5_242',
          businessEmail: 'xyz5@gmail.com',
          businessContact: 'cont5',
        },
        {
            id: 7,
          name: 'Test Org 6',
          tradingName: 'Test6',
          abn: 'Test6_242',
          businessEmail: 'xyz6@gmail.com',
          businessContact: 'cont6',
        },
    ];


    adminRoleData: any = {
      id: 1,
      name: 'Admin',
      modules: [
          {
            id: 1,
            name: 'Users',
            permissions: [
              {
                id: 1,
                name: 'Create user',
              },
              {
                id: 2,
                name: 'View user',
              },
            ],
          },
          {
            id: 2,
            name: 'Roles',
            permissions: [
              {
                id: 1,
                name: 'Create role',
              },
              {
                id: 2,
                name: 'View role',
              },
            ],
          },
          {
            id: 1,
            name: 'Organization',
            permissions: [
              {
                id: 1,
                name: 'Create Organization',
              },
              {
                id: 2,
                name: 'View Organization',
              },
            ],
          },
      ],
    };
  
    organizationDummy: any = {
      name: "Allied Healthcare",
      tradingName: "AHC",
      abn: "ABNJTSOFT242",
      businessEmail: "xyz@gmail.com",
      businessContact: "Noor",
      locname:"Branch1_1",
      locIdentifier: "b1_1",
      locPhone: "5654865",
      locEmail: "b1_1@gmail.com",
      locAddress: "plot no 7, south lane, Park avenue",
      locSuburb: "LS",
      locPostcode: "6667",
      locState: "CA",
      locTimezone: "Western Standard Time",
      ContactTitle:"Ms.",
      ContactName: "Noor",
      ContactPhone: "855698136",
      ContactEmail: "noor@gmail.com",
      ContactDesignationId: 7
    }

    staffs: any = [
      {
        name: "Allen",
        mobile: "524556",
        email: "allen@gmail.com",
        postcode: "5220",
        city: "LA"
      },
      {
        name: "Brad",
        mobile: "552556",
        email: "brad@gmail.com",
        postcode: "5205",
        city: "CA"
      },
      {
        name: "clan",
        mobile: "524956",
        email: "clan@gmail.com",
        postcode: "6584",
        city: "PK"
      },
      {
        name: "David",
        mobile: "654556",
        email: "david@gmail.com",
        postcode: "2584",
        city: "NS"
      },
      {
        name: "Ergh",
        mobile: "524556",
        email: "ergh@gmail.com",
        postcode: "5220",
        city: "LA"
      },
    ];

    staffDummy: any = {
      firstName: "Allen",
        surName: "Smith",
        title: "Mr.",
        mobile: "6586665",
        email: "allen@gmail.com",
        address:"jhlslkfas,kjhlsd,hjoids",
        postcode: "52220",
        state: "LA",
        city: "Park Avenue",
        password: "allen123",
        role: "Staff",
        preferences: "7",
        location: "branch1_2",
    }

    roles: any = [
      { id: 1 , name: "Admin"},
      { id: 2 , name: "User"},
      { id: 3 , name: "Practice"},
      { id: 4 , name: "Specialist"},
      { id: 5 , name: "Staff"},
    ];

    preferences:any = [
      { id: 0 , name: "0"},
      { id: 1 , name: "1"},
      { id: 2 , name: "2"},
      { id: 3 , name: "3"},
      { id: 4 , name: "4"},
      { id: 5 , name: "5"},
      { id: 6 , name: "6"},
      { id: 7 , name: "7"},
      { id: 8 , name: "8"},
      { id: 9 , name: "9"},
    ];

  //orgName: string;
  org_type_id: { org: any; modules: any; };
  subscriptionId: any;
  lstSubscriptionIds: any;
  locationId: any;
  locname: any;
  orgTypeId: any;
  staffId: any;
  roleId: any;
  orgModules: { org: any; modules: any; };
  contact: any;
  OrganizationId: any;

}
