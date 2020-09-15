import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../shared/display.service'
declare var $:any;
@Component({
  selector: 'app-primary-nav',
  templateUrl: './primary-nav.component.html',
  styleUrls: ['./primary-nav.component.css']
})
export class PrimaryNavComponent implements OnInit {

  constructor(public displayService: DisplayService) { }

  // toggleModal(){
  //   document.getElementById('modal')
  // }
  triggerAuthModal(event){
    let authModal = document.getElementById("authModal");
     if(event == 'open'){
      $(document).ready(function() {
       $('#authModal').fadeIn(1000)
      });
    }
     else if(event == 'close'){
      $(document).ready(function() {
        $('#authModal').fadeOut(1000);
       });
     }
    window.onclick = function(event) {
      if (event.target == authModal) {
        $(document).ready(function() {
          $('#authModal').fadeOut(1000);
         });
      }
    }
  }

  ngOnInit() {
    //-----------------------------AUTO TRIGGERING THE MODAL-----------------
    // document.getElementById("openModalButton").click();
  }

}
