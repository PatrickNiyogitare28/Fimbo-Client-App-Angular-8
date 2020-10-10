import { Component, OnInit } from '@angular/core';
declare var $:any;
import { NotificationService } from '../../shared/notification.service';
import { AuthService } from '../../shared/auth.service';
import { OrdersService } from '../../shared/orders.service';
import { CustomerAccountComponent } from '../customer-account/customer-account.component';
import { ActivatedRoute , Router} from '@angular/router'
import { VendorsService } from '../../shared/vendors.service';
import { UsersService } from '../../shared/users.service'
import  {ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  isVendor:boolean  = false;
  newOrder:boolean= true;
  orderIsFound:boolean=true;
  wasChecked:boolean = false;
  createOrderErrorHolder=[];
  url;
  msg = "";
  orderImage="";
  orders=[];
  vendorCheckedOrders = [];
  exploreOrder = {orderId:"",orderName:"",description:"",orderDate:"String"}
  foundOrder={
    orderName: "",
    orderedDate: "",
    checkedSellers:[]
  }
  ordererProfile = {
    firstname:"",
    lastname:"",
    phone: "",
    email: ""
  }
  constructor(private notificationService: NotificationService, private authService: AuthService,
    private ordersService: OrdersService, private customerAccountCompo:CustomerAccountComponent,
    private router: Router, private route: ActivatedRoute,private vendorsService: VendorsService,
    private usersService: UsersService, private toastrService: ToastrService) { }

  triggerOrderModal(orderId,task){
    if(task=="addOrder"){
      this.newOrder=true;
      this.firstCheckEmail();
   }
   else if(task=="exploreOrder" && this.orderIsFound != true){
    this.newOrder=false;
    this.fadePendingProductModal('in');
   }
   else if(task=="exploreOrder" && this.orderIsFound == true){
    this.newOrder=false;
    this.fadeFoundProductModal('in');
    this.fetchFoundOrderDetails(orderId)
   }
   var orderModal = document.getElementById("orderModal");
   var foundOrderModal = document.getElementById("foundOrderModal");
  
   window.onclick = (event) => {
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
              this.onFetchUserOrders();
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
 
  onFetchUserOrders(){
    this.authService.authenticateUser().subscribe((user:any)=>{
      if(user.success == true){
        this.orders.splice(0,this.orders.length);
        this.ordersService.getUserOrders(user.userId).subscribe((res:any)=>{
          res.orders.forEach(order => {
            this.ordersService.isOrderFound(order.order_id).subscribe((isFound:any)=>{
              if(isFound.success == true && isFound.status == 200){
                  this.pushInOrders(order,true);
              }
              else if(isFound.success == true && isFound.status==404){
                this.pushInOrders(order,false);
              }
            })
            // this.pushInOrders(order);
          });
        
        })
      }
    })
  }
  onRemoveOrder(orderId){
   this.ordersService.deleteOrder(orderId).subscribe((res:any)=>{
    if(res.success == true){
      var index =  this.orders.findIndex(order =>{
        return order.orderId == orderId;
      })
      this.orders.splice(index,1);
      this.notificationService.showSuccess(`Order was deleted`, 'One Order removed successfully');
      }
   })
  }

  onFetchVendorDisplayOrders(){
   let vendorId = this.authService.authenticateVendor().subscribe((isVendor:any)=>{
     if(isVendor.success == true){
       vendorId = isVendor.sellerId;
     }
    })
    this.ordersService.fetchAllOrders().subscribe((res:any)=>{
      this.orders.splice(0,this.orders.length);
       if(res.success == true){
             this.vendorCheckedOrders.splice(0,this.vendorCheckedOrders.length);
             res.orders.forEach(order => {
              this.ordersService.isOrderChecked(vendorId,order.order_id).subscribe((isChecked: any)=>{
                if(isChecked.success == true && isChecked.status == 200){
                //  this.vendorCheckedOrders.push(order);
                 this.getVendorCheckedOuts(order);
                }
                else if(isChecked.success == false && isChecked.status == 200){
                  this.pushInOrders(order,false);
                }
              })
            });
          }
     })
   
  }
  pushInOrders(order,foundStatus:boolean){
     this.orders.push({
      orderId: order.order_id,
      orderName: order.order_name,
      description: order.description,
      imageURL: order.orderImage,
      foundStatus: foundStatus,
      orderDate: order.order_date
   
    })
  }
 

  deterMineAccoutType(){
    if(this.route.snapshot.params.accountType == 'selleraccount'){
       this.isVendor = true;
       this.onFetchVendorDisplayOrders();
     }
     else if(this.route.snapshot.params.accountType == 'buyeraccount'){
       this.onFetchUserOrders();
     }
     else{
     this.router.navigate(['index']);
     }
  }
  triggerExploreOrderModal(orderId,event){
    if(this.isVendor == true && orderId != -1){
    this.getOrdererDetails(orderId);  
    }
     $(()=>{
       if(event == 'open'){
        this.wasChecked=false;
        this.orders.forEach(order => {
          if(order.orderId == orderId){
          this.exploreOrder = Object.assign({},order)
          }
        })
         $('#exploreOrderModal').fadeIn()
       }
       else if(event == 'close'){
        $('#exploreOrderModal').fadeOut()
        }
       window.onclick = (event) => {
         if(event.target == document.getElementById('exploreOrderModal')){
          $('#exploreOrderModal').fadeOut()
         }
       } 
    })
  }

  fetchFoundOrderDetails(orderId){
   this.orders.forEach(order=> {
     if(order.orderId == orderId){
      this.exploreOrder = Object.assign({},order);
     }
   })
    
    this.ordersService.isOrderFound(orderId).subscribe((res:any)=>{
    res.foundOrder.forEach(foundOrder => {
        this.vendorsService.getVendorInfo(foundOrder.seller).subscribe((vendor:any)=>{
            this.foundOrder.orderName= this.exploreOrder.orderName;
            this.foundOrder.orderedDate=this.exploreOrder.orderDate;
            this.foundOrder.checkedSellers.splice(1,this.foundOrder.checkedSellers.length);
            this.foundOrder.checkedSellers.push({
              sellerName:vendor.info.seller_name,
              email: vendor.info.seller_email,
              contactPhone: vendor.info.seller_contact_phone,
              whatsappPhone: vendor.info.seller_watsapp_phone,
              country: vendor.info.seller_country,
              district: vendor.info.seller_district,
              sector: vendor.info.seller_sector,
              town: vendor.info.seller_town,
              logo: vendor.info.sellerLogo
            }

            )
        })
      });
    })
  }
  getOrdererDetails(orderId){
   this.ordersService.getOrderDetails(orderId).subscribe((result:any)=>{
     if(result.success == true){
       this.usersService.getUserProfile(result.order.user).subscribe((res:any)=>{
         if(res.success == true){
             this.ordererProfile= Object.assign({},res.user);
            }
       })
     }
   })
 
  }

  checkOrderOut(){
    this.authService.authenticateVendor().subscribe((vendor:any)=>{
      if(vendor.success == true){
        this.ordersService.checkoutOrder(vendor.sellerId,this.exploreOrder.orderId).subscribe((res:any)=>{
          if(res.success == true){
            this.onFetchVendorDisplayOrders();
            this.notificationService.showSuccess('Order checked','You added a new Order in checkouts');
            this.wasChecked=true;
          }
        })
      }
    })
  }
  getVendorCheckedOuts(orderObj){
   this.usersService.getUserProfile(orderObj.user).subscribe((res:any)=>{
     if(res.success == true){
     this.vendorCheckedOrders.push({
          order:{
            orderId:orderObj.order_id,
            orderName: orderObj.order_name,
            description: orderObj.description,
            orderDate:orderObj.order_date,
            orderImageURL: orderObj.orderImage
          },
          customer:{
            firstname: res.user.firstname,
            lastname: res.user.lastname,
            email: res.user.email,
            phone: res.user.phone
          }
       })
     }
   })
  }
  triggerVendorCheckedOutModal(){
   this.fadeFoundProductModal('in');
    // (()=>{
    //   $('#foundOrderModal').fadeIn();
    // })
  }
  removeCheckout(orderId){
   this.authService.authenticateVendor().subscribe((auth:any)=>{
       this.ordersService.uncheckOrder(auth.sellerId,orderId).subscribe((res:any)=>{
         if(res.success == true){
            let removeIndex = 0;
            for(let i = 0; i < this.vendorCheckedOrders.length; i++){
              if(this.vendorCheckedOrders[i].orderId == orderId){
                removeIndex = i;
              }
            }
            this.vendorCheckedOrders.splice(removeIndex,1);
            this.notificationService.showSuccess('You unchecked the order','1 order unchecked');
            this.onFetchVendorDisplayOrders();
         }
       })
    })
  }

  onDirectCancelCheckout(){
    this.removeCheckout(this.exploreOrder.orderId);
    this.wasChecked=false;
  }

  firstCheckEmail(){
    this.authService.authenticateUser().subscribe((auth:any)=>{
    if(auth.email == 'NULL'){
        // this.toastrService.error(
        //   'Error: Email is required',
        //   'You need to have an email before ordering. Go to -> Dashboard -> Add Email to add your email'
        //   ,)
        alert("Error: You need to have an email before ordering. Go to '-> Dashboard -> Add Email' to add your email")
      }
      else{
      this.fadePendingProductModal('in');
     }

    })
  }
  ngOnInit() {
    this.deterMineAccoutType();
  }

}
