import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/products.service'
// import { ScrollTopService } from  '../../shared/scroll-top-service.service';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  collections=[]
  featuredProducts=[];
  currentCategory="";
  categories=[];

  constructor(public router: Router, public route: ActivatedRoute,public productsService: ProductsService
    ) { }
  
  getSortCollection(collection){

    this.productsService.getProductsByCollection(collection).subscribe((res: any)=>{
    this.featuredProducts.splice(0, this.featuredProducts.length)
      
      for(var i=0;i<res.products.length;i++){
        this.productsService.getProductData(res.products[i].product_id).subscribe((product:any)=>{

        this.pushProductData(product);
        })
      }
    })
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
      for(var i=0;i<res.product.length;i++){
        this.productsService.getProductData(res.product[i].product_id).subscribe((product:any)=>{
        this.pushProductData(product);
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
        this.pushProductData(product);
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

pushProductData(product){
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

  ngOnInit() {
    sessionStorage.setItem('displayHeaders','displayHeaders')
    const category = this.route.snapshot.params.category;
    sessionStorage.setItem('currentPage','products/'+category);
    console.log("The page.."+sessionStorage.getItem('currentPage'))

    //-----------------------getting the collections
    for(var n=0;n<this.collections.length;n++){
      this.collections.splice(n);
    }
    //-----------------------------------get all collections----------------------------
    this.productsService.getProductsCollections().subscribe((res:any)=>{
      for(let i=0;i<res.collections.length;i++){
          this.productsService.getProductsByCollection(res.collections[i].collection_id).subscribe((result: any)=>{
             this.collections.push({
              collectionId : res.collections[i].collection_id,
              collectionName: res.collections[i].collection_name,
              productsIn: result.products.length
            })
         })
       }
    })

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

  }

}
