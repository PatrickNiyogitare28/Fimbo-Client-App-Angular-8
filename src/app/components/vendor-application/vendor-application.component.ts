import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification.service'
import { VendorsService } from '../../shared/vendors.service'
import { SharedMethodsService } from '../../shared/shared-methods.service';
// import { truncateSync } from 'fs';

@Component({
  selector: 'app-vendor-application',
  templateUrl: './vendor-application.component.html',
  styleUrls: ['./vendor-application.component.css']
})
export class VendorApplicationComponent implements OnInit {
  hasLogo: boolean=false;
  isFirstLevel:boolean = true;
  isSecondLevel:boolean = false;
  isFinalLevel:boolean = false;
  isAccountCreated:boolean = false;
  registrationProgress = [{isFirstLevel:true}, {isSecondLevel:false}, {isFinalLevel:false}, {isAccountCreated:false}];
  logoImage = "";
  applicationFinalLevel = false;
  emailVerText="We sent you email verification code on ";
  registrationErrorHolder=[];
  errorTitle=""; errorBody=""; vendorEmail = "";
  createdVendorId = ""; createdVendorPhone=""; createdVendorEmail="";
  constructor(private notificationService: NotificationService,private vendorsService: VendorsService,
    private sharedMethodsService: SharedMethodsService) { }
   onLogo(value){
     if(value==1){
       this.hasLogo=true;
     }
     else if(value == 0){
       this.hasLogo = false
     }
   }
   onVerifyEmail(code){
    let nonespaceCode = code.replace(/\s+/g, '').length;
    if(nonespaceCode == 0){
      this.registrationErrorHolder[10]="Verification Code is required";
      this.fieldDanger('code');
    }
    else{
      this.createdVendorId = sessionStorage.getItem('registeringSellerId')
      this.vendorsService.emailVerification(this.createdVendorId,code).subscribe((res:any)=>{
       if(res.success == false){
         this.errorTitle="Email Verification Error";
         this.errorBody=res.message;
         this.triggerErrorModal('open');
       }
       else if(res.success == true){
        document.getElementById('application-form-wrapper').classList.remove('reduced-application-form-wrapper');
        document.getElementById('application-form-wrapper').classList.toggle('reduced-2-application-form-wrapper');
        this.isSecondLevel=false;
        this.isFinalLevel=true;
        document.getElementById('application-form-wrapper').style.height="360px";
        this.registrationProgress =
        [{isFirstLevel:false}, {isSecondLevel:false}, {isFinalLevel:true}, {isAccountCreated:false}];
        sessionStorage.setItem('registrationProgress', JSON.stringify(this.registrationProgress))
       }
      })
    }

    

     
   }
   onSubmit(sellerName,country,district,sector,town,email,contact,whatsapp,description){
    let noneSpacesellerName = sellerName.replace(/\s+/g, '').length;
    let noneSpaceCountry = country.replace(/\s+/g, '').length;
    let noneSpaceDistrict = district.replace(/\s+/g, '').length;
    let noneSpaceSector = sector.replace(/\s+/g, '').length;
    let noneSpaceTown = town.replace(/\s+/g, '').length;
    let noneSpaceEmail = email.replace(/\s+/g, '').length;
    let noneSpaceContact = contact.replace(/\s+/g, '').length;
    let noneSpaceWhatsapp = whatsapp.replace(/\s+/g, '').length;
    let noneSpaceDescription = description.replace(/\s+/g, '').length;
    if(noneSpacesellerName == 0 || sellerName.length < 2){
      (noneSpacesellerName == 0) ? this.registrationErrorHolder[0]="Seller/Bussiness name is required" :
      (sellerName.length < 2) ? this.registrationErrorHolder[0]="Short seller/bussiness name" : 
      (sellerName.length > 50) ? this.registrationErrorHolder[0]="Long name, Maximum characters are 50" :
      this.registrationErrorHolder[0]="";
      this.fieldDanger('sellerName');
    }
    else{ this.registrationErrorHolder[0]=""}
    

    if(noneSpaceDistrict == 0 || district.length < 2){
      (noneSpaceDistrict == 0) ? this.registrationErrorHolder[2]="District name is required" :
      (district.length < 2) ? this.registrationErrorHolder[2]="Short district name" : 
      (district.length > 50) ? this.registrationErrorHolder[2]="Long district name, Maximum characters are 50" :
      this.registrationErrorHolder[2]="";
      this.fieldDanger('district');
    }
    else { this.registrationErrorHolder[2]=""}


    if(noneSpaceSector == 0 || sector.length < 2){
      (noneSpaceSector == 0) ? this.registrationErrorHolder[3]="Sector name is required" :
      (sector.length < 2) ? this.registrationErrorHolder[3]="Short sector name" : 
      (sector.length > 50) ? this.registrationErrorHolder[3]="Long sector name, Maximum characters are 50" :
      this.registrationErrorHolder[3]="";
      this.fieldDanger('sector');
    }
    else { this.registrationErrorHolder[3]=""}
    // if(noneSpaceSector == 0 || sector.length < 2){
      
    // }
    if(noneSpaceTown == 0 || town.length < 2){
      (noneSpaceTown == 0) ? this.registrationErrorHolder[4]="Town name is required" :
      (town.length < 2) ? this.registrationErrorHolder[4]="Short town name" : 
      (town.length > 50) ? this.registrationErrorHolder[4]="Long town name, Maximum characters are 50" :
      this.registrationErrorHolder[4]="";
      this.fieldDanger('town');
    }
    else { this.registrationErrorHolder[4]=""}

   let validEmail:boolean =   this.sharedMethodsService.validateEmail(email)
    
    if(noneSpaceEmail == 0 || email.length < 2 || validEmail == false){
      (noneSpaceEmail == 0) ? this.registrationErrorHolder[5]="Email address is required" :
      (validEmail == false) ?  this.registrationErrorHolder[5]="Invalid email address": 
      (email.length < 2) ? this.registrationErrorHolder[5]="Short email address" : 
      (email.length > 50) ? this.registrationErrorHolder[5]="Long email address, Maximum characters are 50" :
      this.registrationErrorHolder[5]="";
      this.fieldDanger('email');
    }
    else { this.registrationErrorHolder[5]=""}

    let invalidContact = contact.replace(/\s+/g, '').length;
    if(contact.length == 0){
      this.registrationErrorHolder[6]="Contact phone is required";
      this.fieldDanger('contactNumber')
    }
    else if(/\D/.test(contact)){
      this.registrationErrorHolder[6]="Invalid contact number, Only digits  required";
      this.fieldDanger('contactNumber')
    }
    else if(noneSpaceContact != 10){
      this.registrationErrorHolder[6]="Contact should be 10 digits"
      this.fieldDanger('contactNumber')
    }
    else{
      this.registrationErrorHolder[6]="";
    }

    if(whatsapp.length == 0){
      this.registrationErrorHolder[7]="Contact phone is required";
      this.fieldDanger('whatsappNumber')
    }
    else if(/\D/.test(whatsapp)){
      this.registrationErrorHolder[7]="Invalid whatsapp number, Only digits  required";
      this.fieldDanger('whatsappNumber')
    }
    else if(noneSpaceWhatsapp != 10){
      this.registrationErrorHolder[7]="whastapp number should be 10 digits"
      this.fieldDanger('whatsappNumber')
    }
    else{
      this.registrationErrorHolder[7]="";
    }

    if(noneSpaceDescription == 0 || description.length < 10){
      (noneSpaceDescription == 0) ? this.registrationErrorHolder[8]="Bussiness discription is required" :
      (description.length < 10) ? this.registrationErrorHolder[8]="Short bussiness description, require 10-100 characters" : 
      this.registrationErrorHolder[8]="";
      this.fieldDanger('description');
    }
    else { this.registrationErrorHolder[8]=""}
  
    if(this.hasLogo == true && this.logoImage == ""){
      this.registrationErrorHolder[9]="Logo image is required if you choosed (My bussiness has logo)"
      this.fieldDanger('logo')
    }
   else{
     this.registrationErrorHolder[9]="";
   }

   if(this.registrationErrorHolder[0]=="" && this.registrationErrorHolder[2]=="" && this.registrationErrorHolder[3]=="" 
   && this.registrationErrorHolder[4]=="" && this.registrationErrorHolder[5]=="" && this.registrationErrorHolder[6]=="" 
   && this.registrationErrorHolder[7]==""  && this.registrationErrorHolder[8]=="" && this.registrationErrorHolder[9]=="" ){
       this.vendorsService.registerSeller(sellerName,country,district,sector,town,contact,whatsapp,email,description)
       .subscribe((res:any)=>{
        if(res.success == true){
          this.createdVendorId = res.sellerId; this.vendorEmail=email;
          if(this.hasLogo == true && this.logoImage != ""){
            this.vendorsService.addSellerLogo(res.sellerId,this.logoImage).subscribe((result: any)=>{
              if(result.success == false){
                this.errorTitle="Application has error";
                this.errorBody=res.message
                this.triggerErrorModal('open');
              }
          })
          }
          this.isFinalLevel = false;
          this.isFirstLevel=false;
          document.getElementById('application-form-wrapper').style.height="320px";
          this.isSecondLevel = true;
          this.registrationProgress =
          [{isFirstLevel:false}, {isSecondLevel:true}, {isFinalLevel:false}, {isAccountCreated:false}];
          sessionStorage.setItem('registrationProgress', JSON.stringify(this.registrationProgress))
          sessionStorage.setItem('registeringSellerId',res.sellerId);
          this.createdVendorId= res.sellerId;
          this.createdVendorPhone = contact; sessionStorage.setItem('registeringSellerPhone',contact);
          this.createdVendorEmail = email; sessionStorage.setItem('registeringSellerEmail',email);
        }
        else if(res.success != true){
          this.errorTitle="Application has error";
          this.errorBody=res.message
          this.triggerErrorModal('open');
        }
       })
   }
   else {
     this.notificationService.showError('Please check you may have some error in the application form','Application not Successfull')
   }
  
   }
   onCreatePassword(password,passwordVeri){
    let registeringSellerId = sessionStorage.getItem('registeringSellerId');
    this.createdVendorId = registeringSellerId;
    if(password == 0 || password.length < 6){
      (password.length == 0) ? this.registrationErrorHolder[11]="Password is required" : 
      (password.length < 6) ? this.registrationErrorHolder[11] = "Password should be more that 6 characters" :
      (password.length > 100) ? this.registrationErrorHolder[11] = "Long password, 50 characters are the max" :
      this.registrationErrorHolder[11] = "";
      this.fieldDanger('password')
    }
    else{
      this.registrationErrorHolder[11]="";
    }
    if(passwordVeri == 0){
     this.registrationErrorHolder[12]="Password verification is required";
     this.fieldDanger('passveri')
    }
    else{ this.registrationErrorHolder[12]="";}
    if(this.registrationErrorHolder[11] == "" && this.registrationErrorHolder[12] == ""){
      if(password !== passwordVeri){
        this.fieldDanger('password'); this.fieldDanger('passveri');
        this.errorTitle = "Password Creation Error";
        this.errorBody="Password and Password verification don't mutch";
        this.triggerErrorModal('open')
      }
      else{
        this.vendorsService.createSellerPassword(this.createdVendorId,password).subscribe((res:any)=>{
          if(res.success == true){
              this.isFirstLevel=false; this.isSecondLevel=false; this.isFinalLevel= false; this.isAccountCreated=true;
              document.getElementById('application-form-wrapper').style.height="320px";
              this.registrationProgress =
              [{isFirstLevel:false}, {isSecondLevel:false}, {isFinalLevel:false}, {isAccountCreated:true}];
              sessionStorage.setItem('registrationProgress', JSON.stringify(this.registrationProgress))
          }
          else if(res.success != true){
            this.errorTitle="Error, Password not created";
            this.errorBody=res.message;
            this.triggerErrorModal('open');
          }
         
        })
      }
    }
    
   } 
  
