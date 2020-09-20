import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

import { DisplayService } from '../../shared/display.service'
import { ProductsService } from '../../shared/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NotificationService } from '../../shared/notification.service'
import { AuthService } from '../../shared/auth.service'
import { OrdersService } from '../../shared/orders.service'
// import { ScrollTopService } from  '../../shared/scroll-top-service.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
   displayDivisions = [];
   divOne=[];divTwo=[]; divThree=[]; divFour=[]; divFive=[]; 
   divSix=[]; divSeven=[]; divEight=[]; divNine=[];divTen=[];
   featuredProducts=[];
   featuredSpecificCategoProducts=[];
   categories=[];
   selected = 'option2';
   currentCategory='all';


   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
     
    },
    nav: true
  }

   constructor(public displayService: DisplayService,public productsService: ProductsService,public router: Router,
    public route: ActivatedRoute, public notification: NotificationService,public authService: AuthService,private ordersSer: OrdersService) { }


  getDivisions(){
   
  }
  showDiv(){
    document.getElementById('hidden-div').removeAttribute('hidden')
  }

  //--------------------------------------------------get all featured products-------------------------------------------
  getAllCategoriesProducts(){
    this.changeNavigationActive('all-category-featured-prod-nav')

    document.getElementById('car-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('motorcycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('bicycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('oils-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');

    
  this.featuredProducts.splice(0, this.featuredProducts.length)

    this.productsService.getProducts().subscribe((res:any)=>{
      for(var i=0;i<12;i++){
        this.productsService.getProductData(res.product[i].product_id).subscribe((product:any)=>{
            this.featuredProducts.push({
            productId: product.productId,
            productName: product.productName,
            productCategory: product.productCategory,
            categoryId: product.categoryId,
            productCollection: product.productCollection,
            collectionId: product.collectionId,
            productMark: product.productMark,
            markId: product.markId,
            productSeller: product.productSeller,
            sellerId: product.sellerId,
            sellerWatsapp: product.sellerWatsapp,
            sellerContact: product.sellerContact,
            sellerCountry: product.sellerCountry,
            sellerDistrict: product.sellerDistrict,
            sellerSector: product.sellerSector,
            sellerTown: product.sellerTown,
            price: product.price,
            imageName: product.imageName,
            usedStatus: product.usedStatus,
            details: product.details,
            rateStatusImage: 'un-loved-heart-icon.png'

           })
           
        })
      }
    })
    
  }
  //--------------------------------------------------------end getting all featured products-----------------------------
  
  //------------------------------------------------------getting the products in car category----------------------------
getProductsByCategory(categoryName){
 if(categoryName == "all"){
   this.getAllCategoriesProducts()
   this.currentCategory='all'
 }
 else{
  this.featuredProducts.splice(0, this.featuredProducts.length);
   var category = 0;
  for(var i=0;i<this.categories.length;i++){
    if(this.categories[i].categoryName == categoryName){
      category = this.categories[i].categoryId;
    }
  }  
  this.productsService.getProductsByCategory(category).subscribe((res:any)=>{
    for(var i=0;i<res.product.length;i++){
      this.productsService.getProductData(res.product[i].product_id).subscribe((product:any)=>{
          this.featuredProducts.push({
          productId: product.productId,
          productName: product.productName,
          productCategory: product.productCategory,
          categoryId: product.categoryId,
          productCollection: product.productCollection,
          collectionId: product.collectionId,
          productMark: product.productMark,
          markId: product.markId,
          productSeller: product.productSeller,
          sellerId: product.sellerId,
          sellerWatsapp: product.sellerWatsapp,
          sellerContact: product.sellerContact,
          sellerCountry: product.sellerCountry,
          sellerDistrict: product.sellerDistrict,
          sellerSector: product.sellerSector,
          sellerTown: product.sellerTown,
          price: product.price,
          imageName: product.imageName,
          usedStatus: product.usedStatus,
          details: product.details,
          rateStatusImage: 'un-loved-heart-icon.png'
         })
         
      })
    }
  })
  if(categoryName=="Cars"){
    this.currentCategory='Cars'
    this.changeNavigationActive('car-category-featured-prod-nav')
    document.getElementById('all-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('motorcycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('bicycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('oils-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
  }
  else if(categoryName=="Motorcycles"){
    this.currentCategory='Motorcycles'
    this.changeNavigationActive('motorcycles-category-featured-prod-nav')
    document.getElementById('all-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('car-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('bicycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('oils-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
  }
  else if(categoryName=="Bicycles"){
    this.currentCategory='Bicycles'
    this.changeNavigationActive('bicycles-category-featured-prod-nav')
    document.getElementById('all-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('car-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('motorcycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('oils-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
  }
  else if(categoryName=="Oils"){
    this.currentCategory="Oils"
    this.changeNavigationActive('oils-category-featured-prod-nav')
    document.getElementById('all-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('car-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('motorcycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
    document.getElementById('bicycles-category-featured-prod-nav').classList.remove('active-featured-pro-nav-link');
  }
 } 
}
changeNavigationActive(navId){
  document.getElementById(`${navId}`).classList.toggle('active-featured-pro-nav-link');

}
likeProduct(productId){
 for(let i =0; i<this.featuredProducts.length;i++){
   if(this.featuredProducts[i].productId == productId){
    
    if(this.featuredProducts[i].rateStatusImage != 'loved-heart-icon.png'){
      this.productsService.rateProduct(productId).subscribe((res:any)=>{
        if(res.success == true){
          this.featuredProducts[i].rateStatusImage = 'loved-heart-icon.png'
         }
      }) 
    } 
   else if(this.featuredProducts[i].rateStatusImage !='un-loved-heart-icon.png'){
     this.productsService.unrateProduct(productId).subscribe((res:any)=>{
       if(res.success == true){
          this.featuredProducts[i].rateStatusImage = 'un-loved-heart-icon.png'
       }
     })
   }
  }
 }
}

setRouterCollection(){
  document.getElementById('shopNowRouterBtn').click();
}
goRoute(){
  this.router.navigate(['products','all'])

}
addToCart(productId,productName){
  const token = sessionStorage.getItem('token');
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate(); 
  let hour = date.getHours();
  let min = date.getMinutes();
  var formatMath = month+1;
  var formatedDate = day+'-'+formatMath+'-'+year;
  var formatedTime = hour+':'+min
  if(!token){
    this.errorModalTrigger()
  }
  else{
     this.authService.authenticateUser().subscribe((res: any)=>{
       console.log("Response: "+res)
       if(res.success == true){
         this.productsService.addToCart(res.userId,productId,1,formatedDate,formatedTime).subscribe((response: any)=>{
            console.log("res"+JSON.stringify(response))
          if(response.success == true){
             this.notification.showSuccess(productName+' added to Cart','Cart Success')
            }
            else if(response.status== 208 && response.success == false){
            this.notification.showError(productName+' already in cart. But you can add quantity','Cart not success')
            }
         })
       }  
      
       else{
       }
     })
  }
}  
// check(){
//   alert("Me one")
//   this.ordersSer.CreateOrderImage();
// }
errorModalTrigger(){
    var errorModal = document.getElementById("notLoggedInErrorModal");
    var spanCloseGetItModal = document.getElementById("error-modal-close");
    errorModal.style.display = "block";
    
    spanCloseGetItModal.onclick = function() {
      errorModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == errorModal) {
        errorModal.style.display = "none";
      }
    }
}

  ngOnInit() {
    // this.scrollTopService.setScrollTop();
    sessionStorage.setItem('displayHeaders','displayHeaders');
    sessionStorage.setItem('currentPage','index');
   //----------------------------------------------division initial states-------------------------------------
   this.divOne.splice(0, this.divOne.length)
    this.divTwo.splice(0, this.divTwo.length)
    this.divThree.splice(0, this.divThree.length)
    this.divFour.splice(0, this.divFour.length)
    this.divFive.splice(0, this.divFive.length)
    this.divSix.splice(0, this.divSix.length)
    this.divSeven.splice(0, this.divSeven.length)
    this.divEight.splice(0, this.divEight.length)
    this.divNine.splice(0, this.divNine.length)
    this.divTen.splice(0, this.divTen.length)
    
    this.divOne.push({
      itemId:0,
      division_id: 1,
      division_name: "divOne",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"
     
    })
    this.divTwo.push({

      division_id: 2,
      division_name: "divTwo",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divThree.push({

      division_id: 3,
      division_name: "divThree",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divFour.push({

      division_id: 4,
      division_name: "divFour",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divFive.push({

      division_id: 5,
      division_name: "divFive",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divSix.push({

      division_id: 6,
      division_name: "divSix",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divSeven.push({

      division_id: 7,
      division_name: "divSeven",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })

     this.divEight.push({

      division_id: 8,
      division_name: "divEight",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })

     this.divNine.push({

      division_id: 9,
      division_name: "divNine",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     })
     this.divTen.push({

      division_id: 10,
      division_name: "divTen",
      display_status: 0,
      productsIn: 0,
      product_id: "NOT DEFINED",
      product_name: "NOT DEFINED",
      product_image: "NOT_DEFINED.png"

     }) 
  //------------------------------------------getting primary divs form server------------------------------  
  this.displayService.getTopSlideDivisions().subscribe((res: any)=>{
    for(var i =0; i< res.topDivisions.length;i++){
      this.displayDivisions.push(res.topDivisions[i]);
    }
    console.log(this.displayDivisions.length+" "+res.topDivisions.length)
    localStorage.setItem('topDivisions',JSON.stringify(this.displayDivisions))
   })

 //-----------------------------------------------getting products in divs------------------------------------
 this.displayService.getTopSlideDivisions().subscribe((devision: any)=>{
  for(var i=0;i<devision.topDivisions.length;i++){
     this.displayService.getDivisionsWithProducts(devision.topDivisions[i].division_id).subscribe((res: any)=>{
      for(var k=0;k<res.contents.length;k++){
       
       this.productsService.getProductData(res.contents[k].product).subscribe((proData: any)=>{
        if(res.division_id == 1){
           if(res.found > 0){
             for(var i=0;i<this.divOne.length;i++){
               var index;
               if(this.divOne[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divOne.splice(index,1)
               }
              }

             this.divOne.push({
               itemId : 0,
               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName
              })
           }
          
         }

         if(res.division_id == 2){
           if(res.found > 0){
             for(var i=0;i<this.divTwo.length;i++){
               var index;
               if(this.divTwo[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divTwo.splice(index,1)
               }
              }
             this.divTwo.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
         
         }
         else if(res.division_id == 3){
           if(res.found > 0){
             for(var i=0;i<this.divThree.length;i++){
               var index;
               if(this.divThree[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divThree.splice(index,1)
               }
              }
             this.divThree.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
       
         }
         else if(res.division_id == 4){
           if(res.found > 0){
             for(var i=0;i<this.divFour.length;i++){
               var index;
               if(this.divFour[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divFour.splice(index,1)
               }
              }
             this.divFour.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
             }
           }
           
         else if(res.division_id == 5){
           if(res.found > 0){
             for(var i=0;i<this.divFive.length;i++){
               var index;
               if(this.divFive[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divFive.splice(index,1)
               }
              }
             this.divFive.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
           
         }
         
         else if(res.division_id == 6){
           if(res.found > 0){
             for(var i=0;i<this.divSix.length;i++){
               var index;
               if(this.divSix[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divSix.splice(index,1)
               }
              }
             this.divSix.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
         
         }
         else if(res.division_id == 7){
           if(res.found > 0){
             for(var i=0;i<this.divSeven.length;i++){
               var index;
               if(this.divSeven[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divSeven.splice(index,1)
               }
              }
             this.divSeven.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
       
         }
         else if(res.division_id == 8){
           if(res.found > 0){
             for(var i=0;i<this.divEight.length;i++){
               var index;
               if(this.divEight[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divEight.splice(index,1)
               }
              }
             this.divEight.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
           
         }
         else if(res.division_id == 9){
           if(res.found > 0){
             for(var i=0;i<this.divNine.length;i++){
               var index;
               if(this.divNine[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divNine.splice(index,1)
               }
              }
             this.divNine.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
         
         }
         else if(res.division_id == 10){
           if(res.found > 0){
             for(var i=0;i<this.divTen.length;i++){
               var index;
               if(this.divTen[i].product_id=='NOT DEFINED'){
                 index=i;
                  this.divTen.splice(index,1)
               }
              }
             this.divTen.push({

               division_id: res.division_id,
               division_name: res.division_name,
               display_status: res.division_status,
               productsIn: res.contents.length,
               product_id: proData.productId,
               product_name: proData.productName,
               product_image: proData.imageName

              })
           }
          
         }

           
         })
        }
           
       //  }
      })
   }
   
})

//-------------------------------------GETTING ALL PRODUCTS---------------------------------------------------

//------------------------------------- Getting featured products *all----------------------------------------
this.getAllCategoriesProducts()

//-------------------------------------------getting all Categories from the Server----------------------------
this.categories.splice(0, this.categories.length)

this.productsService.getProductsCategories().subscribe((res:any)=>{
  for(let i=0;i<res.categories.length;i++){
      this.productsService.getProductsByCategories(res.categories[i].category_id).subscribe((result: any)=>{
        this.categories.push({
          categoryId : res.categories[i].category_id,
          categoryName: res.categories[i].category_name,
          productsIn: result.products.length
        })

       })
   }
})
document.getElementById('all-category-featured-prod-nav').classList.toggle('active-featured-pro-nav-link');
//------------------------------adding the product Item id---------------------------------
for(var i=0;i<this.divOne.length;i++){
  this.divOne[i].itemId = i+1;
 
}

}
}
