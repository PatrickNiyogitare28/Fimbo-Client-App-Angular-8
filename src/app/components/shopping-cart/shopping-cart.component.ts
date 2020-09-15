import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductsService } from '../../shared/products.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
productsInCart = []
cartEmpty = false;
  constructor(public authSerivice: AuthService,public productsService: ProductsService) { }
  
  addInCart(product,quantity){
    var newPrice = product.price * quantity;
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
      price: newPrice,
      imageName: product.imageName,
      usedStatus: product.usedStatus,
      details: product.details,
     })
  }
  getCustomerCart(){
   this.authSerivice.authenticateUser().subscribe((res:any)=>{
     if(res.success == true){
       this.productsService.getCart(res.userId).subscribe((response: any)=>{
         if(response.success == true && response.cartSize == 0 ){
          this.cartEmpty == true
         }
         else if(response.success == true && response.cartSize > 0){
           for(var i =0; i < response.cart.length;i++){
              this.productsService.getProductData(response.cart.product).subscribe((prod:any)=>{
                this.addInCart(prod.product,response.cart.quantity);
              })
           }
         }
       })
     }
     
   })
  }
  ngOnInit() {
  }

}
