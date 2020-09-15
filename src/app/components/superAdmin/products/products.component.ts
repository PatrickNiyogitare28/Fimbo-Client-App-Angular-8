import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service';
import { ProductsService } from '../../../shared/products.service'
import { SuccessProductAddedComponent } from '../entryComponents/success-product-added/success-product-added.component'
import { MatDialog} from '@angular/material' 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productData = [];
  productCategories = [];
  productCollections = [];
  productMarks = [];
  productSellers = [];
  productImage;
  chackValue=1;
  errorMessage="";
  updateErrorMessage="";
  productNameControlValue = 1;
  updateImageMessage=""

  //updatable behavious
  updatableProductId = ""
  updatableProductName="";
  updatableProductPrice="";
  updatableProductDetail="";
  updatableCategoryId = "";
  updatableCollectionId = "";
  updatableMarkId = "";
  updatableSellerId = "";
  updatableImageName = "";
  updatableUsedStatus = "";
  currentCategoryName="";
  currentCollectionName="";
  currentMarkName="";
  currentSellerName="";
  currentImageName="";
  newProductImage="";
  selectImageUpdateGap=0

  
  constructor(public displayService: DisplayService,public productService: ProductsService,public dialog: MatDialog) { }

  displayProductOptions(option){
    let productsContainer =  document.getElementById('products-container');
    let addProductContainer = document.getElementById('add-product-container');
    let optionOneNav = document.getElementById('productOption')
    let optionTwoNav = document.getElementById('addProductOption')
    if(option == 1){
       productsContainer.removeAttribute('hidden');
       addProductContainer.setAttribute('hidden','true')
       optionOneNav.classList.toggle('product-nav-link-active')
       optionTwoNav.classList.remove('product-nav-link-active');

    }
    else if(option == 2){
      addProductContainer.removeAttribute('hidden');
      productsContainer.setAttribute('hidden','true')
      optionTwoNav.classList.toggle('product-nav-link-active')
      optionOneNav.classList.remove('product-nav-link-active');
    }
  }

  selectImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productImage = file;
    
    }
  } 
  selectUpdateImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newProductImage = file;
      this.selectImageUpdateGap =1
    
    }
  }

  checkedRadio(value){
    this.chackValue = value;
  }

  addProduct(productName,seller,category,collection,mark,detail,price){
     let nameField = document.getElementById('productName');
     let nonSpaceName = []
     let nonspacePrice = []
     //--------------------------------------removing spaces from namefield-----------------------------
     for(var i=0;i<productName.length;i++){
      if(productName[i] != " "){
        nonSpaceName.push(productName[i]);
         }
      } 
    //---------------------------------------varidating the namespace-----------------------------------
    if(nonSpaceName.length == 0){
      this.controlField('productName');
      return this.errorMessage = "Product name required"
    }
    else if(nonSpaceName.length < 2 || nonSpaceName.length > 20){
      this.controlField('productName');
      return (nonSpaceName.length < 2) ? this.errorMessage="Product name requires more than 1 characters" : (nonSpaceName.length > 15) ? this.errorMessage = "Product name requires not more than 25 charactes" : this.errorMessage = "";
      
    } 

    //--------------------------------removing spaces from price---------------------------------------
    for(var i=0;i<price.length;i++){
      if(price[i] != " "){
        nonspacePrice.push(price[i]);
         }
      } 
    
    //---------------------------------------varidating the productPrice-----------------------------------
    if(nonspacePrice.length == 0){
      this.controlField('productPrice');
      return this.errorMessage = "Product price required"
    }
    else if(nonspacePrice.length < 1 || nonspacePrice.length > 20){
      this.controlField('productPrice');
      return (nonspacePrice.length < 1) ? this.errorMessage="Product price can not have 0 digits" : (nonspacePrice.length > 15) ? this.errorMessage = "Product price requires not more than 20 digits" : this.errorMessage = "";
      
    }   


     let usedStatus="";
     if(this.chackValue == 1){
       usedStatus="New"
     }
     else if(this.chackValue == 2){
       usedStatus="Not New"
     }
     else{
       this.errorMessage ="Error occured, product not added try again";
     }
   
    this.productService.addProduct(productName,seller,category,collection,mark,detail,price,usedStatus).subscribe((res:any)=>{
      this.productService.addProductImage(res.productId,this.productImage).subscribe((result: any)=>{
        if(result.success == true){
          // this.dialog.open(SuccessProductAddedComponent);
          this.ngOnInit();
          this.displayProductOptions(1)
        }
      })
    })
  }

  controlField(fieldName){
    let field = document.getElementById(fieldName);
       field.classList.toggle('filed-warning')
    }

  resetField(fieldName){
    this.errorMessage = "";
    this.updateErrorMessage="";
    document.getElementById('update-message').classList.remove('on-success-update')
    document.getElementById(fieldName).classList.remove('filed-warning')
  }

  //------------------------------------------------UPDATING THE PRODUCT----------------------------------------
  triggerUpdateForm(productId){
    for(var i=0;i<this.productData.length;i++){
        if(this.productData[i].productId == productId){
           this.updatableProductId = productId
           this.updatableProductName=this.productData[i].productName,
           this.updatableProductPrice = this.productData[i].price,
           this.updatableProductDetail = this.productData[i].details,
           this.updatableCategoryId = this.productData[i].categoryId,
           this.updatableCollectionId = this.productData[i].collectionId,
           this.updatableMarkId = this.productData[i].markId,
           this.updatableSellerId = this.productData[i].sellerId,
           this.updatableImageName = this.productData[i].imageName,
           this.updatableUsedStatus = this.productData[i].usedStatus,
           this.currentCategoryName = this.productData[i].productCategory,
           this.currentCollectionName = this.productData[i].productCollection,
           this.currentMarkName = this.productData[i].productMark
           this.currentSellerName = this.productData[i].productSeller,
           this.currentImageName =  this.productData[i].imageName,
           this.updateImageMessage="";
           this.updateErrorMessage="";
        }
    }
  }

  //------------------------------------------on field changes update behaviour----------------------------------
  onChangeProduct(attribute,value){
    if(attribute=="name"){
      if(value == ""){
        this.updateErrorMessage="Product name required";
        document.getElementById('updateProductName').classList.toggle('filed-warning');
      }
      else{
      this.updatableProductName = value;
     }
    }
    else if(attribute == "category"){
      this.updatableCategoryId = value
    }
    else if(attribute == "collection"){
      this.updatableCollectionId = value
    }
    else if(attribute == "mark"){
      this.updatableMarkId = value
    }
    else if(attribute == "price"){
      if(value == ""){
        this.updateErrorMessage = "Price is required";
        document.getElementById('updateProductPrice').classList.toggle('filed-warning')
      }
      this.updatableProductPrice = value
    }
    else if(attribute == "detail"){
      this.updatableProductDetail = value
    }
    else if(attribute == "seller"){
      this.updatableSellerId = value
    }
    else if(attribute == "usedStatus"){
      this.updatableUsedStatus = value
    }

  }

  //--------------------------------method to update product--------------------------------------------------
  updateProduct(){
    this.productService.updateProduct(this.updatableProductId,this.updatableProductName,this.updatableCategoryId,this.updatableCollectionId,
      this.updatableMarkId,this.updatableProductPrice,this.updatableUsedStatus,this.updatableProductDetail,this.updatableSellerId).subscribe((res:any)=>{
        if(res.success==true){
          this.ngOnInit()
          this.updateErrorMessage="Product updated successfully";
          document.getElementById('update-message').classList.toggle('on-success-update')
        }
      })
  }
 
  updateProductImage(){
    
    if(this.selectImageUpdateGap != 0){
      this.productService.updateProductImage(this.updatableProductId,this.newProductImage).subscribe((result: any)=>{
        if(result.success == true){
          this.ngOnInit();
           this.updateImageMessage="Image Updated successflly";
        }
      })
    }
    else{
      this.updateImageMessage ="Image update not successful";
    }
    
  }
  //-------------------------------------------------END OF PRODUCT UPDATING-------------------------------------
  
