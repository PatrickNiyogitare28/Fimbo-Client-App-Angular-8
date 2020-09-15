import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service'
import { UsersService } from '../../../shared/users.service'
import { NotificationService } from '../../../shared/notification.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = []
  updatableUserId="";
  updatableFirstname="";
  updatableLastname="";
  updatablePhone="";
  updatableLevel=0;
  updatableEmail="";
  errorMessage="";
  currentFieldWithError=""
  isSeller = false;

  constructor(public displayService: DisplayService,public usersService: UsersService,private notificationService:
    NotificationService) { }

  triggerUpdateUserForm(userId){
    if(this.currentFieldWithError != ""){
      this.resetField(this.currentFieldWithError);
    } 
   for(var i=0;i<this.users.length;i++){
      if(this.users[i].userId == userId){
        this.updatableUserId=userId;
        this.updatableFirstname = this.users[i].firstname;
        this.updatableLastname = this.users[i].lastname;
        this.updatablePhone = this.users[i].phone;
        this.updatableLevel = this.users[i].level;
        this.updatableEmail = this.users[i].email;
        if(this.users[i].level == 1 || this.users[i].level == 2){
          this.isSeller = true
          
        }
      }
    }
  }

  onChangeGetData(fieldName,newValue){
   
  if(newValue == ""){
    this.makeFieldDanger(fieldName)
  }
  else if(fieldName=="firstname"){
    this.updatableFirstname = newValue
  }
  else if(fieldName=="lastname"){
    this.updatableLastname = newValue
  }
  else if(fieldName=="phone"){
    this.updatablePhone = newValue
  }
  else if(fieldName=="level"){
    this.updatableLevel = newValue
  }
  else if(fieldName=="email"){
    this.updatableEmail = newValue
  }
  }

  makeFieldDanger(fieldName){
    this.currentFieldWithError=fieldName;
    document.getElementById(fieldName).classList.toggle('field-warning');
    if(fieldName=="firstname"){
      this.errorMessage="Firstname is required";
    }
   else if(fieldName=="lastname"){
    this.errorMessage="Lastname is required";
    }
    else if(fieldName=="phone"){
      this.errorMessage="Phone is required";
    }
    else if(fieldName=="level"){
      this.errorMessage="Level is required";
    }
    else if(fieldName=="email"){
      this.errorMessage="Email is required";
    }
  }

  resetField(fieldName){
    document.getElementById(fieldName).classList.remove('field-warning');
    if(fieldName==this.currentFieldWithError){
       this.errorMessage="";
     }
    }

    updateUser(){
      if(this.errorMessage==""){
        this.usersService.updateUser(this.updatableUserId,this.updatableFirstname,this.updatableLastname,this.updatableEmail
          ,this.updatablePhone,this.updatableLevel).subscribe((res: any)=>{
            if(res.success == true){
              this.ngOnInit();
              document.getElementById("openModalButton").click();
            }
            else{
              this.errorMessage="Error occured user not updated";
              
            }
          })
      }
    }  

    deleteUser(userId){
      this.usersService.deleteUser(userId).subscribe((res: any)=>{
        if(res.success==true){
          for(var i=0;i<this.users.length;i++){
            var index=0;
            if(this.users[i].userId == userId){
              index = i;
              this.users.splice(index,1)
            }
          }
        }
      })
    }
  
    onMakeSeller(task,userId){
     if(task == "Make a Seller"){
      this.makeSeller(userId);
      }
      else{
        this.notificationService.showError('User is already a Seller','Changer Privilege')
      }
    }
   
    copyUserId(val: string){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.notificationService.showSuccess('User Id copied to clipboard successfully','Copy User Id')
    }
    makeSeller(userId){
      var userIdWrapper = document.getElementById('userId')
      userIdWrapper.setAttribute('value',userId)
      userIdWrapper.setAttribute('disabled','true')
      document.getElementById('openAddSellerModalButton').click()
    }
  ngOnInit() {
    for(var n=0;n<this.users.length;n++){
      this.users.splice(n);
    }

    this.usersService.getAllUsers().subscribe((res: any)=>{
       if(res.success == true){
         for(var i=0;i<res.users.length;i++){
         
           this.users.push({
             userId: res.users[i].userId,
             firstname: res.users[i].firstname,
             lastname: res.users[i].lastname,
             email: res.users[i].email,
             phone: res.users[i].phone,
             level: res.users[i].level,
             privilege: "Make a Seller",
             createdDate: res.users[i].created
           })
           if(this.users[i].level == 1 || this.users[i].level == 2){
            this.users[i].privilege="Is A seller"
            
          }
          }
       }
    })
  }

}
