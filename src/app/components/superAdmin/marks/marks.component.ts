import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service'
import { ProductsService } from '../../../shared/products.service'
// import { join } from 'path';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  marks = []
  errorMessage = "";
  updateMarkErrorMessage="";
  updateMarkId="";
  updatableMarkName="";

  constructor(public displayService: DisplayService,public productsService: ProductsService) { }
  
  addMark(mark){
   
    if(!mark){
      this.errorMessage = "Mark name is required";
    }
    else{
       this.productsService.addMark(mark).subscribe((res:any)=>{
        if(res.success == true){
          this.ngOnInit();
         document.getElementById('close-mark-wrapper-btn').click();
        }
        else{
          this.errorMessage="Mark not created";
        }
       })
    }
  }
   resetError(){
    this.errorMessage="";
    this.updateMarkErrorMessage="";
  }

//--------------------------------------------------update mark------------------------------------------
triggerUpdateMark(markId){
  for(var i=0;i<this.marks.length;i++){
    if(this.marks[i].markId == markId){
       this.updatableMarkName=this.marks[i].markName
       this.updateMarkId =  markId
    }
  }
}

onChangeMarkName(markName){
  if(!markName){
    this.updateMarkErrorMessage="Mark Name is required";
  }
  else{
    this.updatableMarkName=markName
    
  }
}

updateMark(){
  if(this.updateMarkErrorMessage == ""){
    this.productsService.updateMark(this.updateMarkId,this.updatableMarkName).subscribe((res:any)=>{
      if(res.success == true){
        this.ngOnInit();
        document.getElementById('update-mark-close-btn').click();
      }
    })
  }
 }

 deleteMark(markId){
  this.productsService.deleteMark(markId).subscribe((res: any)=>{
    if(res.success==true){
      for(var i=0;i<this.marks.length;i++){
        var index=0;
        if(this.marks[i].markId == markId){
          index = i;
          this.marks.splice(index,1)
        }
      }
    }
  })
 }

  ngOnInit() {
    for(var n=0;n<this.marks.length;n++){
      this.marks.splice(n);
    }
    //-----------------------------------get all marks----------------------------
    this.productsService.getProductsMarks().subscribe((res:any)=>{
      for(let i=0;i<res.marks.length;i++){
          this.productsService.getProductsByMark(res.marks[i].mark_id).subscribe((result: any)=>{
             this.marks.push({
              markId : res.marks[i].mark_id,
              markName: res.marks[i].mark_name,
              productsIn: result.products.length
            })

           })
       }
    })
  }

}
