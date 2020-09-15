import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UsersService } from '../../shared/users.service'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '../../shared/notification.service'
import { LocationsService } from '../../shared/locations.service'
import { Location } from '@angular/common';
import { CustomerAccountComponent } from '../customer-account/customer-account.component';

@Component({
  selector: 'app-customer-account-dashboard',
  templateUrl: './customer-account-dashboard.component.html',
  styleUrls: ['./customer-account-dashboard.component.css','../customer-account/customer-account.component.css']
})
export class CustomerAccountDashboardComponent implements OnInit {
  isEmailProvided = false; isEmailVerifyed = false; emailWrapper = true;hasAddress = false; hasEmail = false;
   hasLocation = false; userId = ""; verifiableEmail = "";emailResponseError = "";addLocationEmailSuccess = "Email verification is successful!";
   addLocationGuid = "Provide where you are located currently";countryFieldError = ""; updatableCountryFieldError="";
   cityFieldError = ""; updatableCityFieldError="";streetFieldError = ""; updatableStreetFieldError = "";
   addressHasNoError = []; updateAddressHasNoError = []; userCurrentCity = ""; profileProgrees = 30;userCurrentStreet = "";
   worldCountries = []; profileProgressTitle = "Profile Progress: " + this.profileProgrees; userCurrentCountry = "Rwanda";
   currentUserEmail = "";currentUserPhone = ""; currentUserFirstname = "";currentUserLastname = "";
   updateProfileHasErrors=[]; updateResponseEffect=""; updateProfileResponseMsg="";
   updatePasswordHasErrors = []; updatePasswordResponseMsg=""; updatePasswordResponseEffect="";
   emailLableText="And Your Email"; updatableUserEmail="";
   isSeller:boolean = false; hasLogo:boolean = false; logoName = ""; 
   defaultNameLogo = ""; sellerDetails = {blandName: "",email:"",contact:"",whatsapp:""}

 constructor(private authService: AuthService, private usersService: UsersService,
    private route: ActivatedRoute, private router: Router, public notficationService: NotificationService,
    public locationService: LocationsService, private _location: Location, private customerAccountComp:CustomerAccountComponent) {}

