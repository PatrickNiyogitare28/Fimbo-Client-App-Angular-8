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
  
   featuredProducts=[];
   featuredSpecificCategoProducts=[];
   categories=[];
   selected = 'option2';
   currentCategory='all';

    secondaryCarsoulCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
 
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      990: {
        items: 4
      }
     
    }
   
  }

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

triggerTypeWritter(){
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 5) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
}

  ngOnInit() {
    // this.scrollTopService.setScrollTop();
    this.triggerTypeWritter();
    sessionStorage.setItem('displayHeaders','displayHeaders');
    sessionStorage.setItem('currentPage','index');
   //----------------------------------------------division initial states-------------------------------------
   

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

}
}
