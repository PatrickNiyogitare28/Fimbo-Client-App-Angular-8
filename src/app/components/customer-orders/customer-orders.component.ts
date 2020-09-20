import { Component, OnInit } from '@angular/core';
declare var $:any;
import { NotificationService } from '../../shared/notification.service';
import { AuthService } from '../../shared/auth.service';
import { OrdersService } from '../../shared/orders.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  newOrder:boolean= true;
  orderIsFound:boolean=true;
  createOrderErrorHolder=[];
  url;
  msg = "";
  orderImage="";
  constructor(private notificationService: NotificationService, private authService: AuthService,
    private ordersService: OrdersService) { }

  triggerOrderModal(task){
    if(task=="addOrder"){
      this.newOrder=true;
      this.fadePendingProductModal('in');
   }
   else if(task=="exploreOrder" && this.orderIsFound != true){
    this.newOrder=false;
    this.fadePendingProductModal('in');
   }
   else if(task=="exploreOrder" && this.orderIsFound == true){
    this.newOrder=false;
    this.fadeFoundProductModal('in');
   }
   var orderModal = document.getElementById("orderModal");
   var foundOrderModal = document.getElementById("foundOrderModal");
  
   window.onclick = function(event) {
    if (event.target == foundOrderModal) {
     $(()=>{ $('#foundOrderModal').fadeOut();})
    }
    else if(event.target == orderModal){
      $(()=>{ $('#orderModal').fadeOut();})
    }
  }
   }

  fadePendingProductModal(mode){
    $(()=>{
      if(mode == 'in'){
        $('#orderModal').fadeIn();
      }
      else if(mode == 'out'){
        $('#orderModal').fadeOut();
      }
    })
  }
  fadeFoundProductModal(mode){
    $(()=>{
      if(mode == 'in'){
        $('#foundOrderModal').fadeIn();
      }
      else if(mode == 'out'){
        $('#foundOrderModal').fadeOut();
      }
    })
  }
  closeModal(event){
   $(()=>{
    if(event == 'foundOrderModal'){
       $('#foundOrderModal').fadeOut();
    }
    else if(event == 'orderModal'){
      $('#orderModal').fadeOut();
    }
   })
    
  }
  onRemoveOrder(){
    this.notificationService.showSuccess('Order was permenently delete','Order1 removed');
  }
  onCreateOrder(orderName,orderDescription){
    var noSpaceOrderName = orderName.replace(/\s+/g, '').length;
    var noSpaceDescription = orderDescription.replace(/\s+/g, '').length;
    if(noSpaceOrderName == 0 || orderName.length > 50 || orderName.length < 2){
      (noSpaceOrderName == 0) ? this.createOrderErrorHolder[0]="  Order name is required"  : 
      (orderName.length < 2 || orderName.length > 30) ? this.createOrderErrorHolder[0]= " Name should be 2 - 30 characters" :
      this.createOrderErrorHolder[0]=""
      this.makeFieldDanger('orderName');
    }
    else{ this.createOrderErrorHolder[0]==""}
    
    if(noSpaceDescription == 0 || orderDescription.length < 10 || orderDescription.length > 150){
      (noSpaceDescription == 0) ? this.createOrderErrorHolder[1]=" Please Describe your order"  : 
      (orderDescription.length < 10 || orderDescription.length > 150) ? this.createOrderErrorHolder[1]= " Description should be between 10 - 150 characters" :
      this.createOrderErrorHolder[1]=""
      this.makeFieldDanger('description');
    }
    else{this.createOrderErrorHolder[1]=""}

    if(this.createOrderErrorHolder[0]=="" && this.createOrderErrorHolder[1]==""){
       this.authService.authenticateUser().subscribe((authorizedUser:any)=>{
         if(authorizedUser.success == true){
           this.ordersService.makeOrder(authorizedUser.userId,orderName,orderDescription).subscribe((res:any)=>{
             if(res.success == false){
               this.notificationService.showError(res.message,"Ordering failed");
             }
             else if(res.success == true){
              if(this.url != null && this.orderImage != ""){
                 this.ordersService.addOrderImage(res.order.insertId,this.orderImage).subscribe((result:any)=>{
                 if(result.success != true){
                  this.notificationService.showError('Error! Image not uploaded',"Upload image unsuccessful")
                  }
               })
              } 
              this.notificationService.showSuccess('You have made an order','Ordering successful');
              this.clearFields();
             }
           })
         }
       })
    }
  }
  makeFieldDanger(fieldName){
    $(()=>{
      $(`#${fieldName}`).addClass('dangerField');
    })
  }
  resetField(fieldName, errorId){
    this.createOrderErrorHolder[errorId]="";
    $(()=> $(`#${fieldName}`).removeClass('dangerField'));
  }
  selectFile(event) {
   if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You can add order image for better ordering';
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
      this.url = reader.result; 
    }
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.orderImage = file;
    }
    
   }
   clearFields(){
     $(()=>{
       $('#orderName').val("");
       $('#description').val("")
      })
      this.url="";
      this.orderImage="";
      this.msg="";
   }
 
  ngOnInit() {
   
  }

}