  userAddressModal(value) {
    var userAddressModal = document.getElementById("userAddressModal");
    var addUserAddressModal = document.getElementById("addUserAddressModal");
    var updateUserDalaModal = document.getElementById("updateUserDalaModal")
    var userAddressModalCloser = document.getElementById("userAddressModalCloser");
    var addUserAddressModalCloser = document.getElementById('addUserAddressModalCloser')
    var updateUserDalaModalCloser = document.getElementById('updateUserDalaModalCloser')

    if (value == 1) {
      userAddressModal.style.display = "block";
    } else if (value == 2) {
      addUserAddressModal.style.display = "block";
    } 
    else if(value==2.1){
      addUserAddressModal.style.display = "block";
      this.addLocationEmailSuccess = "";
      this.emailWrapper = true;
    }
    else if (value == 2.5) {

      this.addMoreAddress(2)
      addUserAddressModal.style.display = "block";

    } else if (value == 3) {
      updateUserDalaModal.style.display = "block";
    }
    userAddressModalCloser.onclick = function () {
      userAddressModal.style.display = "none";
    }
    addUserAddressModalCloser.onclick = function () {
      addUserAddressModal.style.display = "none";
    }
    updateUserDalaModalCloser.onclick = function () {
      updateUserDalaModal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == userAddressModal || event.target == addUserAddressModal || event.target == updateUserDalaModal) {
        userAddressModal.style.display = "none";
        addUserAddressModal.style.display = "none";
        updateUserDalaModal.style.display = "none";
      }
    }
  }

  verifyEmail(email) {
    this.usersService.verifyUserEmail(this.userId, email).subscribe((res: any) => {
      if (res.success == true) {
        this.verifiableEmail = email;
        this.isEmailProvided = true;
      } else {
        document.getElementById('emailVerErrorWrapper').removeAttribute('hidden')
        this.emailResponseError = res.message
      }
    })
  }
  reEnterEmail() {
    this.isEmailProvided = false;
  }
  enterUserAddress(task,verificationCode) {
    this.usersService.verifyUserEmailCode(this.userId, verificationCode).subscribe((res: any) => {
      if (res.success == true) {
        this.profileProgrees = 60; 
        this.hasEmail = true
        this.profileProgressTitle = "Profile Progress: " + 60 + "%";
        if(task == 'update'){
         this.notficationService.showSuccess('Your Email was saved!','Email Adding');
         document.getElementById('addUserAddressModalCloser').click();

        }
        else if(task == 'add'){
            this.isEmailVerifyed = false;
            this.emailWrapper = false;
        }
       this.getUserAddress()
      } else {
        document.getElementById('verification-guid-para').setAttribute('hidden', 'true')
        document.getElementById('emailCodeVerErrorWrapper').removeAttribute('hidden')
        this.emailResponseError = "Incorrect Verification Code"
      }
    })

  }
  getUserAddress() {
    const token = sessionStorage.getItem('token')
    if (token) {
      this.authService.authenticateUser().subscribe((res: any) => {
        if (res.success == true) {
          this.userId = res.userId;   
          this.currentUserFirstname = res.firstname,
          this.currentUserLastname = res.lastname,
          this.currentUserPhone = res.phone
       
          if (res.email != 'NULL') {
            this.currentUserEmail = res.email
            this.hasEmail = true
            this.profileProgrees = 60;
            this.profileProgressTitle = "Profile Progress: " + 60
            this.updatableUserEmail=res.email;
          }
          this.usersService.getUserAddress(res.userId).subscribe((result: any) => {
            if (result.success == true) {
              this.hasLocation = true
              this.profileProgrees = 100;
              this.profileProgressTitle = "Profile Progress: " + 100 + "%"
            }
          })
        }
      })
    }
  }

  resetField() {
    document.getElementById('emailVerErrorWrapper').setAttribute('hidden', 'true')
    document.getElementById('verification-guid-para').removeAttribute('hidden')
  }
  addMoreAddress(value) {
    if (value == 2) {
      this.addLocationEmailSuccess = "";
      this.emailWrapper = false;
    }
  }
  addUserAddress(task,country, city, street) {
    let cityWithoutSpace = city.replace(/\s+/g, '').length;
    let streetWithoutSpace = street.replace(/\s+/g, '').length;
    if(task == 'set'){
     if (country == "null") {
        document.getElementById('country').classList.toggle('dangerField')
        this.countryFieldError = "Country is required"
        this.addressHasNoError[0] = 0
      } else {
        this.addressHasNoError[0] = 1
      }
      if (cityWithoutSpace < 2 || cityWithoutSpace > 30) {
        document.getElementById('city').classList.toggle('dangerField')
        this.cityFieldError = "City name should have 2-30 characters";
        this.addressHasNoError[1] = 0
  
      } else {
        this.addressHasNoError[1] = 1
      }
      if (streetWithoutSpace < 2 || streetWithoutSpace > 30) {
        document.getElementById('street').classList.toggle('dangerField')
        this.streetFieldError = "Street name should have 2-30 characters";
        this.addressHasNoError[2] = 0
  
      } else {
        this.addressHasNoError[2] = 1
      }
  
      if (this.addressHasNoError[0] == 1 && this.addressHasNoError[1] == 1 && this.addressHasNoError[2] == 1) {
        this.authService.authenticateUser().subscribe((res: any) => {
          if (res.success == true) {
            this.usersService.addUserAddress(res.userId, country, city, street).subscribe((result: any) => {
              if (result.success == true) {
                this.hasLocation = true,
                  document.getElementById('addUserAddressModalCloser').click();
                this.notficationService.showSuccess('Your location address was saved successfully', 'Adding Address')
              }
            })
          }
        })
      }
    }
    else if(task == 'update'){
      if (country == "null") {
        document.getElementById('updatableCountry').classList.toggle('dangerField')
        this.updatableCountryFieldError = "Country is required"
        this.updateAddressHasNoError[0] = 0
      } else {
        this.updateAddressHasNoError[0] = 1
      }
      if (cityWithoutSpace < 2 || cityWithoutSpace > 30) {
        document.getElementById('updatableCity').classList.toggle('dangerField')
        this.updatableCityFieldError = "City name should have 2-30 characters";
        this.updateAddressHasNoError[1] = 0
  
      } else {
        this.updateAddressHasNoError[1] = 1
      }
      if (streetWithoutSpace < 2 || streetWithoutSpace > 30) {
        document.getElementById('updatableStreet').classList.toggle('dangerField')
        this.updatableStreetFieldError = "Street name should have 2-30 characters";
        this.updateAddressHasNoError[2] = 0
  
      } else {
        this.updateAddressHasNoError[2] = 1
      }
  
      if (this.updateAddressHasNoError[0] == 1 && this.updateAddressHasNoError[1] == 1 && this.updateAddressHasNoError[2] == 1) {
        this.authService.authenticateUser().subscribe((res: any) => {
          if (res.success == true) {
            this.usersService.updateUserAddress(res.userId, country, city, street).subscribe((result: any) => {
             if (result.success == true) {
                document.getElementById('addUserAddressModalCloser').click();
                this.notficationService.showSuccess('Your location address was updated successfully', 'Updating Address')
                this.hasLocation=true
               }
            })
          }
        })
      }
    }

  }
  resetAddAddressField(fieldName) {
    document.getElementById(fieldName).classList.remove('dangerField')
    this.updatePasswordResponseEffect="";
    this.updatePasswordResponseMsg ="";

    if (fieldName == "country") {
      this.countryFieldError = "";
    }
    if (fieldName == "city") {
      this.cityFieldError = "";
    } else if (fieldName == "street") {
      this.streetFieldError = "";
    }
    else if(fieldName == "updatablCountry"){
      this.updatableCountryFieldError="";
    }else if(fieldName == "updatableCity"){
          this.updatableCityFieldError = "";
    }else if(fieldName == "updatableStreet"){
     this.updatableStreetFieldError="";
    }else if(fieldName == "oldPassword"){
      this.updatePasswordHasErrors[0]=""
    }else if(fieldName == "newPassword"){
      this.updatePasswordHasErrors[1]=""
    }else if(fieldName == "newPassVerification"){
      this.updatePasswordHasErrors[2]="";
    }
  }

  backToStore() {
    this._location.back()
  }
  showUserAddress(showValue) {
    this.addLocationGuid = "This is you current location. You can change it if needed!";
    this.usersService.getUserAddress(this.userId).subscribe((res: any) => {
      if (res.success == true) {
        this.userCurrentCountry = res.address[0].country;
        this.userCurrentCity = res.address[0].city;
        this.userCurrentStreet = res.address[0].streetCode;
        if(showValue == 1){
          this.userAddressModal(2.5)
        }
      }
    })
  }

  displayUpdateWrapper(value) {
    var profileWraper = 'update-profile-wrapper';
    var locationWrapper = 'update-location-wrapper';
    var emailWrapper = 'update-email-wrapper';
    var passwordWrapper = 'update-password-wrapper'
    if (value == 1) {
      this.updateModalDisplayWrappers(1, profileWraper, locationWrapper, emailWrapper,passwordWrapper);
    } else if (value == 2) {
      this.showUserAddress(1.5);
      this.updateModalDisplayWrappers(2, locationWrapper, profileWraper, emailWrapper,passwordWrapper);
    } else if (value == 3) {
      this.updateModalDisplayWrappers(3, emailWrapper, profileWraper, locationWrapper,passwordWrapper);
    }
    else if(value==4){
      this.updateModalDisplayWrappers(4, passwordWrapper, profileWraper, locationWrapper,emailWrapper);
    }
  }
  updateModalDisplayWrappers(list, show, hideOne, hideTwo,hideThree) {
    document.getElementById(show).removeAttribute('hidden')
    document.getElementById(hideOne).setAttribute('hidden', 'true')
    document.getElementById(hideTwo).setAttribute('hidden', 'true')
    document.getElementById(hideThree).setAttribute('hidden','true')

    var profileList = document.getElementById('profile-list')
    var locationList = document.getElementById('location-list')
    var emailList = document.getElementById('email-list')
    var passwordList = document.getElementById('password-list');
    if (list == 1) {
      profileList.classList.toggle('active-update-list')
      locationList.classList.remove('active-update-list')
      emailList.classList.remove('active-update-list')
      passwordList.classList.remove('active-update-list')
    } else if (list == 2) {
      locationList.classList.toggle('active-update-list')
      profileList.classList.remove('active-update-list')
      emailList.classList.remove('active-update-list')
      passwordList.classList.remove('active-update-list')

    } else if (list == 3) {
      emailList.classList.toggle('active-update-list')
      profileList.classList.remove('active-update-list')
      locationList.classList.remove('active-update-list')
      passwordList.classList.remove('active-update-list')

    }
    else if(list == 4){
      passwordList.classList.toggle('active-update-list')
      profileList.classList.remove('active-update-list')
      locationList.classList.remove('active-update-list')
      emailList.classList.remove('active-update-list')
    }
  }
 
  updateUserProfiel(firstname,lastname,phone){
    let noneSpaceFirstname = firstname.replace(/\s+/g, '').length;
    let noneSpaceLastname = lastname.replace(/\s+/g, '').length;
    let noneSpacePhone = phone.replace(/\s+/g, '').length;
    if(firstname == ""){
      this.updateProfileHasErrors[0]="Firstname is required";
      this.updateProfileErrorField('updatableFirstname')

    }
    else if(noneSpaceFirstname < 2 || noneSpaceFirstname > 50){
     (noneSpaceFirstname < 2) ? this.updateProfileHasErrors[0]="Firstname requires more than 1 character" : (noneSpaceFirstname > 50) ? this.updateProfileHasErrors[0] = "Firstname requires less than 50 characters" 
    : this.updateProfileHasErrors[0] = "";
    this.updateProfileErrorField('updatableFirstname')
    }
    else{
      this.updateProfileHasErrors[0] = ""
    }
    
    if(lastname == ""){
      this.updateProfileHasErrors[1]="LastName is required";
      this.updateProfileErrorField('updatableLastname')

    }
    else if(noneSpaceLastname < 2 || noneSpaceLastname > 50){
     (noneSpaceLastname < 2) ? this.updateProfileHasErrors[1]="Lastname requires more than 1 character" : (noneSpaceLastname > 50) ? this.updateProfileHasErrors[1] = "Lastname requires less than 50 characters" 
    : this.updateProfileHasErrors[1] = "";
    this.updateProfileErrorField('updatableFirstname')
    }
    else{
      this.updateProfileHasErrors[1] = ""
    }
    
    if(phone == ""){
      this.updateProfileHasErrors[2]="Phone is required"
      this.updateProfileErrorField('updatablePhone')

    }
    else if(/\D/.test(phone)){
      this.updateProfileHasErrors[2]="Please Enter only numerics"
      this.updateProfileErrorField('updatablePhone')
  }
    else if(phone.length != 10){
      this.updateProfileHasErrors[2]="Phone should be 10 digits"
      this.updateProfileErrorField('updatablePhone')
  }
    else{
      this.updateProfileHasErrors[2]=""

    }
    if(firstname != this.currentUserFirstname || lastname != this.currentUserLastname || phone != this.currentUserPhone){
      if(this.updateProfileHasErrors[0]=="" && this.updateProfileHasErrors[1] =="" && this.updateProfileHasErrors[2]==""){
        this.usersService.updateUserProfile(this.userId,firstname,lastname,phone).subscribe((res:any)=>{
          if(res.success == true){
            this.notficationService.showSuccess('Profile updated successfully','Profile Update')
            this.getUserAddress();
            if(phone != this.currentUserPhone){
              this.updateResponseEffect="updateResponseSuccessEffect";
              this.updateProfileResponseMsg="Profile updated! Next time you login whith "+phone;
            }
          }
          else{
            this.updateResponseEffect="updateResponseDangerEffect";
            this.updateProfileResponseMsg =res.message
          }
        })
      }
    }
  }

  updateProfileErrorField(fieldName){
     document.getElementById(fieldName).classList.toggle('dangerField');
  }
  resetUpdateProfileErrorField(fieldName){
    this.updateResponseEffect="";
    this.updateProfileResponseMsg ="";
    
    document.getElementById(fieldName).classList.remove('dangerField')
    if(fieldName == 'updatableFirstname'){
      this.updateProfileHasErrors[0]="";
    }else if(fieldName == 'updatableLastname'){
      this.updateProfileHasErrors[1]="";
    }else if(fieldName == 'updatablePhone'){
      this.updateProfileHasErrors[2]="";
    }
    
  }

  updateAccountPassword(oldPassword,newPassword,newPassVerification){
    let noSpaceoldPass = oldPassword.replace(/\s+/g, '').length;
    let noSpaceNewPass = oldPassword.replace(/\s+/g, '').length;
    let noSpaceNewPassVerify = oldPassword.replace(/\s+/g, '').length;
    if(noSpaceoldPass == 0 || oldPassword.length > 200){
       (noSpaceoldPass < 1) ? this.updatePasswordHasErrors[0]="Old Password is Required" : (oldPassword.length > 200) ? 
       this.updatePasswordHasErrors[0]="Invalid inpute": this.updatePasswordHasErrors[0] ="";
       this.updateProfileErrorField('oldPassword')
    }else { this.updatePasswordHasErrors[0]=""}

    if(noSpaceNewPass == 0 || newPassword.length > 200 || newPassword.length < 6){
      (noSpaceNewPass < 1) ? this.updatePasswordHasErrors[1]="New Password is Required" : (newPassword.length > 100) ? 
      this.updatePasswordHasErrors[1]="100 is the maxiimum length" : (newPassword.length < 6) ? 
      this.updatePasswordHasErrors[1]= "Password should have atleast 6 characters" : this.updatePasswordHasErrors[1]="";
      this.updateProfileErrorField('newPassword')
   }else { this.updatePasswordHasErrors[1]=""}

   if(noSpaceNewPassVerify == 0 || (newPassVerification != newPassword)){
      if(noSpaceNewPassVerify == 0 ){
        this.updatePasswordHasErrors[2]="Password verfication is required";
        this.updateProfileErrorField('newPassVerification')
      }
      else if(newPassVerification != newPassword && newPassword.length > 5){
        this.updatePasswordHasErrors[2]="Incorrect new Password verification";
        this.updateProfileErrorField('newPassVerification')
    }

   }else { this.updatePasswordHasErrors[2]=""}
    if(this.updatePasswordHasErrors[0] == "" &&this.updatePasswordHasErrors[1] == "" && this.updatePasswordHasErrors[2] == ""){
      this.usersService.updateUserPassword(this.userId,oldPassword,newPassword).subscribe((res:any)=>{
       if(res.success == true){
         this.notficationService.showSuccess('Password chanded successfully','Password Updating')
       }
       else{
        this.updatePasswordResponseEffect="updatePasswordResponseDangerEffect";
        this.updatePasswordResponseMsg =res.message
        if(res.status == 401){
          this.updateProfileErrorField('oldPassword')
        }
       }
      })
    }
}

