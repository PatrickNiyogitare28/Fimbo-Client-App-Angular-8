import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service'
import { ProductsService } from '../../../shared/products.service'

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
   collections = []
   errorMessage = "";
   updateCollectionErrorMessage="";
   updateCollectionId="";
   updatableCollectionName="";
   
   constructor(public displayService: DisplayService,public productService: ProductsService) { }
   
   addCollection(collection){
   
    if(!collection){
      this.errorMessage = "Collection name is required";
    }
    else{
       this.productService.addCollection(collection).subscribe((res:any)=>{
        if(res.success == true){
          this.ngOnInit();
         document.getElementById('close-collection-wrapper-btn').click();
        }
        else{
          this.errorMessage="Collection not created";
        }
       })
    }
  }
   resetError(){
    this.errorMessage="";
    this.updateCollectionErrorMessage="";
  }

//--------------------------------------------------update collection------------------------------------------
triggerUpdateCollection(collectionId){
  for(var i=0;i<this.collections.length;i++){
    if(this.collections[i].collectionId == collectionId){
       this.updatableCollectionName=this.collections[i].collectionName
       this.updateCollectionId =  collectionId
    }
  }
}

onChangeCollectionName(collectionName){
  if(!collectionName){
    this.updateCollectionErrorMessage="Collection Name is required";
  }
  else{
    this.updatableCollectionName=collectionName
    
  }
}

updateCollection(){
  if(this.updateCollectionErrorMessage == ""){
    this.productService.updateCollection(this.updateCollectionId,this.updatableCollectionName).subscribe((res:any)=>{
      if(res.success == true){
        this.ngOnInit();
        document.getElementById('update-collection-close-btn').click();
      }
    })
  }
 }

 deleteCollection(collectionId){
  this.productService.deleteCollection(collectionId).subscribe((res: any)=>{
    if(res.success==true){
      for(var i=0;i<this.collections.length;i++){
        var index=0;
        if(this.collections[i].collectionId == collectionId){
          index = i;
          this.collections.splice(index,1)
        }
      }
    }
  })
}

  ngOnInit() {
    for(var n=0;n<this.collections.length;n++){
      this.collections.splice(n);
    }
    //-----------------------------------get all collections----------------------------
    this.productService.getProductsCollections().subscribe((res:any)=>{
      for(let i=0;i<res.collections.length;i++){
          this.productService.getProductsByCollection(res.collections[i].collection_id).subscribe((result: any)=>{
             this.collections.push({
              collectionId : res.collections[i].collection_id,
              collectionName: res.collections[i].collection_name,
              productsIn: result.products.length
            })

           })
       }
    })
  }

}
