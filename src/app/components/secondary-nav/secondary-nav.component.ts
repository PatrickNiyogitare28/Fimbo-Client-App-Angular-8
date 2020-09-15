import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../shared/display.service'
import { UsersService } from '../../shared/users.service'
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.css']
})
export class SecondaryNavComponent implements OnInit {

  constructor(public displayService: DisplayService, public usersService: UsersService,
    public router: Router, public route: ActivatedRoute) { }
  gotToMyCart(){
    const token = sessionStorage.getItem('token')
    if(!token){
      this.errorModalTrigger(); 
      }
    else{
      this.usersService.getUserAuthProfile().subscribe((res: any)=>{
        if(res.success != true){
          alert("Please you should login")
        }
        else if(res.success == true){
          let accountName = res.firstname.replace(/\s+/g, '') + res.lastname.replace(/\s+/g, '')
          this.router.navigate(['account', accountName, 'cart'])
         }
      })
    }
  } 
  errorModalTrigger(){
    var errorModal = document.getElementById("notLoggedInErrorModal");
    var spanCloseGetItModal = document.getElementById("error-modal-close");
    errorModal.style.display = "block";
    
    spanCloseGetItModal.onclick = function() {
      errorModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == errorModal) {
        errorModal.style.display = "none";
      }
    }
}

ngOnInit() {
     //-------------triggering get product modal-----------------------
    //  var getItModal = document.getElementById("loginBeforeModal");
    //  var getItBtn = document.getElementById("loginBeforeBtn");
    //  var spanCloseGetItModal = document.getElementById("closeGetIt");
    //  getItBtn.onclick = function() {
    //    getItModal.style.display = "block";
    //  }
    //  spanCloseGetItModal.onclick = function() {
    //    getItModal.style.display = "none";
    //  }
    //  window.onclick = function(event) {
    //    if (event.target == getItModal) {
    //      getItModal.style.display = "none";
    //    }
    //  }
 //----------------------end of get product modal------------------------
  }

}
