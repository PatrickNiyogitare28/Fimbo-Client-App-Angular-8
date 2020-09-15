import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service';
import { ProductsService } from '../../../shared/products.service'

@Component({
  selector: 'app-primary-slide',
  templateUrl: './primary-slide.component.html',
  styleUrls: ['./primary-slide.component.css']
})
export class PrimarySlideComponent implements OnInit {
  divisionsWithData=[];
  divOne = [];  divTwo = []; divThree=[];  divFour=[]; divFive=[];  divSix=[]; divSeven=[];  divEight=[];  divNine=[];  divTen=[];
  viewProductsArr=[]; productData=[];
  addProductMessage="";
  removeProductMessage="";
  currentDivision = 0;
  buttonsArr=[]
  changeStatusMessage=""
  constructor(public displayService: DisplayService, public productsService: ProductsService) { }

  triggerViewProducts(divisionArrName){
  //  this.addProductMessage=""; 
  this.removeProductMessage="";
  for(var index=0;index< this.viewProductsArr.length;index++){
     this.viewProductsArr.splice(index)
  }  
 
    if(divisionArrName=='divOne'){
      this.currentDivision = 1;
      for(var i=0;i<this.divOne.length;i++){
        this.viewProductsArr.push({
          productId: this.divOne[i].product_id,
          productName: this.divOne[i].product_name,
          productImage: this.divOne[i].product_image
        })
      }
    }
    else if(divisionArrName == 'divTwo'){
      this.currentDivision = 2;

      for(var i=0;i<this.divTwo.length;i++){
        this.viewProductsArr.push({
          productId: this.divTwo[i].product_id,
          productName: this.divTwo[i].product_name,
          productImage: this.divTwo[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divThree'){
      this.currentDivision = 3;

      for(var i=0;i<this.divThree.length;i++){
        this.viewProductsArr.push({
          productId: this.divThree[i].product_id,
          productName: this.divThree[i].product_name,
          productImage: this.divThree[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divFour'){
      this.currentDivision = 4;

      for(var i=0;i<this.divFour.length;i++){
        this.viewProductsArr.push({
          productId: this.divFour[i].product_id,
          productName: this.divFour[i].product_name,
          productImage: this.divFour[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divFive'){
      this.currentDivision = 5;

      for(var i=0;i<this.divFive.length;i++){
        this.viewProductsArr.push({
          productId: this.divFive[i].product_id,
          productName: this.divFive[i].product_name,
          productImage: this.divFive[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divSix'){
      this.currentDivision = 6;

      for(var i=0;i<this.divSix.length;i++){
        this.viewProductsArr.push({
          productId: this.divSix[i].product_id,
          productName: this.divSix[i].product_name,
          productImage: this.divSix[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divSeven'){
      this.currentDivision = 7;

      for(var i=0;i<this.divSeven.length;i++){
        this.viewProductsArr.push({
          productId: this.divSeven[i].product_id,
          productName: this.divSeven[i].product_name,
          productImage: this.divSeven[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divEight'){
      this.currentDivision = 8;

      for(var i=0;i<this.divEight.length;i++){
        this.viewProductsArr.push({
          productId: this.divEight[i].product_id,
          productName: this.divEight[i].product_name,
          productImage: this.divEight[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divNine'){
      this.currentDivision = 9;

      for(var i=0;i<this.divNine.length;i++){
        this.viewProductsArr.push({
          productId: this.divNine[i].product_id,
          productName: this.divNine[i].product_name,
          productImage: this.divNine[i].product_image

        })
      }
     
    }

    else if(divisionArrName == 'divTen'){
      this.currentDivision = 10;

      for(var i=0;i<this.divTen.length;i++){
        this.viewProductsArr.push({
          productId: this.divTen[i].product_id,
          productName: this.divTen[i].product_name,
          productImage: this.divTen[i].product_image

        })
      }
     
    }    
  }

  getCurrentDivision(division){
    this.addProductMessage="";
    this.currentDivision = division;
  }
 
  addProductInDivision(product){
   this.displayService.addProductInDivision(this.currentDivision,product).subscribe((res: any)=>{
      if(res.success == true){
        this.ngOnInit()
       }
       this.addProductMessage = res.message
          
    })
  }
  removeProductFromDiv(productId){
   this.displayService.removeProductInDiv(productId,this.currentDivision).subscribe((res:any)=>{
      if(res.success == true){
      this.removeProductMessage = res.message;
      this.ngOnInit()
      }
    })
  }
  
  callInit(){
   
  }

  updateTopDivisionStatus(division){
    
    var status = 0;
    if(this.buttonsArr[division-1] == "Hide"){
      status = 0
    }
    else if(this.buttonsArr[division - 1]== "Show"){
      status = 1
    }
    this.displayService.updateTopDivisionStatus(division,status).subscribe((res: any)=>{
     
      if(res.success == true){
        this.ngOnInit()
      }
      else if(res.success == false && res.status == 407){
        this.changeStatusMessage=res.message
        document.getElementById('triggerChangeStatusModal').click();
      }
    })
  }
  ngOnInit() {
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
    this.productData.splice(0,this.productData.length)

    this.divOne.push({
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
 this.productsService.getProducts().subscribe((res:any)=>{
  for(var i=0;i<res.product.length;i++){
    this.productsService.getProductData(res.product[i].product_id).subscribe((product:any)=>{
        this.productData.push({
        productId: product.productId,
        productName: product.productName,
        productSeller: product.productSeller,
        imageName: product.imageName,
       
       })
       
    })
  }
})

 //---------------------------------------END OF GETTING ALL PRODUCTS------------------------------------------


  //----------------------------------------------GETTING DISPLAY STATUS-----------------------------------------
  this.displayService.getTopSlideDivisions().subscribe((res: any)=>{
  
   for(var i=0;i<res.topDivisions.length;i++){
     if(res.topDivisions[i].division_id == 1){
       if(res.topDivisions[i].division_status == 1){
      
        this.buttonsArr.splice(0, 0, 'Hide')
       }
       else{
        this.buttonsArr.splice(0, 0, 'Show')
       }
     }
     else if(res.topDivisions[i].division_id == 2){
      
      if(res.topDivisions[i].division_status == 1){
       this.buttonsArr.splice(1, 0, 'Hide')
      }
      else{
       this.buttonsArr.splice(1, 0, 'Show')
      }
    }
    if(res.topDivisions[i].division_id == 3){
      if(res.topDivisions[i].division_status == 1){
       this.buttonsArr.splice(2, 0, 'Hide')
      }
      else{
       this.buttonsArr.splice(2, 0, 'Show')
      }
    }
    if(res.topDivisions[i].division_id == 4){
      if(res.topDivisions[i].division_status == 1){
       this.buttonsArr.splice(3, 0, 'Hide')
      }
      else{
       this.buttonsArr.splice(3, 0, 'Show')
      }
    }
    if(res.topDivisions[i].division_id == 5){
      if(res.topDivisions[i].division_status == 1){
       this.buttonsArr.splice(4, 0, 'Hide')
      }
      else{
       this.buttonsArr.splice(4, 0, 'Show')
      }
    }

    if(res.topDivisions[i].division_id == 6){
      if(res.topDivisions[i].division_status == 1){
       this.buttonsArr.splice(5, 0, 'Hide')
      }
      else{
       this.buttonsArr.splice(5, 0, 'Show')
      }
    }
    if(res.topDivisions[i].division_id == 7){
     if(res.topDivisions[i].division_status == 1){
      this.buttonsArr.splice(6, 0, 'Hide')
     }
     else{
      this.buttonsArr.splice(6, 0, 'Show')
     }
   }
   if(res.topDivisions[i].division_id == 8){
     if(res.topDivisions[i].division_status == 1){
      this.buttonsArr.splice(7, 0, 'Hide')
     }
     else{
      this.buttonsArr.splice(7, 0, 'Show')
     }
   }
   if(res.topDivisions[i].division_id == 9){
     if(res.topDivisions[i].division_status == 1){
      this.buttonsArr.splice(8, 0, 'Hide')
     }
     else{
      this.buttonsArr.splice(8, 0, 'Show')
     }
   }
   if(res.topDivisions[i].division_id == 10){
     if(res.topDivisions[i].division_status == 1){
      this.buttonsArr.splice(9, 0, 'Hide')
     }
     else{
      this.buttonsArr.splice(9, 0, 'Show')
     }
   }
   }
 }) 
}
}
