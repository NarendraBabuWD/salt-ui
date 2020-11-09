import { NbMenuItem } from '@nebular/theme';
const orgTyeIds = ['1', '2', '3', '4'];
const checkOrgTyeId = sessionStorage.getItem("organizationTypeId");



export const MENU_ITEMS: NbMenuItem[] = [

  // START OWNER PROVISIONS
  {
    title: 'Owner Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3'
  },

  {
    title: 'Roles',
    icon: 'award-outline',
    link: '/pages/roles/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Staff',
    icon: 'person-outline',
    link: '/pages/staff/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Organization',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Organizations',
        link: '/pages/organization/all',
      },
      {
        title: 'Locations',
        link: '/pages/organization/locations',
      },
    ],
  },

  {
    title: 'Subscription',
    icon: 'clipboard-outline',
    link: '/pages/subscription/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Business',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Appointments',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Add ons',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Pharmacy',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Voice',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'clipboard-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '2' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Auto Accept',
        link: '/pages/settings/autoAccept',
      }
    ],
  },

  

  // END OWNER PROVISIONS

  // START Medical Practice/HOSIPITAL PROVISIONS
  {
    title: 'Practionar ',
    icon: 'home-outline',
    link: '/pages/hospitalDashboard',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Staff',
    icon: 'person-outline',
    link: '/pages/staff/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Allied Health',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'View Allied Health',
        link: '',
      },
      {
        title: 'Add Allied Health',
        link: '',
      }
    ],
  },
  {
    title: 'Referral',
    icon: 'clipboard-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children:[
      {
        title:'Pending Referrals',
        link:'/pages/referral/pendingHospitalReferral'
      },
      {
        title:"Sent Referrals",
        link:"/pages/referral/sentReferral"
      },
      {
        title:'Accepted Referrals',
        link:'/pages/referral/acceptedReferral'
      },
      {
        title:"Rejected Referrals",
        link:"/pages/referral/rejectedReferral"
      },
      {
        title:"Deleted Referrals",
        link:"/pages/referral/deletedReferral"
      },
    
    ]
  },
  {
    title: 'Settings',
    icon: 'clipboard-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Add Settings',
        link: '/pages/settings/autoAcc',
      }
    ],
  },


  // END Medical Practice/HOSIPITAL PROVISIONS

  // START Allied Health PROVISIONS
  {
    title: 'Allied Health',
    icon: 'home-outline',
    link: '/pages/alliedHealthDashboard',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '2'
  },
  {
    title: 'Staff',
    icon: 'person-outline',
    link: '/pages/staff/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '2'
  },
  {
    title: 'Referral',
    icon: 'clipboard-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '2',
    children:[
      {
        title:'Pending Referrals',
        link:'/pages/referral/pendingHospitalReferral'
      },
      {
        title:'Accepted Referrals',
        link:'/pages/referral/acceptedReferral'
      },
      {
        title:"Rejected Referrals",
        link:"/pages/referral/rejectedReferral"
      },
    ]
  },
  {
    title: 'Settings',
    icon: 'clipboard-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '2',
    children: [
      {
        title: 'Referral Template',
        link: '/pages/settings/ReferralTemplate',
      },
      {
        title: 'Auto Accept',
        link: '/pages/settings/autoAccept',
      }
    ],
  },


  // END Allied Health PROVISIONS
  /*{
    title: 'Users',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'View Users',
        link: '',
      },
      {
        title: 'Add Users',
        link: '',
      }
    ],
  },

  {
    title: 'Roles',
    icon: 'award-outline',
    link: '/pages/roles/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
  },
  {
    title: 'Staff',
    icon: 'person-outline',
    link: '/pages/staff/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'

    // children: [
    //   {
    //     title: 'Staffs',
    //     link: '/pages/staff/all',
    //   },
    //   {
    //     title: 'Staff Locations',
    //     link: '/pages/staff/locations',
    //   },
    // ],
  },
  {
    title: 'Organization',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Organizations',
        link: '/pages/organization/all',
      },
      {
        title: 'Locations',
        link: '/pages/organization/locations',
      },
      // {
      //   title: 'Contacts',
      //   link: '/pages/organization/contacts',
      // },
    ],
  },

  {
    title: 'Referral',
    icon: 'clipboard-outline',
    // link: '/pages/referral/view-referral',
    children:[
      // {
      //   title:'View',
      //   link:'/pages/referral/all'
      // },
      {
        title:'Pending Referrals',
        link:'/pages/referral/pendingHospitalReferral'
      },
      {
        title:'Accepted Referrals',
        link:'/pages/referral/acceptedReferral'
      },
      {
        title:"Rejected Referrals",
        link:"/pages/referral/rejectedReferral"
      },
      {
        title:"Deleted Referrals",
        link:"/pages/referral/deletedReferral",
        hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
      },
      {
        title:"Sent Referrals",
        link:"/pages/referral/sentReferral",
        hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
      },
      
    ]
  },

  {
    title: 'Subscription',
    icon: 'clipboard-outline',
    link: '/pages/subscription/all',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3'
  },

  {
    title: 'Settings',
    icon: 'clipboard-outline',
    children: [
      {
        title: 'Rfe',
        link: '/pages/settings/autoAcc',
      }
    ],
  },

  {
    title: 'Business',
    icon: 'edit-2-outline',
    hidden: sessionStorage.getItem("organizationTypeId") == '1' || sessionStorage.getItem("organizationTypeId") == '3',
    children: [
      {
        title: 'Appointments',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Add ons',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Pharmacy',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Voice',
        link: '/pages/forms/datepicker',
      },
    ],
  },*/
];


/*function findRole(orgTyeIds, checkOrgTyeId) {
  
  if(orgTyeIds.find(checkOrgTyeId)){
     return 
  }
} */