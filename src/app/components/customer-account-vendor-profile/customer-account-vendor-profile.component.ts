import { Component, OnInit } from '@angular/core';
import { CustomerAccountComponent} from '../customer-account/customer-account.component'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';
import { VendorsService } from '../../shared/vendors.service';
import { NotificationService } from '../../shared/notification.service';
declare var $:any;
@Component({
  selector: 'app-customer-account-vendor-profile',
  templateUrl: './customer-account-vendor-profile.component.html',
  styleUrls: ['./customer-account-vendor-profile.component.css']
})
export class CustomerAccountVendorProfileComponent implements OnInit {
  accountDetailsObj= {sellerId: '',blandName:'',email:'',contactPhone:'',whatsappPhone:'', country: '',district:'',
                       sector:'',town:'',bussinessDescription:'',logo:''};
  formValidatorErrorHolder = [];                     
  hasLogo:boolean = false;
  logoName = "";
  logoImage;
  fieldErrorHolder=[];
  errorTitle:string="";
  errorBody:string="";
  url;
  msg = "";
  defaultNameLogo = "";
  
  constructor(public customerAccountComponent: CustomerAccountComponent, private router:Router, private route: ActivatedRoute,
    private authService: AuthService,private sharedMethodsService: SharedMethodsService,private vendorService: VendorsService,
    private notificationService: NotificationService) { }
 
  getAccountDetails(){
    const token = sessionStorage.getItem('token');
    const accountType = this.route.snapshot.params.accountType;
    if(token && accountType == 'selleraccount'){
      this.authService.authenticateVendor().subscribe((res:any)=>{
        if(res.success == true){
          this.accountDetailsObj = {
            sellerId: res.sellerId,
            blandName: res.sellerName,
            email: res.seller_email,
            contactPhone: res.seller_contact,
            whatsappPhone: res.seller_watsapp,
            country: res.country,
            district: res.district,
            sector : res.sector,
            town: res.town,
            bussinessDescription: res.bussiness_description,
            logo: res.logo
          }
          if(res.logo != null){
            this.hasLogo = true;
          }
       }
     })
    }
  }
  onUpdateDetailProperty(property,value){
    (property == 'blandName') ? this.accountDetailsObj.blandName = value :
    (property == 'email') ? this.accountDetailsObj.email = value :
    (property == 'contact') ? this.accountDetailsObj.contactPhone = value :
    (property == 'whatsapp') ? this.accountDetailsObj.whatsappPhone = value :
    (property == 'country') ? this.accountDetailsObj.country = value :
    (property == 'district') ? this.accountDetailsObj.district   = value :
    (property == 'sector') ? this.accountDetailsObj.sector = value :
    (property == 'town') ? this.accountDetailsObj.town = value :
    (property == 'description') ? this.accountDetailsObj.bussinessDescription = value :
     this.accountDetailsObj.bussinessDescription = ""

  }
  onSaveData(){

    $(()=>{
     const blandNameVal = $('#blandName').val();
     if(blandNameVal =="" || blandNameVal.replace(/\s+/g, '').length < 2 || blandNameVal.length > 50){
      $('#blandName').addClass('danger-feild');
      this.formValidatorErrorHolder[0]="1 - 50 characters name required";
     }
     else{ this.formValidatorErrorHolder[0]=""}

     const email = $('#email').val();
     const validEmail:boolean = this.sharedMethodsService.validateEmail(email);
     if(email =="" || validEmail == false){
      $('#email').addClass('danger-feild');
      this.formValidatorErrorHolder[1]="Valid email is required";
     }  else{ this.formValidatorErrorHolder[1]=""}
     
     const district = $('#district').val();
     if(district =="" || district.replace(/\s+/g, '').length < 3 || district.length > 50){
      $('#district').addClass('danger-feild');
      this.formValidatorErrorHolder[2]="3 - 50 characters required";
     }  else{ this.formValidatorErrorHolder[2]=""}

      const sector = $('#sector').val();
     if(sector =="" || sector.replace(/\s+/g, '').length < 3 || sector.length > 50){
      $('#sector').addClass('danger-feild');
      this.formValidatorErrorHolder[3]="3 - 50 characters required";
     }  else{ this.formValidatorErrorHolder[3]=""}

     const town = $('#town').val();
     if(town =="" || town.replace(/\s+/g, '').length < 3 || town.length > 50){
      $('#town').addClass('danger-feild');
      this.formValidatorErrorHolder[4]="3 - 50 characters required";
     }  else{ this.formValidatorErrorHolder[4]=""}
  
    const contact = $('#contact').val();
    if((/\D/.test(contact))== true || contact.length != 10){
      $('#contact').addClass('danger-feild');
      this.formValidatorErrorHolder[5]="Valid 10 digits contact is required";
    }  else{ this.formValidatorErrorHolder[5]=""}


    const whatsapp = $('#whatsapp').val();
    if((/\D/.test(whatsapp))== true || whatsapp.length != 10){
      $('#whastapp').addClass('danger-feild');
      this.formValidatorErrorHolder[6]="Valid 10 digits whatsapp is required";
    }else{this.formValidatorErrorHolder[6]=""}

    const description = $('#description').val();
     if(description =="" || description.replace(/\s+/g, '').length < 10){
      $('#description').addClass('danger-feild');
      this.formValidatorErrorHolder[7]="More Bussiness description is required";
     }  else{ this.formValidatorErrorHolder[7]=""}
    
    
    setTimeout(()=>{
     if(this.formValidatorErrorHolder[0]=="" && this.formValidatorErrorHolder[1]==""&& this.formValidatorErrorHolder[2]==""&& this.formValidatorErrorHolder[3]==""  
     && this.formValidatorErrorHolder[4]==""  && this.formValidatorErrorHolder[5]==""  && this.formValidatorErrorHolder[6]==""  && this.formValidatorErrorHolder[7]==""){
      this.onUpdateData();
     }
    },500);
    })
   }
   resetField(filedName,fieldId){
     $(()=>{
       $(`#${filedName}`).removeClass('danger-feild');
       this.formValidatorErrorHolder[fieldId]="";
     })
   }

