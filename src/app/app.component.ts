import { Component,OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FIMBO Online';

   constructor(public router: Router,public route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string){}

    onActivate(event: any) {
      if (isPlatformBrowser(this.platformId)) {
        let scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 0);
      }
    }

  ngOnInit(){
   let currentPage = sessionStorage.getItem('currentPage');
   console.log("page: "+currentPage)
   
  //  if(currentPage != null){
  //    this.router.navigate([currentPage]);
  //  }
  //  else{
  //   this.router.navigate(['index'])
  //  }
  
  }
}