updateEmail(newEmail){
  
  this.usersService.updateUserEmail(this.userId,newEmail).subscribe((response: any)=>{
     if(response.success == true){
          this.isEmailProvided=true
          this.verifiableEmail=newEmail
      }
      else{
        document.getElementById('emailVerErrorWrapper').removeAttribute('hidden')
        this.emailResponseError = response.message
      }
  })
}

triggerUpdateEmailModal(){
  this.isEmailProvided = false
  this.emailLableText="Add a new email"
  document.getElementById('updateUserDalaModalCloser').click();
  this.userAddressModal(2.1);
}
triggerAddEmail(){
  document.getElementById('updateUserDalaModalCloser').click();;
  this.userAddressModal(2.1)
}

getAccountLogo(){
 this.authService.authenticateVendor().subscribe((res:any)=>{
    if(res.success == true){
      if(res.logo != null){
        this.hasLogo = true;
        this.logoName =res.logo;
      }
      else{
        this.hasLogo=false;
        this.defaultNameLogo = res.sellerName[0].toUpperCase();
        
      }
    }
  })
}
makeDefaultUserProfile(){
  this.authService.authenticateUser().subscribe((res:any)=>{
    if(res.success == true){
      this.defaultNameLogo = res.firstname[0].toUpperCase();
      this.hasLogo = false;
    }
  })
}
subpageSellerProfile(){
 this.customerAccountComp.subpageShow('profile');
}
  ngOnInit() {
   //---------getting  call world countries api
    this.locationService.getCountries().subscribe((countries: any) => {
      for (let i = 0; i < countries.length; i++) {

        this.worldCountries.push({
          name: countries[i].name
        })
      }

    })
    //------------check the account type (buyerAccount | sellerAccount)
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.router.navigate(['index'])
      document.getElementById('open-cart-btn').click()

    } else {
      let accountType = this.route.snapshot.params.accountType;
      if(accountType == 'buyeraccount'){ 
       this.getUserAddress()
       this.authService.authenticateUser().subscribe((res: any) => {
         let accountName = res.firstname.replace(/\s+/g, '') + res.lastname.replace(/\s+/g, '')
         let lowerAccountName = accountName.toLowerCase();
         this.router.navigate(['buyeraccount',lowerAccountName, 'darshboard'])
         this.isSeller=false;
         this.makeDefaultUserProfile();
       })
      }
      else if(accountType == 'selleraccount'){
        this.authService.authenticateVendor().subscribe((result: any)=>{
         if(result.success == true){
          let accountName = result.sellerName.replace(/\s+/g, '')
          let lowerAccountName = accountName.toLowerCase();
          this.router.navigate(['selleraccount',lowerAccountName, 'darshboard'])
          this.isSeller=true;
          this.sellerDetails = {
            blandName: result.sellerName,
            email: result.seller_email,
            contact: result.seller_contact,
            whatsapp: result.seller_watsapp
          }
          this.getAccountLogo();
         }
         else{
           this.router.navigate(['index']);
         }
       })
      }
      else{
        alert("404: Page not found")
        this.router.navigate(['index']);
      }
     
    }
  
  }

}
