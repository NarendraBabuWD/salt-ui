import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../@core/services/http.service';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { EnumsService } from 'app/@core/data/enums.service';

@Component({
  selector: 'ngx-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
  subscription: any;
  myFormValueChanges$: any;
  
  roleId: any;
  loading = false;
 
  roleName: any;
  orgType: any;

  adminRoleData:any = {};
  roleModules: any = [];
  orgTypes: any;
  permIds: string = "";
  //orgTypeId: any;
  orgTypeId: string;

  constructor(private router: Router,private enums: EnumsService,private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService) { 
    this.orgTypes = this.enums.orgTypes;
   // this.orgTypeId = this.enums.orgTypeId;
      this.orgTypeId = localStorage.getItem('orgtypeid');
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.roleId = params.id;
        //this.enums.roleId = this.roleId;
       // localStorage.setItem('roleid',this.roleId);
       this.loadDetails(this.roleId);
      }
    });
  }

  loadDetails(id: string) {
    let sendRoleId = {  RoleId: id  };
    this.service.post('Roles/GetRole', sendRoleId, null).subscribe(
      response => {
        this.roleName = response.name;
        this.roleModules= response.modules;
       // this.orgType = response.orgType;
        var index = this.orgTypes.find((i:any) => i.id == response.orgType);
        if(index){
          this.orgType = index.name;
        }
      },
      error => {
        this.toastr.error(error);
      },
    );
  }

  loadGetData(id) {
    let orgTypeId = { organisation_type_id: id}
    this.service.post('Roles/GetModules', orgTypeId, null).subscribe(
      (response) => {
       // this.enums.orgModules = {org:id,modules:response};
         this.roleModules = response;
         this.loadDetails(this.orgTypeId);
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  setDetails(data: any) {
    if (data) {
      const orgType = this.orgTypes.find((i: any) => i.name == data.orgType);
      this.roleName = data.name;
      this.orgType = orgType.name;
      this.roleModules = data.modules;
      this.loading = false;
    }
  }

  edit(){
    // debugger
    //var index = this.orgTypes.find((i: any) => i.name == event.data.orgTypeId);
    //this.enums.orgTypeId = index.id;
   // this.router.navigate(['/pages/roles/add'], { queryParams: { id: event.data.roleId, orgTypeId:index.id } });
   this.router.navigate(['/pages/roles/add'], { queryParams: { id: this.roleId} });

  }

  cancel() {
    this.router.navigate(['/pages/roles/all']);
  }

}
