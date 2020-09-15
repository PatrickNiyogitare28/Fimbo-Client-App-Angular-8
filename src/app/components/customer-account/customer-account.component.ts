import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { NotificationService } from '../../shared/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogoutPopUpComponent } from '../logout-pop-up/logout-pop-up.component'
import { MatDialog } from '@angular/material';
declare var $:any;
@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent implements OnInit {
  isSeller: boolean = false;
  displayableDivsHolder = [];
  totalDivs = 8;
  accountType=""; accountName="";
  hasLogo:boolean = false;
  logoName = "";
  defaultNameLogo = "";
 constructor(private authService: AuthService,public notificationService: NotificationService,
    private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }
//  subpageShow(page){
//    this.goTo(page);
// }
getUserProfile(){
  this.authService.authenticateUser().subscribe((user: any)=>{
  if(user.success == true){
      if(user.level > 0){
        this.isSeller = true;
      }
    }
    else{
      this.notificationService.showError('Try again, or contact us','Error Occured')
      this.router.navigate(['index']);
    }

  })
}
onLogout(){
   this.dialog.open(LogoutPopUpComponent);
}

hiddeAllDivs(){
  for(let i=0; i<this.displayableDivsHolder.length; i++){
    this.displayableDivsHolder[i]=false;
  }
}
onDetectRoute(){
  const thisRoute = this.route.snapshot.params.subPage;
  if(thisRoute == "darshboard" || thisRoute == "cart" || thisRoute == "profile" || thisRoute == "wishlist" || thisRoute == "orders" || 
    thisRoute == "progress" || thisRoute == "notifications" || thisRoute == "products"){
    this.subpageShow(thisRoute);
    this.changeActive(thisRoute);
  }
  else{
    alert("Page not found. Error 404");
    this.router.navigate(['index']);
  }
  
}
subpageShow(thisRoute){
 
  this.router.navigate([this.accountType,this.accountName,thisRoute]);
  switch(thisRoute){
    case "darshboard":
      this.hiddeAllDivs();
      this.changeActive('darshboard');
      this.displayableDivsHolder[0]=true;
      break;
    case "profile":
      this.hiddeAllDivs();
      this.changeActive('profile');
      this.displayableDivsHolder[1]=true;
      break;
    case "cart":
      this.hiddeAllDivs();
      this.changeActive('cart');
      this.displayableDivsHolder[2]=true;
      break;
    case "wishlist":
      this.hiddeAllDivs();
      this.changeActive('wishlist');
      this.displayableDivsHolder[3]=true;
      break;
    case "orders":
      this.hiddeAllDivs();
      this.changeActive('orders');
      this.displayableDivsHolder[4]=true;
      break;
    case "products":
      this.hiddeAllDivs();
      this.changeActive('products');
      this.displayableDivsHolder[5]=true;
      break;  
    case "progress":
      this.hiddeAllDivs();
      this.changeActive('progress');
      this.displayableDivsHolder[6]=true;
      break;
    case "notifications":
      this.hiddeAllDivs();
      this.changeActive('notifications');
      this.displayableDivsHolder[7]=true;
      break;
    default:
      alert("Error occured");
      this.router.navigate(['index']);
      break;  
  }
}
changeActive(activeId){
  $(function(){
    $('.menu-list').find('.active').removeClass('active');
    $('.menu-list').find(`#${activeId}`).addClass('active');
  })
}
onCheckMe(){
  alert("hello");
}
getAccountLogo(){
  this.authService.authenticateVendor().subscribe((res:any)=>{
    if(res.success == true){
      if(res.logo != null){
        this.hasLogo = true;
        this.logoName =res.logo;
      }
      else{
        this.hasLogo=false;
        this.defaultNameLogo = res.sellerName[0].toUpperCase();
      }
    }
  })
}
makeDefaultUserProfile(){
  this.authService.authenticateUser().subscribe((res:any)=>{
    if(res.success == true){
      this.defaultNameLogo = res.firstname[0].toUpperCase();
      this.hasLogo = false;
    }
  })
}
ngOnInit() {
  sessionStorage.removeItem('displayHeaders')

  const token = sessionStorage.getItem('token')
  if (!token) {
    this.router.navigate(['index'])
    document.getElementById('open-cart-btn').click()

  } else {
    let accountType = this.route.snapshot.params.accountType;
    let subPage = this.route.snapshot.params.subPage
    if (accountType == 'buyeraccount') {
      this.getUserProfile();
      this.authService.authenticateUser().subscribe((res: any) => {
        let accountName = res.firstname.replace(/\s+/g, '') + res.lastname.replace(/\s+/g, '')
        let lowerAccountName = accountName.toLowerCase();
        this.accountType = 'buyeraccount';
        this.accountName = lowerAccountName;
        this.router.navigate(['buyeraccount', lowerAccountName, subPage])
        this.isSeller = false;
        this.makeDefaultUserProfile()
      })
    } else if (accountType == 'selleraccount') {
      this.authService.authenticateVendor().subscribe((result: any) => {
        if (result.success == true) {
          let accountName = result.sellerName.replace(/\s+/g, '')
          let lowerAccountName = accountName.toLowerCase();
          this.accountType = 'selleraccount';
          this.accountName = lowerAccountName;
          this.router.navigate(['selleraccount', lowerAccountName, subPage])
          this.isSeller = true;
          this.getAccountLogo();
        } else {
          alert("Account not found, 404. You need to login with seller account");
          this.router.navigate(['index']);
        }
      })
    } else {
      alert("404: Page not found")
      this.router.navigate(['index']);
    }

  }
  this.onDetectRoute();

}
}