   fieldDanger(fieldName){
     document.getElementById(fieldName).classList.toggle('danger-field');
   }
   onResendCode(){
     this.emailVerText="Email verification code resent on ";
     this.vendorsService.resendEmailVerificationCode(this.createdVendorId).subscribe((res:any)=>{
       if(res.success == true){
         this.emailVerText = "We sent you a new email verfication code on";
         this.createdVendorEmail = res.sellerEmail;
       }
       else if(res.success == false){
         this.errorTitle="Failed to resend Verification code";
         this.errorBody=res.message;
         this.triggerErrorModal('open');
       }
     })
   }
   resetField(fieldName,index){
     document.getElementById(fieldName).classList.remove('danger-field')
     this.registrationErrorHolder[index]=""

   }
   onSelectLogo(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.logoImage = file;
    
    }
  } 

  triggerErrorModal(event){   
    let checkProModal = document.getElementById("errorModal");
    if(event == 'open'){
      checkProModal.style.display = "block";
    }
    else if(event == 'close'){
      checkProModal.style.display="none";
    }
    window.onclick = function(event) {
      if (event.target == checkProModal) {
        checkProModal.style.display = "none";
      }
    }
  }
 
  ngOnInit() {
    sessionStorage.removeItem('displayHeaders')
    var progressArr = sessionStorage.getItem('registrationProgress');
    var progress = JSON.parse(progressArr);
    if(progressArr != null){
      this.isFirstLevel  = progress[0].isFirstLevel;
      this.isSecondLevel  = progress[1].isSecondLevel;
      this.isFinalLevel  = progress[2].isFinalLevel;
      this.isAccountCreated  = progress[3].isAccountCreated 
      if(this.isFinalLevel == true ){
        document.getElementById('application-form-wrapper').style.height="360px";
      }
      else if(this.isSecondLevel == true || this.isAccountCreated == true){
        document.getElementById('application-form-wrapper').style.height="320px";
      }
      else if(this.isFirstLevel == true){
        document.getElementById('application-form-wrapper').style.height="1200px";
      }
    }
    let registeringSellerId = sessionStorage.getItem('registeringSellerId');
    if(registeringSellerId != null){
      this.createdVendorId = registeringSellerId;
    }
     let email = sessionStorage.getItem('registeringSellerEmail');
     let phone =  sessionStorage.getItem('registeringSellerPhone');
     if(email != null){ this.createdVendorEmail = email}
     if(phone != null){ this.createdVendorPhone = phone}
  }

}
