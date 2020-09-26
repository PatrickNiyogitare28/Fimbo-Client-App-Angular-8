import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
 
  productsSellerURL = 'http://localhost:3000/api/productsSellers';
  constructor(private http: HttpClient) { }

  registerSeller(sellerName,country,district,sector,town,contact,whatsapp,email,description){
    
    const body = {
      seller_name: sellerName,
      seller_country: country,
      seller_district: district,
      seller_sector: sector,
      seller_town: town,
      seller_contact_phone: contact,
      seller_watsapp_phone: whatsapp,
      seller_email:email,
      bussiness_description: description
    }
    return this.http.post(`${this.productsSellerURL}/newSeller`,body)
  }
  addSellerLogo(sellerId,logoImage){
    const formData = new FormData();
    formData.append('file',logoImage);
     return this.http.post(`${this.productsSellerURL}/addSellerLogo`,formData,{headers: new HttpHeaders().set('seller-id',sellerId)})
   }
   emailVerification(sellerId,code){
     const body = {
      seller_id: sellerId,
      verificationCode: code
     }
     return this.http.post(`${this.productsSellerURL}/activateSellerAccount`,body)
   }

   createSellerPassword(sellerId, password){
     const body = {
       sellerId:  sellerId,
       password: password
     }
     return this.http.post(`${this.productsSellerURL}/addSellerPassoword`,body)
   }

   resendEmailVerificationCode(sellerId){
    const body={
      sellerId: sellerId
    }
    return this.http.post(`${this.productsSellerURL}/resendVerificationCode`,body)
   }

   vendorLogin(phone,password){
     const body = {
       phone: phone,
       password: password
     }
     return this.http.post(`${this.productsSellerURL}/vendor/login`,body)
   }

  updateSeller(sellerId,blandName,email,country,district,sector,town,contact,whatsapp,description){
    const body = {
        seller_name: blandName,
        seller_watsapp_phone: whatsapp,
        seller_contact_phone : contact,
        seller_country : country,
        seller_district : district,
        seller_sector : sector,
        seller_email: email,
        seller_town: town,
        bussiness_description: description
    }
    const token = sessionStorage.getItem('token');
    return this.http.put(`${this.productsSellerURL}/updateSeller/${sellerId}`,body,{headers: new HttpHeaders()
    .set('x-auth-token',token)});
  }
  getVendorInfo(vendorId){
   return  this.http.get(`${this.productsSellerURL}/sellerInfo/${vendorId}`)
  }
}
