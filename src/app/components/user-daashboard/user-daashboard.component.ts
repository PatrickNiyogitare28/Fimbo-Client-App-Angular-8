import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-daashboard',
  templateUrl: './user-daashboard.component.html',
  styleUrls: ['./user-daashboard.component.css']
})
export class UserDaashboardComponent implements OnInit {

  constructor(public authService: AuthService,public router: Router) { }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.router.navigate(['index'])
    }
    else{
      this.authService.authenticateUser().subscribe((res: any)=>{
        if(res.level != 0){
          this.router.navigate(['index'])
        }
        else{
          sessionStorage.setItem('currentPage','myaccount/userdashboard');
       }
      })
    }
 }
}
