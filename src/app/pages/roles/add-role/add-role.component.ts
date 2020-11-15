import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../@core/services/http.service';
import { ToastrService } from '../../../@theme/components/toaster/toastr.service';
import { EnumsService } from '../../../@core/data/enums.service';

@Component({
  selector: 'ngx-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  public roleForm: FormGroup;
  subscription: any;
  myFormValueChanges$: any;
  
  editMode = false;
  roleId: any;
  loading = false;
  notification = true;
  isAlreadyExistTitle:boolean = false;
  errorMsg:string = '';
  adminRoleData:any = {};
  roleModules: any = [];
  orgTypes: any;
  permIds: string = "";
  editedPermIds: string = "";
  permissions: FormArray;
  selectedItem: any = [];
  orgTypeId: any;
  roleName: string = "";
  arrPermIds: any = [];
  resultPermIds: any = [];
  finalPermIds: any;
  editPermIds: any;

  constructor(private router: Router,private enums: EnumsService,private route: ActivatedRoute, private service: HttpService,
    private toastr: ToastrService, private fb: FormBuilder) { 
    this.adminRoleData = this.enums.adminRoleData;
    
    this.orgTypes = this.enums.orgTypes;
  //  this.orgTypeId = this.enums.orgTypeId;
   // this.orgTypeId = this.enums.org_type_id;
    this.orgTypeId = localStorage.getItem('orgtypeid');
  }

  ngOnInit(): void {

    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      organisation_type_id: ['', [Validators.required]],
      permissions: this.fb.array([ this.createPermission() ]),
    });

    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.roleId = params.id;
       // this.orgTypeId = params.orgTypeId;
       
        this.editMode = true;
        this.loadGetData(this.orgTypeId);
        this.loadDetails(params.id);
        this.roleForm.controls['organisation_type_id'].disable();
      }

     

    });
  }

  createPermission(): FormGroup {
    return this.fb.group({
      id:'',
      name: '',
    });
  }

  addPermission(): void {
    this.permissions = this.roleForm.get('permission') as FormArray;
    this.permissions.push(this.createPermission());
  }

  loadDetails(id: string) {
    let roleByID = { RoleId: id };
    this.service.post('Roles/GetRole', roleByID, null).subscribe(
      response => {
        console.log(response);
        this.setDetails(response);
      },
      error => {
        this.toastr.error(error);
      },
    );
  }

  get f() { return this.roleForm.controls; }

  SavePermission(event) {
    console.log(event);
    
    try{
      var permId = event.currentTarget.getAttribute("id");
      console.log(permId);
      
      if(event.target.checked){
        this.arrPermIds.push(permId);
        this.resultPermIds.push(permId);
        
        
       if(this.editMode){
         console.log("EDIT");
         console.log(this.arrPermIds);
        console.log(this.resultPermIds);
        this.finalPermIds.push(permId);
        console.log(this.finalPermIds);
        
        this.editedPermIds = this.arrPermIds.toString();
        console.log(this.editedPermIds);
        
       }
        
      }
      else if(this.editMode == false){
         //remove from the array 
          var index = this.resultPermIds.findIndex((i: any) => i == permId);
          this.resultPermIds.splice(index,1);
        }
        else{
          var index = this.editPermIds.findIndex((i: any) => i == permId);
          this.arrPermIds.splice(index,1);
          if(index >= 0){
            this.resultPermIds.push(permId);
          }
        }
       
      // }

      this.finalPermIds = this.resultPermIds.slice();

      // if(this.editMode == true){
      //   this.arrPermIds = this.resultPermIds.slice();
      // }
      // if(this.permIds == "") {
      //     this.permIds = event.currentTarget.getAttribute("id");
      // } else {
      //   this.permIds += "," + (event.currentTarget.getAttribute("id"))
      // }
     // this.finalPermIds = this.
    }
    catch(err){
      console.log(err);
    }
  }
  
  loadGetData(id) {
    let orgTypeId = { organisation_type_id: id}
    this.service.post('Roles/GetModules', orgTypeId, null).subscribe(
      (response) => {
       // this.enums.orgModules = {org:id,modules:response};
         this.roleModules = response;
           for(let i =0; i < this.roleModules.length; i++){
                for(let j =0; j < this.roleModules[i].permissions.length; j++){
                        this.roleModules[i].permissions[j].status = 0;
                }
           }
           console.log(this.roleModules);
           
      },
      (error) => {
        this.toastr.error(error.error);
      });
  }

  loadPermissions(event) {   
    this.notification=false;
    if(event == 0){
      this.roleModules = [];
    }
    else{
      // check role exist
      this.orgTypeId = event.id;
      if(this.roleName != "" && !this.editMode){
        this.checkRole(this.roleName)
      }
      this.loadGetData(parseInt(event.id));
    }
  }

  checkRole(event: any){
    const name : any = event.target.value;
    this.roleName = name;
    this.isAlreadyExistTitle = false;
    this.errorMsg = '';
    if(this.roleName != '' && this.orgTypeId){
      let checkRole = {
        Name: name,
        organisation_type_id: this.orgTypeId
    }
      this.service.post('Roles/CheckRole', checkRole, null).subscribe(
        (response) => {
           //this.roleModules = response;
           console.log(response);
           
           if(response.length > 0){
            this.isAlreadyExistTitle = true;
            this.errorMsg = 'Already Exist';
            // this.toastr.error("Role Exist, Please enter different combination of organisation type and role name")
           }else{
            this.isAlreadyExistTitle = false;
            this.errorMsg = '';
           }
           
        },
        (error) => {
          this.toastr.error(error.error);
        });
    }
   
  }

  onSubmit() {
    const formData = this.roleForm.value;
    let postData:any = {};
    // this.loading = true;
    //this.permIds = this.arrPermIds.toString();
    this.permIds = this.resultPermIds.toString();

    if (this.roleForm.valid == true) {
      if (this.editMode == false) {
        postData = JSON.stringify({...formData,permission_id: this.permIds,createdBy:1});

        console.log(postData);
       this.service.postJson('Roles/CreateRole', postData).subscribe(
          (response) => {
           // this.roleForm.reset();
            this.editMode = true;
           // this.setDetails(response);
            this.loading = false;
            this.toastr.success('Role Save');
            //Redirect to view all page
            this.cancel();
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.modelState);
          });
      } else {

        // const name : any = event.target.value;
                formData.id = this.roleId;
                // this.checkRole(this.orgTypeId,formData.name,);
        
                // if(formData.permissions.length>0){
                  console.log(this.editedPermIds);
                postData = {Id: this.roleId,
                               name: formData.name,
                              organisation_type_id: this.orgTypeId,
                              permission_id: this.editedPermIds,
                              updated_by:1
                            };
                // var event=(postData.roleName,this.orgTypeId)
                console.log(postData);
                
                // this.checkRole(event);
                this.service.postJson('Roles/updaterole' , postData).subscribe(
                  (response) => {
                   // this.roleForm.reset();
                    this.editMode = true;
                   // this.setDetails(response);
                    this.loading = false;
                    this.toastr.success('Role Edited');
        
                    //Redirect to view all page
                    this.cancel();
                  },
                  (error) => {
                    this.loading = false;
                    this.toastr.error(error.error);
                  });
              // }
              
              // else{
              //   alert("Role cannot exists without permissions");
              //   this.loading = false;
              // }

               }

      
    }
    // }
  }


  setDetails(data: any) {
    if (data) {
      console.log(data);
      this.f.name.setValue(data.name);
      this.f.organisation_type_id.setValue(data.orgType);
      // this.roleForm.get('OrgTypeId').disable();
      var modIndex = 0; var permIndex = 0;
     console.log(this.roleModules);
     
      for(const m of  data.modules){
        var selectedmod = this.roleModules.find((i: any) => i.name == m.name);
        console.log(selectedmod);
        
        if(selectedmod){
        modIndex = this.roleModules.indexOf(selectedmod);

        for(const p of m.permissions){
          console.log(p);
          
          var perm = this.roleModules[modIndex].permissions.find((i:any) => i.id == p.id) ;
          if(perm){
            console.log(perm);
            
            permIndex =this.roleModules[modIndex].permissions.indexOf(perm);
            this.roleModules[modIndex].permissions[permIndex].status = true;
            perm.status = true;

            this.arrPermIds.push(perm.id.toString());
          } else {
            permIndex =this.roleModules[modIndex].permissions.indexOf(perm);
            this.roleModules[modIndex].permissions[permIndex].status = false;
            perm.status = false;
            this.arrPermIds.push(perm.id.toString());
          }
        }
        this.finalPermIds = this.arrPermIds.slice();
        this.editPermIds = this.arrPermIds.slice();

        console.log(this.finalPermIds);
        console.log(this.editPermIds);
        this.permIds = this.arrPermIds.toString();
        console.log(this.permIds);
        
      }

     }
      this.loading = false;
    }
  }

  cancel() {
    // this.router.navigate(['/pages/roles/all']);
    if(sessionStorage.getItem("organizationTypeId") === '1'){
      this.router.navigate(['/owner/roles/all']);
      } else if(sessionStorage.getItem("organizationTypeId") === '2'){
        this.router.navigate(['/practice/roles/all']);
      }else if(sessionStorage.getItem("organizationTypeId") === '3'){
        this.router.navigate(['/allied/roles/all']);
      }
  }

}