   onUpdateData(){
     this.authService.authenticateVendor().subscribe((res:any)=>{
       if(res.success == true){
            this.vendorService.updateSeller(res.sellerId,this.accountDetailsObj.blandName,this.accountDetailsObj.email,
            this.accountDetailsObj.country,this.accountDetailsObj.district,this.accountDetailsObj.sector,
            this.accountDetailsObj.town,this.accountDetailsObj.contactPhone,this.accountDetailsObj.whatsappPhone,
            this.accountDetailsObj.bussinessDescription).subscribe((result:any)=>{
              if(result.success == true){
                this.customerAccountComponent.subpageShow('profile');
                this.notificationService.showSuccess('You successfully updated account details','Data saved');
               }
              else{
              this.errorTitle="Update not successful";
              this.errorBody= result.message;
              this.triggerErrorModal('open');
              }
            })
       }
     })
   }
 triggerErrorModal(event){
   if(event == 'open'){
    $(()=>{
      $('#errorModal').fadeIn(500);
    })
   }
   else if(event == 'close'){
    $(()=>{
      $('#errorModal').fadeOut(500);
    })
   }
   window.onclick = (event) => {
   let errorModal = document.getElementById('errorModal');
   if (event.target == errorModal) {
      $(()=>{
        $('#errorModal').fadeIn(500);
      })
    }
  }
 }
 selectFile(event) {
  this.hasLogo = true;
  if(!event.target.files[0] || event.target.files[0].length == 0) {
    this.msg = 'You must select an image';
    return;
  }
  
  var mimeType = event.target.files[0].type;
  
  if (mimeType.match(/image\/*/) == null) {
    this.msg = "Only images are supported";
    return;
  }
  
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  
  reader.onload = (_event) => {
    this.msg = "";
    this.url = reader.result; 
  }
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.logoImage = file;
  }
 }
onChooseImage(){
   document.getElementById('logo-upload-input').click();
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

onSaveLogo(){
 this.vendorService.addSellerLogo(this.accountDetailsObj.sellerId,this.logoImage).subscribe((res:any)=>{
    if(res.success == true){
      this.notificationService.showSuccess("Account Logo updated","Logo saved");
      this.getAccountLogo();
      this.url="";
      this.customerAccountComponent.getAccountLogo();
    }
    else{
      this.notificationService.showError("There is an error try again","Logo not saved");
    }
  })
}

  ngOnInit() {
    this.getAccountDetails();
    this.getAccountLogo();
   }

}
