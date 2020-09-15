import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service'
import { ProductsService } from '../../../shared/products.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = []
  errorMessage = "";
  updateCategoryErrorMessage="";
  updateCategoryId="";
  updatableCategoryName="";
  constructor(public displayService: DisplayService,public productsService: ProductsService) { }

  

  addCategory(category){
   
    if(!category){
      this.errorMessage = "Category is required";
    }
    else{
       this.productsService.addCategory(category).subscribe((res:any)=>{
        if(res.success == true){
          this.ngOnInit();
          document.getElementById('close-category-wrapper-btn').click();
        }
        else{
          this.errorMessage="Category not created";
        }
       })
    }
  }
  resetError(){
    this.errorMessage="";
    this.updateCategoryErrorMessage="";
    
  }

  //--------------------------------------------------update category------------------------------------------
  triggerUpdateCategory(categoryId){
    for(var i=0;i<this.categories.length;i++){
      if(this.categories[i].categoryId == categoryId){
         this.updatableCategoryName=this.categories[i].categoryName
         this.updateCategoryId =  categoryId
      }
    }
  }

  onChangeCategoryname(categoryName){
    if(!categoryName){
      this.updateCategoryErrorMessage="Category Name is required";
    }
    else{
      this.updatableCategoryName=categoryName
      
    }
  }

  updateCategory(){
    if(this.updateCategoryErrorMessage == ""){
      this.productsService.updateCategory(this.updateCategoryId,this.updatableCategoryName).subscribe((res:any)=>{
        if(res.success == true){
          this.ngOnInit();
          document.getElementById('update-category-close-btn').click();
        }
      })
   }
  }


  deleteCategory(categoryId){
    this.productsService.delteCategory(categoryId).subscribe((res: any)=>{
      if(res.success==true){
        for(var i=0;i<this.categories.length;i++){
          var index=0;
          if(this.categories[i].categoryId == categoryId){
            index = i;
            this.categories.splice(index,1)
          }
        }
      }
    })
  }
  ngOnInit() {
    for(var n=0;n<this.categories.length;n++){
      this.categories.splice(n);
    }

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
  }
}
