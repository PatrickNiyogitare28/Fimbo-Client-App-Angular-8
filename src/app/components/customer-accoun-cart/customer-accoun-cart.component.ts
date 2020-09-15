import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductsService } from '../../shared/products.service';
import { NotificationService } from '../../shared/notification.service'
import { LocationsService } from '../../shared/locations.service'
@Component({
  selector: 'app-customer-accoun-cart',
  templateUrl: './customer-accoun-cart.component.html',
  styleUrls: ['./customer-accoun-cart.component.css','../customer-account/customer-account.component.css']
})
export class CustomerAccounCartComponent implements OnInit {
  productsInCart = []
  quantities = [];
  cartEmpty = false;
  updatedQuantityState = false;
  totalProducts = 0;
  totalPrice = 0; sellerName=""; sellerWatsapp=""; sellerContact=""; 
  sellerCountry=""; sellerDistrict = ""; sellerSector=""; sellerTown="";
  prodId = ""; prodName=""; userFirstname="";

  constructor(public authSerivice: AuthService,public productsService: ProductsService, public notificationService: NotificationService
    , public locationsService: LocationsService) { }

    triggerProccedToCheckOut(){
      var checkProModal = document.getElementById("checkOutCartModal");
      checkProModal.style.display = "block";
     
      window.onclick = function(event) {
        if (event.target == checkProModal) {
          checkProModal.style.display = "none";
        }
      }
      }

      addInCart(product,quantity){
        var totalPrice = product.price * quantity;
        this.productsInCart.push({
          productId: product.productId,
          productName: product.productName,
          productSeller: product.productSeller,
          sellerId: product.sellerId,
          sellerWatsapp: product.sellerWatsapp,
          sellerContact: product.sellerContact,
          sellerCountry: product.sellerCountry,
          sellerDistrict: product.sellerDistrict,
          sellerSector: product.sellerSector,
          sellerTown: product.sellerTown,
          price: totalPrice,
          imageName: product.imageName,
          quantity: quantity,
          usedStatus: product.usedStatus,
          details: product.details,
         
         })
         this.getTotalProducts()
      }

      getCustomerCart(){
    
        this.authSerivice.authenticateUser().subscribe((res:any)=>{
          if(res.success == true){
            this.productsService.getCart(res.userId).subscribe((response: any)=>{
              if(response.success == true && response.cartSize == 0 ){
               this.cartEmpty =true
              
              }
              else if(response.success == true && response.cartSize > 0){
               this.cartEmpty = false
                for(let i =0; i < response.cart.length;i++){
                   // this.quantities.push(response.cart[i].quantity)
                   this.productsService.getProductData(response.cart[i].product).subscribe((prod:any)=>{
                    this.addInCart(prod,response.cart[i].quantity);
                   })
                }
              }
            })
          }
          
        })
       } 
     
       changeQuantity(productId,value){

        if(value == 1){
         for(var i=0;i<this.productsInCart.length;i++){
           if(this.productsInCart[i].productId == productId){
             this.productsInCart[i].quantity+=1;
             this.updateQuantity(this.productsInCart[i].productId,this.productsInCart[i].quantity);
              if(this.updatedQuantityState ==  true){
                this.productsInCart[i].price = ((this.productsInCart[i].price / (this.productsInCart[i].quantity - 1)) * this.productsInCart[i].quantity);
             }
           }
         }
        } 
        else if(value == -1){
         for(var i=0;i<this.productsInCart.length;i++){
           if(this.productsInCart[i].productId == productId){
             if( this.productsInCart[i].quantity > 1){
               this.productsInCart[i].quantity-=1;
                this.updateQuantity(this.productsInCart[i].productId,this.productsInCart[i].quantity);
                if(this.updatedQuantityState ==  true){
                 this.productsInCart[i].price = ((this.productsInCart[i].price / (this.productsInCart[i].quantity + 1)) * this.productsInCart[i].quantity);
                 this.getTotalProducts();  
               }
             }
             else{
                this.notificationService.showInfo('The minimum quantity is 1','Decreasing Quantity')
             }
             
           }
         }
        }
        
       }

       updateQuantity(product,quantity):any{
        this.authSerivice.authenticateUser().subscribe((res:any)=>{
          if(res.success == true ){
             this.productsService.updateProductQuantityInCart(res.userId,product,quantity).subscribe((result: any)=>{
               if(result.success == true){
               this.updatedQuantityState = true
               this.getTotalProducts();
               }
             })
          }
        })
       }
     
       removeFromCart(productId,productName){
        this.authSerivice.authenticateUser().subscribe((res:any)=>{
          if(res.success == true){
            this.productsService.removeProductFromCart(res.userId,productId).subscribe((result:any)=>{
            if(result.success == true){
                for(let i =0; i<this.productsInCart.length;i++){
                  if(this.productsInCart[i].productId == productId){
                    this.productsInCart.splice(i,1);
                    this.notificationService.showSuccess(productName+" is removed from Cart","Remove Success")
                    this.getTotalProducts();
                  }
                }
                if(this.productsInCart.length==0){
                  this.cartEmpty = true;
                }
              }
            })
          }
        })
      }

      getTotalProducts(){
        this.totalProducts =  this.productsInCart.length;
        this.totalPrice = 0;
        for(let i=0;i<this.productsInCart.length;i++){
          this.totalPrice+=this.productsInCart[i].price;
        }
       }
       checkProductOutModal(productId){
        for(let i = 0;i < this.productsInCart.length;i++){
           if(this.productsInCart[i].productId == productId){
               this.prodId = productId;
               this.prodName = this.productsInCart[i].productName;
               this.sellerName = this.productsInCart[i].sellerName;
               this.sellerWatsapp = this.productsInCart[i].sellerWatsapp;
               this.sellerContact = this.productsInCart[i].sellerContact;
               this.sellerCountry = this.productsInCart[i].sellerCountry;
               this.sellerDistrict = this.productsInCart[i].sellerDistrict;
               this.sellerSector = this.productsInCart[i].sellerSector;
               this.sellerTown = this.productsInCart[i].sellerTown;
           }
        }
     
         var checkProModal = document.getElementById("checkProModal");
         checkProModal.style.display = "block";
        
         window.onclick = function(event) {
           if (event.target == checkProModal) {
             checkProModal.style.display = "none";
           }
         }
       }

       closeProCheckModal(value){
        if(value == 1){
          this.closeTheModal();
         }
         else if(value == 2){
           this.closeTheModal();
         }
         else if(value == 3){
           this.removeFromCart(this.prodId, this.prodName)
           this.closeTheModal();
         }
       }

       closeTheModal(){
        document.getElementById("checkProModal").style.display="none";
        var checkProModal = document.getElementById("checkOutCartModal");
        checkProModal.style.display = "none";
       }
       fentchUserData(){
       this.authSerivice.authenticateUser().subscribe((res: any)=>{
         if(res.success == true){
           this.userFirstname = res.firstname;
         }
       })
       }

  ngOnInit() {
    this.getCustomerCart()
    this.fentchUserData()
  }

}
