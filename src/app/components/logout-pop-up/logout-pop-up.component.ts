import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout-pop-up',
  templateUrl: './logout-pop-up.component.html',
  styleUrls: ['./logout-pop-up.component.css']
})
export class LogoutPopUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  onLogout(){
    const isLoggedOut:boolean = this.authService.logout();
    if(isLoggedOut){
     this.router.navigate(['index']);
  }
  }
  ngOnInit() {
  }

}
