import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../../shared/display.service';
import { ProductsService } from '../../../shared/products.service'

@Component({
  selector: 'app-primary-slide',
  templateUrl: './primary-slide.component.html',
  styleUrls: ['./primary-slide.component.css']
})
export class PrimarySlideComponent implements OnInit {
  products: any =[];
  constructor(public displayService: DisplayService, public productsService: ProductsService) { }

  
getProductsIn(){
  this.displayService.fetchSecondarySliderProducts().subscribe((res: any)=> {
    console.log("///////// "+JSON.stringify(res));
    res.products.forEach(product => {
      this.productsService.getProductData(product.product).subscribe((data: any)=> {
        console.log(JSON.stringify(data));
         this.products.push({
           id: product.id,
           data: data
         })
      })
    })
  })
}
 
 ngOnInit(){
  this.getProductsIn();
 }
}
