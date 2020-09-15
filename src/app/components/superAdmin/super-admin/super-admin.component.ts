import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../../shared/auth.service'

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  adminNavigate(navItem){
   

    let productsWrapper = document.getElementById('productsWrapper')
    let categoriesWrapper = document.getElementById('categoriesWrapper')
    let collectionsWrapper = document.getElementById('collectionsWrapper')
    let marksWrapper = document.getElementById('marksWrapper')
    let sellesWrapper = document.getElementById('sellersWrapper')
    let usersWrapper = document.getElementById('usersWrapper')
    let primarySlideWrapper = document.getElementById('primarySlideWrapper');


    if(navItem == 1){
      sessionStorage.setItem('adminDisplayPage','adminProducts')

      productsWrapper.classList.toggle('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 2){
      sessionStorage.setItem('adminDisplayPage','adminCategories')
    
      categoriesWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 3){
     sessionStorage.setItem('adminDisplayPage','adminCollections')

      collectionsWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 4){
      sessionStorage.setItem('adminDisplayPage','adminMarks')
     

      marksWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 5){
      sessionStorage.setItem('adminDisplayPage','adminSellers')

      sellesWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 6){
      sessionStorage.setItem('adminDisplayPage','adminUsers')

      usersWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      primarySlideWrapper.classList.remove('primary-list-active')

    }
    else if(navItem == 7){
      sessionStorage.setItem('adminDisplayPage','primarySlide')

      primarySlideWrapper.classList.toggle('primary-list-active')
      productsWrapper.classList.remove('primary-list-active')
      categoriesWrapper.classList.remove('primary-list-active')
      collectionsWrapper.classList.remove('primary-list-active')
      marksWrapper.classList.remove('primary-list-active')
      sellesWrapper.classList.remove('primary-list-active')
      usersWrapper.classList.remove('primary-list-active')

    }
    


  }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.router.navigate(['index'])
    }
    else{
      this.authService.authenticateUser().subscribe((res: any)=>{
        if(res.level != 2){
          this.router.navigate(['index'])
        }
        else{
          sessionStorage.setItem('currentPage','myaccount/superadmin');
        }
      })
    }

   let headerDisplay = sessionStorage.getItem('displayHeaders');
   if(headerDisplay !== null){
     sessionStorage.removeItem('displayHeaders');
   } 


  //----------------------------setting the entry display subpage----------------------
  
  // sessionStorage.setItem('adminDisplayPage','adminProducts')
  }



}
