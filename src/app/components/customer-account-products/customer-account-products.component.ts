import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/products.service';
import { AuthService } from '../../shared/auth.service'
import { NotificationService } from '../../shared/notification.service'
import {ToastrService} from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-customer-account-products',
  templateUrl: './customer-account-products.component.html',
  styleUrls: ['./customer-account-products.component.css']
})
export class CustomerAccountProductsComponent implements OnInit {
  proName=""; productCategory=""; productCollection=""; productMark="";
  productPrice=0; productDetails=""; fieldsErrorHolder=[]; updatableProductId="";
  newProduct = false;
  productImage;
  msg="";toastRef;
  categories=[]; collections=[];marks=[];
  vendorProducts=[];
  usedStatus = "New";
  searchQuery = "";
  vendorProductsOriginalHolder=[];
  constructor(private productService: ProductsService,private authService: AuthService,
    private notificationService: NotificationService,private toastr: ToastrService) { }
  
  getSellerProducts(sellerId){
     this.productService.getProductsBySellers(sellerId).subscribe((prod: any)=>{
     for(let i= 0; i<prod.products.length;i++){
         this.productService.getProductData(prod.products[i].product_id).subscribe((productDetails: any)=>{
           if(productDetails.success == true){
          }
         })
       }
     })
  }
  triggerExploreProduct(task,productId){
     this.resetField('all')
    if(task=="addProduct"){
      this.clearInputs();
      this.newProduct=true;
    }
    else if(task=="explore"){
      this.productImage="";
      this.updatableProductId=productId;
      this.exploreProduct(productId);
      this.newProduct=false;
      
    }
    for(let i=1;i<=6;i++){
      this.fieldsErrorHolder.push("");
    }
    var checkProModal = document.getElementById("exploreProductModal");
    checkProModal.style.display = "block";
   
    window.onclick = function(event) {
      if (event.target == checkProModal) {
        checkProModal.style.display = "none";
      }
    }
    }
    closeModal(){
      document.getElementById("exploreProductModal").style.display="none";
    }
    onUpdateProduct(column,value){
       if(column == "productName"){
          this.proName= value;
        }else if(column == "category"){
          this.productCategory=value
        }else if(column == "collection"){
         this.productCollection=value
        }else if(column == "mark"){
          this.productMark=value
        }else if(column == "price"){
          this.productPrice=value
        }else if(column == "details"){
          this.productDetails=value
        }
    }
    onSaveData(){
      let noSpaceProductName = this.proName.replace(/\s+/g, '').length;
      let noSpaceDetails = this.productDetails.replace(/\s+/g, '').length;
      if(noSpaceProductName == 0 || this.proName == ""){
        this.makeFieldDanger('productName')
        this.fieldsErrorHolder[1]="Product name is required";
      }
      else if(this.proName.length > 50){
      this.makeFieldDanger('productName')
      this.fieldsErrorHolder[1]="Product name should have less 50 char";
      }
      if(this.productPrice == 0){
        this.makeFieldDanger('price')
        this.fieldsErrorHolder[5]="Price is reqired";
      }
      if(noSpaceDetails == 0){
       this.makeFieldDanger('details')
        this.fieldsErrorHolder[6]="Details are reqired"
      }
      if((this.productImage == null || this.productImage=="") && this.newProduct == true){
        this.msg = "Please product image is requreid";
        this.makeFieldDanger('productImage')
        
      }
      
      if(this.newProduct == false){
        if(this.fieldsErrorHolder[1]=="" && this.fieldsErrorHolder[5]=="" && this.fieldsErrorHolder[6]=="" && this.msg == ""){
          this.authService.authenticateVendor().subscribe((vendor:any)=>{
            if(vendor.success == true){
              this.productService.updateProduct(this.updatableProductId,this.proName,this.productCategory,this.productCollection,
                this.productMark,this.productPrice,this.usedStatus,this.productDetails,vendor.sellerId).subscribe((result:any)=>{
                  if(result.success == true){
                   if(this.productImage != ""){
                     this.productService.addProductImage(this.updatableProductId,this.productImage)
                     .subscribe((imageSaved:any)=>{
                      if(imageSaved.success != true){
                          this.notificationService.showError(imageSaved.message,"Image not updated")
                       }  
                     })
                   } 
                   this.notificationService.showSuccess('Product Data updated','Saving Data');
                  this.getVendorProducts();
                 }
                })
            }
          })
        }
      }
      else if(this.newProduct == true){
        if(this.fieldsErrorHolder[1]=="" && this.fieldsErrorHolder[5]=="" && this.fieldsErrorHolder[6]==""
        && this.msg == ""){
         this.authService.authenticateVendor().subscribe((vendor:any)=>{
             if(vendor.success == true){
                this.productService.addProduct(this.proName,vendor.sellerId,this.productCategory,
                  this.productCollection,this.productMark,this.productDetails,this.productPrice,this.usedStatus)
                  .subscribe((res:any)=>{
                    if(res.success == true){
                      this.productService.addProductImage(res.productId,this.productImage).subscribe((result:any)=>{
                        if(result.success == true){
                          this.showSuccessToast("Remaining "+res.remainingProducts+" to reach your plan maximum.","Product created",'success');
                          this.clearInputs();
                          this.getVendorProducts();
                        }
                         else{
                          this.showSuccessToast(res.message,"Error, Product not created",'error');
                         }
                      })
                    }
                    else{
                      this.showSuccessToast(res.message,"Error, Product not created",'error');

                   }
                  })
               }
           })
        }
      }
   }
  makeFieldDanger(filedName){
    $(()=>{
      $(`#${filedName}`).addClass('danger-field');
    })
  }
    showSuccessToast=(message, title,event)=>{
      if(event == 'success'){
        this.toastRef =  this.toastr.success(message, title,{
          disableTimeOut:true
        })
      }
      else if(event == 'error'){
        this.toastRef =  this.toastr.error(message, title,{
          disableTimeOut:true
        })
      }
     
    }
    removeToast = () =>{
      this.toastr.clear(this.toastRef.ToastId);
    }
    resetField(fieldName){
      if(fieldName == 'proName'){
        this.fieldsErrorHolder[1]="";
        document.getElementById('productName').classList.remove('danger-field')
      }
      else if(fieldName == 'price'){
        this.fieldsErrorHolder[5]="";
        document.getElementById(fieldName).classList.remove('danger-field')
      }
      else if(fieldName == 'details'){
        this.fieldsErrorHolder[6]="";
        document.getElementById(fieldName).classList.remove('danger-field')
      }
      else if(fieldName=="all"){
        for(let i=1; i<=7; i++){
            this.fieldsErrorHolder[i]="";
        }
        document.getElementById('productName').classList.remove('danger-field')
        document.getElementById('price').classList.remove('danger-field')
        document.getElementById('details').classList.remove('danger-field')
      }
    }
    selectFile(event) {
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
      }
      if(event.target.files.length > 0){
        document.getElementById('productImage').classList.remove('danger-field');
        this.msg = "";
        const file = event.target.files[0];
        this.productImage = file;
      }
     }
     getCategories(){
       this.productService.getProductsCategories().subscribe((res:any)=>{
       res.categories.forEach(category => {
         this.categories.push({
           categoryId: category.category_id,
           categoryName: category.category_name
         })
       });
       //default category
       this.productCategory = this.categories[0].categoryId
      })
    }
  getCollections(){
        this.productService.getProductsCollections().subscribe((res:any)=>{
         res.collections.forEach(collection =>{
            this.collections.push({
              collectionId: collection.collection_id,
              collectionName: collection.collection_name
            })
         });
         //default collection
        this.productCollection = this.collections[0].collectionId
        })
      }
  getMarks(){
    this.productService.getProductsMarks().subscribe((res:any)=>{
    res.marks.forEach(mark =>{
        this.marks.push({
          markId: mark.mark_id,
          markName: mark.mark_name
        })
      });
      //default mark
      this.productMark = this.marks[0].markId
    })
  }     
  clearInputs(){
    $(()=>{
     $('#productName').val('');
     $('#category').val(this.categories[0].categoryId);
     $('#collection').val(this.collections[0].collectionId);
     $('#mark').val(this.marks[0].markId);
     $('#price').val(0);
     $('#details').val("");
     $('#productImage').val("");
     this.productImage="";
     this.proName="";
     this.productDetails="";
     this.productPrice=0;
     
    })
  }   
  onCheckRadio(value){
    if(value == 1){
      this.usedStatus = "New"
    }
    else if(value == 2){
      this.usedStatus = "Not New";
    }
  } 
  getVendorProducts(){
   this.authService.authenticateVendor().subscribe((vendor:any)=>{
   if(vendor.success==true){
    this.productService.getProductsBySellers(vendor.sellerId).subscribe((result:any)=>{
         this.vendorProducts.splice(0, this.vendorProducts.length)
          result.products.forEach(product =>{
             this.vendorProducts.push({
              productId:product.product_id,
              productName: product.prod_name,
              categoryId: product.prod_category,
              categoryName: this.extractCategoryName(product.prod_category),
              collectionId: product.prod_collection,
              collectionName: this.extractCollectionName(product.prod_collection),
              markId: product.prod_mark,
              markName: this.extractMarkName(product.prod_mark),
              productImage: product.image_name,
              price: product.price,
              details: product.details,
              usedStatus: product.usedStatus
             })
          })
          this.vendorProductsOriginalHolder=this.vendorProducts.slice(0);
         
        })
      }
    })
  }
  
  extractCategoryName(categoryId){
    this.categories.find(category => {
      if(category.categoryId == categoryId){
        return category.categoryName;
      }
    })
  }
  extractCollectionName(collectionId){
    this.collections.find(collection => {
      if(collection.collectionId == collectionId){
        return collection.collectionName;
      }
    })
  }
  extractMarkName(markId){
    this.marks.find(mark => {
      if(mark.markId == markId){
        return mark.markName;
      }
    })
  }
  exploreProduct(productId){
    this.vendorProducts.find(product =>{
      if(product.productId == productId){
        this.proName = product.productName,
        this.productPrice = product.price,
        this.productDetails = product.details
        $(()=>{
          $('#category').val(product.categoryId)
          $('#collection').val(product.collectionId)
          $('#mark').val(product.markId)
        })
        if(product.usedStatus == "Not New"){
          document.getElementById('notNew').click();
        }
      }
    })
  }
  onDeleteProduct(){
   var index =  this.vendorProductsOriginalHolder.findIndex(product =>{
      return product.productId == this.updatableProductId;
    })
    this.productService.delteProduct(this.updatableProductId).subscribe((res:any)=>{
      if(res.success == true){
        document.getElementById('spanClosecheckProModal').click();
        this.vendorProductsOriginalHolder.splice(index,1);
        this.vendorProducts=this.vendorProductsOriginalHolder.slice(0);
       this.notificationService.showSuccess('You permanentely deteted it',`${res.productName} deleteds`);
       $(()=> $('#search').val(""))
      }
    })
  }
  onFilterProducts(query){
    this.searchQuery = query;
    let querySize = this.searchQuery.replace(/\s+/g, '').length;
    if(querySize != 0){
      this.vendorProducts.splice(0, this.vendorProducts.length);
       this.vendorProductsOriginalHolder.forEach(product =>{
        if(product.productName.toUpperCase().indexOf(this.searchQuery.toUpperCase()) > -1){
            this.vendorProducts.push({
            productId:product.productId,
            productName: product.productName,
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            collectionId: product.collectionId,
            collectionName: product.collectionName,
            markId: product.markId,
            markName: product.markName,
            productImage: product.productImage,
            price: product.price,
            details: product.details,
            usedStatus: product.usedStatus
           })
         }
       })
    }else{
      this.vendorProducts = this.vendorProductsOriginalHolder.slice(0);
    }
  }
  ngOnInit() {
    this.authService.authenticateUser().subscribe((res:any)=>{
      if(res.success==true){
        this.getSellerProducts(res.userId)
      }
    })
    this.getCategories();
    this.getCollections();
    this.getMarks();
    this.getVendorProducts();
  }

}
