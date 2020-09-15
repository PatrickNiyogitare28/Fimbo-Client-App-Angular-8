import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service'
import { ProductsService } from '../../../shared/products.service'
import { NotificationService } from '../../../shared/notification.service'

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
 sellers = []
 //updatable previous behavious
 updatableSellerName="";
 updatableSellerId="";
 updatableSellerWatsapp="";
 updatableSellerContact="";
 updatableSellerEmail="";
 updatableSellerCountry="";
 updatableSellerDistrict="";
 updatableSellerSector="";
 updatableSellerTown="";
 updateSellerErrorMessage=""; 
 currentFieldWithError="";

 //add new seller behavious
 addSellerErrorMessage="";
 sellerName="";
 sellerEmail="";
 sellerWatsapp="";
 sellerContact="";
 sellerCountry="";
 sellerDistrict="";
 sellerSector="";
 sellerTown="";

 constructor(public displayService: DisplayService,public productsService: ProductsService,
  private notificationService: NotificationService) { }

  triggerUpdateSellerForm(sellerId){
    if(this.currentFieldWithError != ""){
      this.resetField(this.currentFieldWithError);
    }
    for(var i=0;i<this.sellers.length;i++){
      if(this.sellers[i].sellerId == sellerId){
          this.updatableSellerId= sellerId;
          this.updatableSellerName=this.sellers[i].sellerName;
          this.updatableSellerEmail = this.sellers[i].sellerEmail;
          this.updatableSellerWatsapp = this.sellers[i].watsapp;
          this.updatableSellerContact = this.sellers[i].contact;
          this.updatableSellerCountry = this.sellers[i].country;
          this.updatableSellerDistrict = this.sellers[i].district;
          this.updatableSellerSector = this.sellers[i].sector;
          this.updatableSellerTown = this.sellers[i].town;
      }
    }
  }

  onChangeGetData(fieldName,newValue){
 
if(newValue == ""){
  this.makeFieldDanger(fieldName)
}
else if(fieldName=="updateBlandName"){
  this.updatableSellerName = newValue
}
else if(fieldName=="updateEmail"){
  this.updatableSellerEmail = newValue
}
else if(fieldName=="updateWatsapp"){
  this.updatableSellerWatsapp = newValue
}
else if(fieldName=="updateContact"){
  this.updatableSellerContact = newValue
}
else if(fieldName=="updateCountry"){
  this.updatableSellerCountry = newValue
}
else if(fieldName=="updateDistrict"){
  this.updatableSellerDistrict = newValue
}
else if(fieldName=="updateSector"){
  this.updatableSellerSector = newValue
}
else if(fieldName=="updateTown"){
  this.updatableSellerTown = newValue
}

else if(fieldName=="blandName"){
  this.sellerName = newValue
}
else if(fieldName=="email"){
  this.sellerEmail = newValue
}
else if(fieldName=="watsapp"){
  this.sellerWatsapp = newValue
}
else if(fieldName=="contact"){
  this.sellerContact = newValue
}
else if(fieldName=="country"){
  this.sellerCountry = newValue
}
else if(fieldName=="district"){
  this.sellerDistrict = newValue
}
else if(fieldName=="sector"){
  this.sellerSector = newValue
}
else if(fieldName=="town"){
  this.sellerTown = newValue
}
} 

makeFieldDanger(fieldName){
  this.currentFieldWithError=fieldName;
  document.getElementById(`${fieldName}`).classList.toggle('danger-update-field')
  if(fieldName == "userId"){
    this.updateSellerErrorMessage="User Id is required";
  }
  if(fieldName=="updateBlandName"){
    this.updateSellerErrorMessage = "Bland/Seller name is required"
  }
  else if(fieldName=="updateEmail"){
    this.updateSellerErrorMessage = "Email is required"
  }
  else if(fieldName=="updateWatsapp"){
    this.updateSellerErrorMessage = "Watsapp number is required"
  }
  else if(fieldName=="updateContact"){
    this.updateSellerErrorMessage = "Contact number is required"
  }
  else if(fieldName=="updateCountry"){
    this.updateSellerErrorMessage = "Workshop country is required"
  }
  else if(fieldName=="updateDistrict"){
    this.updateSellerErrorMessage = "Workshop District name is required"
  }
  else if(fieldName=="updateSector"){
    this.updateSellerErrorMessage = "Workshop sector is required"
  }
  else if(fieldName=="updateTown"){
    this.updateSellerErrorMessage = "Workshop town is required"
  }
  else if(fieldName=="blandName"){
    this.addSellerErrorMessage = "Bland/Seller name is required"
  }
  else if(fieldName=="email"){
    this.addSellerErrorMessage = "Email is required"
  }
  else if(fieldName=="watsapp"){
    this.addSellerErrorMessage = "Watsapp number is required"
  }
  else if(fieldName=="contact"){
    this.addSellerErrorMessage = "Contact number is required"
  }
  else if(fieldName=="country"){
    this.addSellerErrorMessage = "Workshop country is required"
  }
  else if(fieldName=="district"){
    this.addSellerErrorMessage = "Workshop District name is required"
  }
  else if(fieldName=="sector"){
    this.addSellerErrorMessage = "Workshop sector is required"
  }
  else if(fieldName=="town"){
    this.addSellerErrorMessage = "Workshop town is required"
  }
}

