import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../shared/auth.service'

@Component({
  selector: 'app-seller-darshboard',
  templateUrl: './seller-darshboard.component.html',
  styleUrls: ['./seller-darshboard.component.css']
})
export class SellerDarshboardComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.router.navigate(['index'])
    }
    else{
      this.authService.authenticateUser().subscribe((res: any)=>{
        if(res.level != 1){
          this.router.navigate(['index'])
        }
        else{
         sessionStorage.setItem('currentPage','myaccount/sellerdashboard');
       }
      })
    }
  }

}
