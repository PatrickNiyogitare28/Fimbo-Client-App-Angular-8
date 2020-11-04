import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  topDisplayDivisionsURL = 'http://localhost:3000/api/topDisplayDivisions';
  secondarySliderURL = 'http://localhost:3000/api/secondarySlider';

  constructor(public http: HttpClient) { }

  get displayHeaders(): boolean {
  
    let displayHeaders = sessionStorage.getItem('displayHeaders');
    return (displayHeaders !== null) ? true : false;
  }

  //-----------------------------ADMIN DISPLAY PAGE SESSIONS------------------------------------------
  get adminDisplayProduct():boolean{
   let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
   return (adminDisplayPage == 'adminProducts') ? true : false
  }

  get adminDisplayCategories():boolean{
   let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
   return (adminDisplayPage == 'adminCategories') ? true : false
  }

  get adminDisplayCollections():boolean{
    let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
    return (adminDisplayPage == 'adminCollections') ? true : false
   }

   get adminDisplayMarks():boolean{
    let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
    return (adminDisplayPage == 'adminMarks') ? true : false
   }

   get adminDisplaySellers():boolean{
    let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
    return (adminDisplayPage == 'adminSellers') ? true : false
   }

   get adminDisplayUsers():boolean{
    let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
    return (adminDisplayPage == 'adminUsers') ? true : false
   }

   get adminDisplayPrimarySlide():boolean{
    let adminDisplayPage = sessionStorage.getItem('adminDisplayPage')
    return (adminDisplayPage == 'primarySlide') ? true : false
   }

  //------------------------------END OF ADMON DISPLYA PAGE SESSIONS------------------------------------

  //----------------------------------GETTING THE TOP SLIDE DIVISIONS-------------------------------------
  getTopSlideDivisions(){
  // const token = sessionStorage.getItem('token')
  return this.http.get(`${this.topDisplayDivisionsURL}/set`)
  }

  //----------------------------------GETTING DIVISIONS WITH PRODUCTS-------------------------------------
  getDivisionsWithProducts(division){
   const token = sessionStorage.getItem('token')
    return this.http.get(`${this.topDisplayDivisionsURL}/withProducts/${division}`)
  }

  addProductInDivision(division,product){
    const data={
      division: division,
      product: product
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.topDisplayDivisionsURL}/set/`,data,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  removeProductInDiv(productId,divId){
    const token = sessionStorage.getItem('token')
    return this.http.delete(`${this.topDisplayDivisionsURL}/removeProduct/${productId}/${divId}`,{headers: new HttpHeaders()
    .set('x-auth-token',token)})
  }

  updateTopDivisionStatus(division,status){
    const token = sessionStorage.getItem('token');
    const body={
      status_id: status
    }
    return this.http.put(`${this.topDisplayDivisionsURL}/changeStatus/${division}`,body,{headers: new HttpHeaders()
    .set('x-auth-token',token)})
  }

  //------------------------------------------------top slide display divisions-------------------------------
  get displayTopDivOne():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[0].division_status == 1) ? true : false
  }
  //--------------------------------------------------------second division------------------------------------
  get displayTopDivTwo():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[1].division_status == 1) ? true : false
  }
  //--------------------------------------------------------Third division------------------------------------
  get displayTopDivThree():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[2].division_status == 1) ? true : false
  }
  //--------------------------------------------------------Fouth division------------------------------------
  get displayTopDivFour():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[3].division_status == 1) ? true : false
  }
   //--------------------------------------------------------Fiveth division------------------------------------
   get displayTopDivFive():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[4].division_status == 1) ? true : false
  }
  //--------------------------------------------------------Sixith division------------------------------------
  get displayTopDivSix():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[5].division_status == 1) ? true : false
  }
   //--------------------------------------------------------Seventth division------------------------------------
   get displayTopDivSeven():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[6].division_status == 1) ? true : false
  }
   //--------------------------------------------------------Eighth division------------------------------------
   get displayTopDivEight():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[7].division_status == 1) ? true : false
  }
   //--------------------------------------------------------Nineth division------------------------------------
   get displayTopDivNine():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[8].division_status == 1) ? true : false
  }
   //--------------------------------------------------------Sixith division------------------------------------
   get displayTopDivTen():boolean{
    var retrievedDivisions = localStorage.getItem('topDivisions')
    var divisions = JSON.parse(retrievedDivisions)
     return (divisions[9].division_status == 1) ? true : false
  }

    
 fetchSecondarySliderProducts(){
   return this.http.get(`${this.secondarySliderURL}/getProducts`)
 }

 addSecondarySliderProduct(productId:boolean){
   
   return this.http.post(`${this.secondarySliderURL}/addProduct/product/${productId}`,null);
 }
}

