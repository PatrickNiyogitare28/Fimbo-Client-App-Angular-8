import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { NotificationService } from '../../shared/notification.service';
import {ToastrService} from 'ngx-toastr';
import { VendorsService } from '../../shared/vendors.service';
declare var $: any;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  $:any;
  registerFormGroup: FormGroup;
  errorMessage:any;
  loginErrorMessage: any;
  showBuyerLogin:boolean = true;
  showBuyerRegister:boolean=false;
  showSellerLogin:boolean=false;
  authValdiateErrorsHolder=[];
  createBuyerValidateError = ""; buyerLoginError = "";
  toastRef; vendorLoginError = "";
  constructor(public router: Router, public fb: FormBuilder, public authService: AuthService,
    private notificationService: NotificationService,private toastr: ToastrService,
    private vendorService: VendorsService) {
    this.createRegisterForm();

   }


  createRegisterForm(){
   this.registerFormGroup =  this.fb.group({
     registerFirstname : ['',Validators.required],
     registerLastname: ['',Validators.required],
     registerPhone: ['',Validators.required],
     registerCreatedPass: ['',Validators.required],
     registerPassVer: ['',Validators.required]
   })
  } 

  triggerAuthModal(event){
     if(event == 'close'){
      $(document).ready(function() {
        $('#authModal').fadeOut(1000);
       });
     }
  }
  
  onAuthRedirectTo(wrapper){
    if(wrapper == 'showBuyerRegister'){
      this.showBuyerRegister=true;
      this.showBuyerLogin=false;
      this.showSellerLogin=false;
    }
    else if(wrapper == 'showBuyerLogin'){
      this.loginErrorMessage = "";
      this.showBuyerLogin=true;
      this.showBuyerRegister=false,
      this.showSellerLogin=false;
    }
    else if(wrapper == 'showSellerLogin'){
     this.showSellerLogin=true;
      this.showBuyerLogin=false;
      this.showBuyerRegister=false;
    }
    else if(wrapper == 'redirectToVendorRegister'){
      document.getElementById('authModal').style.display="none";
      this.router.navigate(['/vendor-application'])
    }
  }  
  onBuyerLogin(phone,password){
    if(this.toastRef){ 
      this.removeToast()
    }
    let nospacephoneSize = phone.replace(/\s+/g, '').length;
    let nospacepasswordSize = password.replace(/\s+/g, '').length;
    if(nospacephoneSize == 0){
      this.authValdiateErrorsHolder[0]="Phone number is required";
      this.makeFieldDanger('loginphone');
    }else { this.authValdiateErrorsHolder[0]="" }

    if(nospacepasswordSize == 0){
      this.authValdiateErrorsHolder[1]="Password is required";
      this.makeFieldDanger('loginpassword');
    }else{ this.authValdiateErrorsHolder[1]="" }
    if(this.authValdiateErrorsHolder[0] == "" && this.authValdiateErrorsHolder[1] == ""){
      this.authService.loginUser(phone,password).subscribe((res:any)=>{
        if(res.success == false){
          this.buyerLoginError = "Invalid Phone or Password";
        }
        else if(res.success == true){
          sessionStorage.setItem('token',res.token);
          this.authService.authenticateUser().subscribe((result:any)=>{
           if(result.success == true && result.level<2){
              let accountName = result.firstname.replace(/\s+/g, '') + result.lastname.replace(/\s+/g, '')
              let lowerAccountName = accountName.toLowerCase();
              this.router.navigate(['buyeraccount',lowerAccountName, 'darshboard'])
              document.getElementById('authModalCloser').click();
             }
             else if(result.success == true && result.level== 2){
               this.router.navigate(['myaccount/superadmin']);
             }
          })
         
        }
      })
    }
  }
  onCreateBuyerAccount(firstname,lastname,phone,password,veripassword){
    let nospacefirstnameSize = firstname.replace(/\s+/g, '').length;
    let nospacelastnameSize = lastname.replace(/\s+/g, '').length;
    let nospacephone = phone.replace(/\s+/g, '').length;
    let nospacepasswordSize = password.replace(/\s+/g, '').length;
    let nospaceveripasswordSize = veripassword.replace(/\s+/g, '').length;
    
   
    if(nospacefirstnameSize == 0 || nospacelastnameSize==0 || nospacepasswordSize==0 || nospaceveripasswordSize==0
      || nospacephone==0){
      this.createBuyerValidateError = "There are empty required fields";
      if(nospacefirstnameSize==0){ this.makeFieldDanger('firstname') }
      if(nospacelastnameSize == 0){ this.makeFieldDanger('lastname'); }
      if(nospacepasswordSize == 0){ this.makeFieldDanger('signuppassword')}
      if(nospaceveripasswordSize == 0){ this.makeFieldDanger('veripassword')}
      if(nospacephone == 0){ this.makeFieldDanger('signupphone')}
    }
    else if(firstname.length < 2 || firstname.length > 30){
      this.createBuyerValidateError = "Firstname requires 2 - 30 characters";
      this.makeFieldDanger('firstname');
    }
    else if(lastname.length < 2 || lastname.length > 30){
      this.createBuyerValidateError = "Lastname requires 2 - 30 characters";
      this.makeFieldDanger('lastname');
    }
    else if(password.length < 6 || password.length > 62){
      this.createBuyerValidateError= "Passoword requires 6 - 62 characters";
      this.makeFieldDanger('veripassword')
    } 
    else if(password.length != veripassword.length){
      this.createBuyerValidateError = "Invalid Password verification";
      this.makeFieldDanger('veripassword');
    }

   
     if(/\D/.test(phone)){ this.authValdiateErrorsHolder[4] = "Invalid Phone"; 
     this.makeFieldDanger('signupphone');
    }
     else if(phone.length != 10 && nospacephone != 0) { this.authValdiateErrorsHolder[4]="Phone should be 10 digits";
     this.makeFieldDanger('signupphone'); 
    }else{
      this.authValdiateErrorsHolder[4]="";
    }
  
    if(this.createBuyerValidateError == "" && this.authValdiateErrorsHolder[4]== ""){
      this.authService.registerUser(firstname,lastname,phone,password).subscribe((res:any)=>{
        if(res.success == false){
          this.createBuyerValidateError= res.message;
        }
        else if(res.success == true){
         this.showSuccessToast("You can login now","Buyer account created successfully");
         this.onAuthRedirectTo('showBuyerLogin');
         }
      })
    }
}
onVendorLogin(phone,password){
  let nospacephoneSize = phone.replace(/\s+/g, '').length;
  let nospacepasswordSize = password.replace(/\s+/g, '').length;
  if(nospacephoneSize == 0){
    this.authValdiateErrorsHolder[7]="Phone number is required";
    this.makeFieldDanger('sellerphone');
  }else { this.authValdiateErrorsHolder[7]="" }

  if(nospacepasswordSize == 0){
    this.authValdiateErrorsHolder[8]="Password is required";
    this.makeFieldDanger('sellerpassword');
  }else{ this.authValdiateErrorsHolder[8]="" }

  if(this.authValdiateErrorsHolder[7] == "" && this.authValdiateErrorsHolder[8]==""){
    this.vendorService.vendorLogin(phone,password).subscribe((res:any)=>{
      if(res.success == false){
         this.vendorLoginError = res.message
      }
      else if(res.success == true){
       sessionStorage.setItem('token',res.token);
       this.authService.authenticateVendor().subscribe((result: any)=>{
         if(result.success == false){
            this.vendorLoginError="Error occured try again";
         }
         else if(result.success == true){
          let accountName = result.sellerName.replace(/\s+/g, '')
          let lowerAccountName = accountName.toLowerCase();
          this.router.navigate(['selleraccount',lowerAccountName, 'darshboard'])
          document.getElementById('authModalCloser').click();
         }
       })
      }
    })
  } 
}
  makeFieldDanger(fieldName){
   document.getElementById(fieldName).classList.toggle('danger-auth-field');
  }
  onResetField(fieldName, errorIndex){
    this.createBuyerValidateError = ""; 
    this.vendorLoginError="";
    this.buyerLoginError="";
    document.getElementById(fieldName).classList.remove('danger-auth-field');
    this.authValdiateErrorsHolder[errorIndex]="";
    if(errorIndex == 2 || errorIndex == 3 || errorIndex == 4|| errorIndex == 5 || errorIndex == 6){
      this.createBuyerValidateError= "";
    }
  }
  showSuccessToast=(message, title)=>{
    this.toastRef =  this.toastr.success(message, title,{
      disableTimeOut:true
    })
  }
  removeToast = () =>{
    this.toastr.clear(this.toastRef.ToastId);
  }
  ngOnInit() {
    
  }

}
