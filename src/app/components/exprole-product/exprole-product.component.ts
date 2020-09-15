import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/products.service'
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UsersService } from '../../shared/users.service'
import { AuthService } from '../../shared/auth.service';
import { NotificationService} from '../../shared/notification.service'
@Component({
  selector: 'app-exprole-product',
  templateUrl: './exprole-product.component.html',
  styleUrls: ['./exprole-product.component.css']
})
export class ExproleProductComponent implements OnInit {
  productData=[]; 
  productName=""; productId=""; markName=""; markId="";
  categoryName=""; categoryId="";
  collectionName=""; collectionId=""; sellerId=""; imageName="";
  sellerName=""; sellerCountry=""; sellerDistrict=""; sellerSector=""; sellerTown="";
  productPrice=""; usedStatus=""; details=""; sellerContact=""; sellerWastapp=""; productsRates=0;
  totalQuantity =1; relatedProducts=[];
  constructor(private route: ActivatedRoute, private router: Router,public productsService: ProductsService,
    public usersService: UsersService, public authService: AuthService, public notification: NotificationService) { }

  updateQuantity(value){
   if(value == 1){
     this.totalQuantity = this.totalQuantity+1;
   }
   else if(value == 0){
     if(this.totalQuantity > 1){
       this.totalQuantity = this.totalQuantity-1;
     }
   }
  }

  triggerGetItModal(){
    document.getElementById('getItBtn').click();
  }

  pushProductData(product){
    this.relatedProducts.push({
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
  }

  likeProduct(productId){
    for(let i =0; i<this.relatedProducts.length;i++){
      if(this.relatedProducts[i].productId == productId){
       
       if(this.relatedProducts[i].rateStatusImage != 'loved-heart-icon.png'){
         this.productsService.rateProduct(productId).subscribe((res:any)=>{
           if(res.success == true){
             this.relatedProducts[i].rateStatusImage = 'loved-heart-icon.png'
            }
         }) 
       } 
      else if(this.relatedProducts[i].rateStatusImage !='un-loved-heart-icon.png'){
        this.productsService.unrateProduct(productId).subscribe((res:any)=>{
          if(res.success == true){
             this.relatedProducts[i].rateStatusImage = 'un-loved-heart-icon.png'
          }
        })
      }
     }
    }
   }
   exproleProduct(productId){
     this.getProductData(productId);
     this.getProductRates(productId)
     this.getRelatedProductsByCollection(productId);
     this.totalQuantity=1;
     let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 5);
   }
   getProductRates(product){
    this.productsService.getProductRates(product).subscribe((res: any)=>{
      this.productsRates = res.rates
    })
   }
  
   getProductData(productId){
    this.productsService.getProductData(productId).subscribe((product:any)=>{
      this.productId = product.productId;
      this.productName = product.productName;
      this.categoryName = product.productCategory;
      this.categoryId =  product.categoryId;
      this.collectionName = product.productCollection;
      this.collectionId = product.collectionId;
      this.markName = product.productMark;
      this.markId = product.markId;
      this.sellerName = product.productSeller;
      this.sellerId = product.sellerId;
      this.sellerWastapp = product.sellerWatsapp;
      this.sellerContact  = product.sellerContact;
      this.sellerCountry = product.sellerCountry;
      this.sellerDistrict = product.sellerDistrict;
      this.sellerSector = product.sellerSector;
      this.sellerTown = product.sellerTown;
      this.productPrice = product.price;
      this.imageName = product.imageName;
      this.usedStatus = product.usedStatus;
      this.details = product.details;
  })
   }

  getRelatedProductsByCollection(productId){
   this.relatedProducts.splice(0,this.relatedProducts.length) 
//-----------------------------getting related products-----------------------
this.productsService.getRelatedCollectionProducts(productId).subscribe((res: any)=>{
  if(res.length > 0){
    for(var i=0;i<res.products.length;i++){
     this.productsService.getProductData(res.products[i].product_id).subscribe((product:any)=>{
       this.pushProductData(product);
      })
    }
 }
})
  } 

addToCart(){
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
         this.productsService.addToCart(res.userId,this.productId,this.totalQuantity,formatedDate,formatedTime).subscribe((response: any)=>{
            console.log("res"+JSON.stringify(response))
          if(response.success == true){
             this.notification.showSuccess(this.productName+' added to Cart','Cart Success')
            }
            else if(response.status== 208 && response.success == false){
            this.notification.showError(this.productName+' already in cart. But you can add quantity','Cart not success')
            }
         })
       }  
      
       else{
       }
     })
  }
}  
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

getProductModal(){
  var getItModal = document.getElementById("getItModal");
  // var getItBtn = document.getElementById("getItBtn");
  var spanCloseGetItModal = document.getElementById("closeGetIt");
 
    getItModal.style.display = "block";
  
  spanCloseGetItModal.onclick = function() {
    getItModal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == getItModal) {
      getItModal.style.display = "none";
    }
  }
}
  ngOnInit() {
    //-------------triggering get product modal-----------------------
    // var getItModal = document.getElementById("getItModal");
    // var getItBtn = document.getElementById("getItBtn");
    // var spanCloseGetItModal = document.getElementById("closeGetIt");
    // getItBtn.onclick = function() {
    //   getItModal.style.display = "block";
    // }
    // spanCloseGetItModal.onclick = function() {
    //   getItModal.style.display = "none";
    // }
    // window.onclick = function(event) {
    //   if (event.target == getItModal) {
    //     getItModal.style.display = "none";
    //   }
    // }
//----------------------end of get product modal------------------------
    const productId = this.route.snapshot.params.productId;
    sessionStorage.setItem('currentPage','exprole-product/'+productId);

  this.getProductData(productId);  
  this.getProductRates(productId)
  this.getRelatedProductsByCollection(productId)
  }
}