//----------------------------------------------------deleting the product-------------------------------------
deleteProduct(productId){
  this.productService.delteProduct(productId).subscribe((res: any)=>{
    if(res.success ==  true){
      for(var i=0;i<this.productData.length;i++){
          var index=0;
          if(this.productData[i].productId == productId){
            index = i;
            this.productData.splice(index,1)
          }
      }
    }
  })
}


ngOnInit() {
  for(var n=0;n<this.productData.length;n++){
    this.productData.splice(n)
 }
 for(var n=0;n<this.productCategories.length;n++){
  this.productCategories.splice(n)
}
for(var n=0;n<this.productCollections.length;n++){
  this.productCollections.splice(n)
}
for(var n=0;n<this.productCategories.length;n++){
  this.productCategories.splice(n)
}
for(var n=0;n<this.productMarks.length;n++){
  this.productMarks.splice(n)
}
for(var n=0;n<this.productSellers.length;n++){
  this.productSellers.splice(n)
}


    this.productService.getProducts().subscribe((res:any)=>{
      for(var i=0;i<res.product.length;i++){
        this.productService.getProductData(res.product[i].product_id).subscribe((product:any)=>{
            this.productData.push({
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
            details: product.details
           })
           
        })
      }
   })

 //--------------------------------------------GETTING THE PRODUCTS CATEGORIES-------------------------------------
  this.productService.getProductsCategories().subscribe((res:any)=>{
  
    for(var i=0;i<res.categories.length;i++){
      this.productCategories.push({
        categoryId: res.categories[i].category_id,
        categoryName: res.categories[i].category_name
      })
    }
})

//---------------------------------------GETTTING THE PRODUCTS COLLECTIONS----------------------------------------
this.productService.getProductsCollections().subscribe((res:any)=>{
   for(var i=0;i<res.collections.length;i++){
     this.productCollections.push({
       collectionId: res.collections[i].collection_id,
       collectionName: res.collections[i].collection_name
     })
   }
})

//--------------------------------------GETTING THE PRODUCTS MARKKS-----------------------------------------------
this.productService.getProductsMarks().subscribe((res:any)=>{
  for(var i=0;i<res.marks.length;i++){
  this.productMarks.push({
      markId: res.marks[i].mark_id,
      markName: res.marks[i].mark_name
    })
  }
})

//---------------------------------------GETTING THE PRODUCT SELLERS----------------------------------------------
this.productService.getProductsSellers().subscribe((res:any)=>{
  for(var i=0;i<res.sellers.length;i++){
   this.productSellers.push({
      sellerId: res.sellers[i].seller_id,
      sellerName: res.sellers[i].seller_name
    })
  }
})
}

}