resetField(fieldName){
  document.getElementById(fieldName).classList.remove('danger-update-field');
  if(fieldName==this.currentFieldWithError){
  this.updateSellerErrorMessage="";
  this.addSellerErrorMessage="";
   }
   
}

updateSeller(){
  if(this.updateSellerErrorMessage == ""){
    this.productsService.updateSeller(this.updatableSellerId,this.updatableSellerName,this.updatableSellerEmail,this.updatableSellerWatsapp
      ,this.updatableSellerContact,this.updatableSellerCountry,this.updatableSellerDistrict,this.updatableSellerSector,this.updatableSellerTown)
      .subscribe((res: any)=>{
        if(res.success== true){
          this.ngOnInit();
          document.getElementById('closeUpdateModalButton').click();
        }
        else{
          this.updateSellerErrorMessage="User not updated check error";
          this.notificationService.showError(res.message,'Error Occured')
        }
      })
   }
 }

 addSeller(sellerId){
   if(sellerId == ""){
     this.makeFieldDanger('userId')
   }
   if(this.sellerName == ""){
    this.makeFieldDanger('blandName')
   }
   else if(this.sellerEmail==""){
     this.makeFieldDanger('email');
   }
   else if(this.sellerWatsapp==""){
    this.makeFieldDanger('watsapp');
  }
  else if(this.sellerContact==""){
    this.makeFieldDanger('contact');
  }
  else if(this.sellerCountry==""){
    this.makeFieldDanger('country');
  }
  else if(this.sellerDistrict==""){
    this.makeFieldDanger('district');
  }
  else if(this.sellerSector==""){
    this.makeFieldDanger('sector');
  }
  else if(this.sellerTown==""){
    this.makeFieldDanger('town');
  }
  else{
    //sellerName,email,watsapp,contact,country,district,sector,town
     this.productsService.addSeller(sellerId,this.sellerName,this.sellerEmail,this.sellerWatsapp,
      this.sellerContact,this.sellerCountry,this.sellerDistrict,this.sellerSector,this.sellerTown).subscribe((res: any)=>{
       alert(JSON.stringify(res))
        if(res.success==true){
          this.notificationService.showSuccess('An new Seller created successfully','Adding new seller')
          this.ngOnInit();
          document.getElementById("close-add-seller-btn").click();
        }
        else{
          this.addSellerErrorMessage=res.message
        }
      })
  }
 }
  
 deleteSeller(sellerId){
  this.productsService.deleteSeller(sellerId).subscribe((res: any)=>{
    if(res.success==true){
      for(var i=0;i<this.sellers.length;i++){
        var index=0;
        if(this.sellers[i].sellerId == sellerId){
          index = i;
          this.sellers.splice(index,1)
        }
      }
    }
  })
}
triggerNewSellerModal(){
 var userIdWrapper = document.getElementById('userId')
 userIdWrapper.setAttribute('value','')
 userIdWrapper.removeAttribute('disabled')
}
  ngOnInit() {
    for(var n=0;n<this.sellers.length;n++){
      this.sellers.splice(n);
    }
     //-----------------------------------get all collections----------------------------
     this.productsService.getProductsSellers().subscribe((res:any)=>{
      for(let i=0;i<res.sellers.length;i++){
          this.productsService.getProductsBySellers(res.sellers[i].seller_id).subscribe((result: any)=>{
             this.sellers.push({
              sellerId : res.sellers[i].seller_id,
              sellerName: res.sellers[i].seller_name,
              sellerEmail: res.sellers[i].seller_email,
              watsapp: res.sellers[i].seller_watsapp_phone,
              contact: res.sellers[i].seller_contact_phone,
              country: res.sellers[i].seller_country,
              district: res.sellers[i].seller_district,
              sector: res.sellers[i].seller_sector,
              town: res.sellers[i].seller_town,

              totalProducts: result.products.length
            })

           })
       }
    })
  }

}
